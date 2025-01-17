import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

interface AuthState {
  stepLogin: boolean;
  email: string | null;
  password: string | null;
  rememberMe: string;
}

interface AuthActions {
  setStepLogin: (stepLogin: AuthState["stepLogin"]) => void;
  setEmail: (email: AuthState["email"]) => void;
  setPassword: (password: AuthState["password"]) => void;
  setRememberMe: (rememberMe: string) => void;
}

const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      userStore: null,
      stepLogin: false,
      email: null,
      password: null,
      rememberMe: "false",
      setStepLogin: (stepLogin) => set({ stepLogin }),
      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),
      setRememberMe: (rememberMe) => set({ rememberMe }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        stepLogin: state.stepLogin,
        email: state.rememberMe === "true" ? state.email : null,
        password: state.rememberMe === "true" ? state.password : null,
        rememberMe: state.rememberMe,
      }),
    }
  )
);

export default useAuthStore;
