import { Navigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { useAuthStore } from "@/store/authStore";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Loading…</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}
