import { api, mockDelay } from "./api";
import type { ProfileStats, User } from "@/types";

const USE_MOCK = false;

export const profileService = {
  // GET /api/profile
  async getProfile(): Promise<User> {
    if (!USE_MOCK) {
      const { data } = await api.get<User>("/profile");
      return data;
    }
    return mockDelay({
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      joinedAt: "2025-01-15T00:00:00.000Z",
    });
  },

  // PATCH /api/profile
  async updateProfile(payload: Partial<User>): Promise<User> {
    if (!USE_MOCK) {
      const { data } = await api.patch<User>("/profile", payload);
      return data;
    }
    return mockDelay({
      id: "1",
      name: payload.name ?? "John Doe",
      email: payload.email ?? "john@example.com",
      joinedAt: "2025-01-15T00:00:00.000Z",
    });
  },

  // GET /api/profile/stats
  async getStats(): Promise<ProfileStats> {
    if (!USE_MOCK) {
      const { data } = await api.get<ProfileStats>("/profile/stats");
      return data;
    }
    return mockDelay({
      totalInterviews: 12,
      averageScore: 7.6,
      completed: 10,
      bestRole: "React Developer",
    });
  },
};
