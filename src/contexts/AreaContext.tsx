import { createContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getArea } from "services/area.services";
import { useAuth } from "hooks/useAuth";

interface AreaContextValue {
  area: Area | null;
  setArea: (area: Area) => void;
  loadingArea: boolean;
}

export const AreaContext = createContext({} as AreaContextValue);
export function AreaProvider({ children }: { children: React.ReactNode }) {
  const { isLogged } = useAuth();
  const [area, setArea] = useState<Area | null>(null);

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
    <AreaContext.Provider value={{ area, setArea, loadingArea: isLoading }}>
      {children}
    </AreaContext.Provider>
  );
}
