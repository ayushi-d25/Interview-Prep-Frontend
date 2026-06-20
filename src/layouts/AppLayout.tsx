import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/TopBar";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export function AppLayout({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle?: string;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("sidebarCollapsed");
    if (stored !== null) {
      setCollapsed(stored === "true");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("sidebarCollapsed", String(collapsed));
  }, [collapsed]);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-background">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar title={title} subtitle={subtitle} onMobileMenu={() => setMobileOpen(true)} />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
