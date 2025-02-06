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
  const { isLogged, signout } = useAuth();
  const { setArea, area } = useAuthStore();

  // const url = window.location.origin;
  const url = "http://localhost:9000"
  const { data, isLoading } = useQuery({
    queryKey: ["area", url],
    queryFn: async () => {
      await getArea(url).then((res) => {
        setArea(res[0]);
        return res[0];
      });
    },
    enabled: !area && !!isLogged,
  });

  useEffect(() => {
    if (!area) {
      signout()
    }
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
