import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        if (typeof window !== "undefined") {
          window.localStorage.setItem("auth_token", token);
          window.localStorage.setItem("token", token);
        }
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        if (typeof window !== "undefined") {
          window.localStorage.removeItem("auth_token");
          window.localStorage.removeItem("token");
        }
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    { name: "aip-auth" },
  ),
);
