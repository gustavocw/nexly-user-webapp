import { createContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "services/user.services";
import { useAuth } from "hooks/useAuth";

interface UserContextValue {
  user?: User;
  loadingUser: boolean;
  refetchUser: () => void;
}

export const UserContext = createContext({} as UserContextValue);
export function UserProvider({ children }: { children: React.ReactNode }) {
  const { isLogged } = useAuth();

  const {
    data: user,
    isLoading: loadingUser,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      return getMe();
    },
    enabled: isLogged,
  });

  useEffect(() => {
    if (user === undefined && !!isLogged) {
      refetchUser();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, loadingUser, refetchUser }}>
      {children}
    </UserContext.Provider>
  );
}
