import { Link } from "@tanstack/react-router";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface SidebarItemProps {
    to: string;
    label: string;
    Icon: LucideIcon;
    active: boolean;
    collapsed: boolean;
    onClick?: () => void;
}

export function SidebarItem({ to, label, Icon, active, collapsed, onClick }: SidebarItemProps) {
    const commonClasses = cn(
        "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200",
        active
            ? "bg-sidebar-accent text-foreground shadow-card"
            : "text-muted-foreground hover:bg-sidebar-accent/70 hover:text-foreground",
    );

    if (collapsed) {
        return (
            <HoverCard>
                <HoverCardTrigger asChild>
                    <Link
                        to={to}
                        onClick={onClick}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                            "group inline-flex h-12 w-full items-center justify-center rounded-lg transition-colors duration-200",
                            active
                                ? "bg-sidebar-accent text-foreground shadow-card"
                                : "text-muted-foreground hover:bg-sidebar-accent/70 hover:text-foreground",
                        )}
                    >
                        <Icon className="h-5 w-5" />
                        <span className="sr-only">{label}</span>
                    </Link>
                </HoverCardTrigger>
                <HoverCardContent side="right" align="center" className="rounded-lg border border-border bg-popover px-3 py-2 text-sm text-foreground shadow-lg">
                    {label}
                </HoverCardContent>
            </HoverCard>
        );
    }

    return (
        <Link to={to} onClick={onClick} aria-current={active ? "page" : undefined} className={commonClasses}>
            <Icon className="h-5 w-5" />
            <span>{label}</span>
        </Link>
    );
}
