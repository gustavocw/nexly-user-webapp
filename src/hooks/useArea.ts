import { useContext } from "react";
import { AreaContext } from "contexts/AreaContext";

export function useArea() {
  return useContext(AreaContext)
}
