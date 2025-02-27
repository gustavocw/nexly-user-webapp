import { createContext, useCallback, useEffect, useState } from "react";
import { localStorageKeys } from "config/localStorageKeys";
import useAuthStore from "../stores/auth.store";
import { toaster } from "components/ui/toaster";

interface AuthContextValue {
  isLogged: boolean;
  auth(accessToken: string): void;
  signout(): void;
}

export const AuthContext = createContext({} as AuthContextValue);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { email, password, rememberMe, setArea } = useAuthStore();

  const [isLogged, setIsLogged] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN
    );
    return !!storedAccessToken;
  });


  const auth = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
    setIsLogged(true);
  }, []);

  const signout = useCallback(async () => {
    Object.keys(localStorage).forEach((key) => {
        if (!["rememberMe", "email", "password"].includes(key)) {
            localStorage.removeItem(key);
        }
    });
    setIsLogged(false);
    setArea(null)
}, [setIsLogged]);
;

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
        auth,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
