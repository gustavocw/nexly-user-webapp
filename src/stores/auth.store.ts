import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

interface AuthState {
  stepLogin: boolean;
  email: string | null;
  password: string | null;
  rememberMe: string;
  area?: Area | null;
  areaLogin?: Area | null;
}

interface AuthActions {
  setStepLogin: (stepLogin: AuthState["stepLogin"]) => void;
  setEmail: (email: AuthState["email"]) => void;
  setPassword: (password: AuthState["password"]) => void;
  setRememberMe: (rememberMe: string) => void;
  setArea: (area: AuthState["area"]) => void;
  setAreaLogin: (areaLogin: AuthState["areaLogin"]) => void;
}

const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      stepLogin: false,
      email: null,
      password: null,
      rememberMe: "false",
      area: null,
      setStepLogin: (stepLogin) => set({ stepLogin }),
      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),
      setRememberMe: (rememberMe) => set({ rememberMe }),
      setArea: (area) => set({ area }),
      setAreaLogin: (areaLogin) => set({ areaLogin }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        stepLogin: state.stepLogin,
        email: state.rememberMe === "true" ? state.email : null,
        password: state.rememberMe === "true" ? state.password : null,
        rememberMe: state.rememberMe,
        area: state.area,
        areaLogin: state.areaLogin,}),
    }
  )
);

export default useAuthStore;
