import { Menu, Bell } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { UserDropdown } from "@/components/layout/UserDropdown";

export function TopBar({
  title,
  subtitle,
  onMobileMenu,
}: {
  title: string;
  subtitle?: string;
  onMobileMenu: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border bg-background/80 backdrop-blur px-4 py-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMobileMenu}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
        </button>
        <UserDropdown />
      </div>
    </div>
  );
}
