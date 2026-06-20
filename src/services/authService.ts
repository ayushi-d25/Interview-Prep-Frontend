import { api, mockDelay } from "./api";
import type { AuthResponse, LoginPayload, SignupPayload } from "@/types";

const USE_MOCK = false;

export const authService = {
  // POST /api/auth/signup
  async signup(payload: SignupPayload): Promise<AuthResponse> {
    if (!USE_MOCK) {
      const { data } = await api.post<AuthResponse>("/auth/signup", payload);
      return data;
    }
    return mockDelay({
      success: true,
      token: "demo-token",
      user: {
        id: "1",
        name: payload.name,
        email: payload.email,
        joinedAt: new Date().toISOString(),
      },
    });
  },

  // POST /api/auth/login
  async login(payload: LoginPayload): Promise<AuthResponse> {
    if (!USE_MOCK) {
      const { data } = await api.post<AuthResponse>("/auth/login", payload);
      return data;
    }
    return mockDelay({
      success: true,
      token: "demo-token",
      user: {
        id: "1",
        name: payload.email.split("@")[0] || "John Doe",
        email: payload.email,
        joinedAt: new Date().toISOString(),
      },
    });
  },

  // POST /api/auth/logout
  async logout(): Promise<{ success: boolean }> {
    if (!USE_MOCK) {
      const { data } = await api.post("/auth/logout");
      return data;
    }
    return mockDelay({ success: true }, 200);
  },
};
