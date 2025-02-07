import { createContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getArea, getAreaLogin } from "services/area.services";
import { useAuth } from "hooks/useAuth";
import useAuthStore from "stores/auth.store";

interface AreaContextValue {
  loadingArea: boolean;
  areaLogin?: Area;
  loadingLogin: boolean;
}

export const AreaContext = createContext({} as AreaContextValue);
export function AreaProvider({ children }: { children: React.ReactNode }) {
  const { isLogged } = useAuth();
  const { setArea, area } = useAuthStore();
  
  const rawUrl = window.location.hostname;
  const url = rawUrl === "localhost" ? "costaweb.dev.br" : rawUrl;

  const { data: areaLogin, isLoading: loadingLogin } = useQuery({
    queryKey: ["area-login", url],
    queryFn: async () => {
      return await getAreaLogin(url);
    },
    enabled: !area && !isLogged,
  });


  const { data, isLoading } = useQuery({
    queryKey: ["area", url],
    queryFn: async () => {
      const res = await getArea(url);
      setArea(res[0]);
      console.log(res);
      return res[0];
    },
    enabled: !area && !!isLogged,
  });
  
  
  useEffect(() => {
    if (data?.length) {
      setArea(data[0]);
    }
  }, [data, area]);

  return (
    <AreaContext.Provider value={{ loadingArea: isLoading, areaLogin, loadingLogin }}>
      {children}
    </AreaContext.Provider>
  );
}
