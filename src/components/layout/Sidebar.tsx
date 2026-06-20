import { useEffect } from "react";
import { LayoutDashboard, PlayCircle, History, User as UserIcon } from "lucide-react";
import { Logo } from "@/components/Logo";
import { SidebarItem } from "@/components/layout/SidebarItem";
import { SidebarToggle } from "@/components/layout/SidebarToggle";
import { useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const items = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/interview/setup", label: "New Interview", icon: PlayCircle },
    { to: "/history", label: "History", icon: History },
    { to: "/profile", label: "Profile", icon: UserIcon },
] as const;

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
    mobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
}

export function Sidebar({ collapsed, onToggle, mobileOpen, setMobileOpen }: SidebarProps) {
    const pathname = useRouterState({ select: (s) => s.location.pathname });

    useEffect(() => {
        const stored = window.localStorage.getItem("sidebarCollapsed");
        if (stored !== null) {
            // Keep the persisted width state across refreshes.
        }
    }, []);

    return (
        <>
            <aside
                className={cn(
                    "hidden md:flex md:flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
                    collapsed ? "md:w-20" : "md:w-72",
                )}
            >
                <div className="flex h-full min-h-screen flex-col overflow-hidden">
                    <div className="flex items-center justify-between gap-2 border-b border-sidebar-border px-4 py-4">
                        <Logo compact={collapsed} />
                        <SidebarToggle collapsed={collapsed} onClick={onToggle} />
                    </div>
                    <nav className="flex-1 overflow-auto px-3 py-4 pb-6">
                        <div className="space-y-1">
                            {items.map(({ to, label, icon: Icon }) => {
                                const active = pathname === to || pathname.startsWith(`${to}/`);
                                return (
                                    <SidebarItem
                                        key={to}
                                        to={to}
                                        label={label}
                                        Icon={Icon}
                                        active={active}
                                        collapsed={collapsed}
                                    />
                                );
                            })}
                        </div>
                    </nav>
                </div>
            </aside>

            <div
                className={cn(
                    "fixed inset-0 z-50 md:hidden transition-all duration-200",
                    mobileOpen ? "visible" : "invisible pointer-events-none",
                )}
                aria-hidden={!mobileOpen}
            >
                <div
                    className={cn(
                        "absolute inset-0 bg-black/40 transition-opacity duration-200",
                        mobileOpen ? "opacity-100" : "opacity-0",
                    )}
                    onClick={() => setMobileOpen(false)}
                />
                <aside
                    className={cn(
                        "relative flex h-full w-72 flex-col border-r border-sidebar-border bg-sidebar shadow-xl transition-transform duration-200",
                        mobileOpen ? "translate-x-0" : "-translate-x-full",
                    )}
                >
                    <div className="flex items-center justify-between gap-2 border-b border-sidebar-border px-4 py-4">
                        <Logo compact={false} />
                        <button
                            type="button"
                            aria-label="Close sidebar"
                            onClick={() => setMobileOpen(false)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground"
                        >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                    <nav className="flex-1 overflow-auto px-3 py-4 pb-6">
                        <div className="space-y-1">
                            {items.map(({ to, label, icon: Icon }) => {
                                const active = pathname === to || pathname.startsWith(`${to}/`);
                                return (
                                    <SidebarItem
                                        key={to}
                                        to={to}
                                        label={label}
                                        Icon={Icon}
                                        active={active}
                                        collapsed={false}
                                        onClick={() => setMobileOpen(false)}
                                    />
                                );
                            })}
                        </div>
                    </nav>
                </aside>
            </div>
        </>
    );
}
