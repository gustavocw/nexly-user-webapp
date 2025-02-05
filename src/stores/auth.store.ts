import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

interface AuthState {
  stepLogin: boolean;
  email: string | null;
  password: string | null;
  rememberMe: string;
  area?: Area | null;
}

interface AuthActions {
  setStepLogin: (stepLogin: AuthState["stepLogin"]) => void;
  setEmail: (email: AuthState["email"]) => void;
  setPassword: (password: AuthState["password"]) => void;
  setRememberMe: (rememberMe: string) => void;
  setArea: (area: AuthState["area"]) => void;
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
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        stepLogin: state.stepLogin,
        email: state.rememberMe === "true" ? state.email : null,
        password: state.rememberMe === "true" ? state.password : null,
        rememberMe: state.rememberMe,
        area: state.area, // Persistindo a área
      }),
    }
  )
);

export default useAuthStore;
