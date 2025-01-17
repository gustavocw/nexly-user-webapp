import { createContext, useCallback, useEffect, useState } from "react";
import { localStorageKeys } from "config/localStorageKeys";
import useAuthStore from "../stores/auth.store";
import { toaster } from "components/ui/toaster";
import { useMutation } from "@tanstack/react-query";
import { signin } from "services/auth.services";
import { useNavigate } from "react-router-dom";

interface AuthContextValue {
  isLogged: boolean;
  auth(accessToken: string): void;
  signout(): void;
  login: (params: Sigin) => void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { setEmail, setPassword, email, password, rememberMe } = useAuthStore();

  const [isLogged, setIsLogged] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN
    );
    return !!storedAccessToken;
  });

  const { mutate: login } = useMutation({
    mutationFn: (params: Sigin) => signin(params),
    onSuccess: (data) => {
      if (data?.token) {
        auth(data?.token);
        navigate("/");
      }
      toaster.create({
        title: "Login feito com sucesso!",
        type: "success",
      });
    },
    onError: () => {
      toaster.create({
        title: "Erro de login!",
        type: "error",
      });
    },
  });

  const auth = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
    setIsLogged(true);
  }, []);

  const signout = useCallback(async () => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    setIsLogged(false);
  }, [setEmail, setPassword]);

  useEffect(() => {
    const pathname = location.pathname;
    const pathSegments = pathname.split("/");
    const idFromPath = pathSegments[1];
    if (!isLogged && idFromPath !== "login") {
      toaster.create({
        title: "Sua sessão expirou!",
        type: "error",
      });
      signout();
    }
  }, [email, password, rememberMe, signout]);

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        login,
        auth,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
