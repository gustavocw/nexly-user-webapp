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

  const url = window.location.origin;
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["area", url],
    queryFn: async () => {
      await getArea(url).then((res) => {
        console.log(res);
        setArea(res[0]);
        return res[0];
      });
    },
    enabled: !area && !!isLogged,
  });

  useEffect(() => {
    if (data && !area) {
      setArea(data[0]);
    }
    if (area === undefined) {
      refetch();
    }
  }, [data, area]);

  return (
    <AreaContext.Provider value={{ loadingArea: isLoading }}>
      {children}
    </AreaContext.Provider>
  );
}
