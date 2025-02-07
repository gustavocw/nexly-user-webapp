import { createContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getArea } from "services/area.services";
import { useAuth } from "hooks/useAuth";
import useAuthStore from "stores/auth.store";

interface AreaContextValue {
  loadingArea: boolean;
}

export const AreaContext = createContext({} as AreaContextValue);
export function AreaProvider({ children }: { children: React.ReactNode }) {
  const { isLogged } = useAuth();
  const { setArea, area } = useAuthStore();

  const rawUrl = window.location.hostname;
  console.log(rawUrl);
  
  const { data, isLoading } = useQuery({
    queryKey: ["area", rawUrl],
    queryFn: async () => {
      const res = await getArea(rawUrl);
      setArea(res[0]);
      return res[0];
    },
    enabled: !area && !!isLogged,
  });
  
  
  useEffect(() => {
    if (data) {
      setArea(data[0]);
    }
  }, [data, area]);

  return (
    <AreaContext.Provider value={{ loadingArea: isLoading }}>
      {children}
    </AreaContext.Provider>
  );
}
