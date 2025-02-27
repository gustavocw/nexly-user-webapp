import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAreaLogin } from "services/area.services";
import { useAuth } from "hooks/useAuth";

interface AreaContextValue {
  areaLogin?: Area;
  loadingLogin: boolean;
}

export const AreaContext = createContext({} as AreaContextValue);
export function AreaProvider({ children }: { children: React.ReactNode }) {
  const { isLogged } = useAuth();
  
  const rawUrl = window.location.hostname;
  const url = rawUrl === "localhost" ? "costaweb.dev.br" : rawUrl;

  const { data: areaLogin, isLoading: loadingLogin } = useQuery({
    queryKey: ["area-login", url],
    queryFn: async () => {
      return await getAreaLogin(url);
    },
    enabled: !isLogged,
  });


  return (
    <AreaContext.Provider value={{  areaLogin, loadingLogin }}>
      {children}
    </AreaContext.Provider>
  );
}
