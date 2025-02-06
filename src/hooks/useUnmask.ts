import { useCallback } from "react";
export const useUnmask = () => {
  const unmask = useCallback((value: any): string => {
    return value.replace(/\D/g, "");
  }, []);
  return unmask;
};
