import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, PlayCircle, History, User as UserIcon, LogOut } from "lucide-react";
import { Logo } from "./Logo";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "@tanstack/react-router";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/interview/setup", label: "New Interview", icon: PlayCircle },
  { to: "/history", label: "History", icon: History },
  { to: "/profile", label: "Profile", icon: UserIcon },
] as const;

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  return (
    <aside className="hidden md:flex md:w-64 md:flex-col border-r border-sidebar-border bg-sidebar">
      <div className="px-6 py-6">
        <Logo />
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || pathname.startsWith(to + "/");
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "bg-sidebar-accent text-foreground shadow-card"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => {
            logout();
            navigate({ to: "/" });
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-sidebar-accent hover:text-destructive transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
