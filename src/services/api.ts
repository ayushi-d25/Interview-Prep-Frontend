import axios from "axios";
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";


export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

/**
 * Axios interceptor to automatically add JWT token to all requests.
 * Reads token from localStorage (checking both "token" and "auth_token" keys).
 */
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("token") || window.localStorage.getItem("auth_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("[API Interceptor] Added Authorization header with token");
    } else {
      console.warn("[API Interceptor] No token found in localStorage");
    }
  }

  return config;
});

/**
 * Response interceptor for error logging.
 */
api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} from ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`[API Error] ${error.response?.status || "unknown"} from ${error.config?.url}:`, {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

// Helper to simulate network delay for mock responses.
export const mockDelay = <T>(data: T, ms = 700): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));
