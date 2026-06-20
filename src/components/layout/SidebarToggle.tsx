import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarToggleProps {
    collapsed: boolean;
    onClick: () => void;
}

export function SidebarToggle({ collapsed, onClick }: SidebarToggleProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn(
                "inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-sidebar-accent/70 hover:text-foreground",
                collapsed ? "justify-center" : "justify-start",
            )}
        >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            <span className={cn("transition-all duration-200", collapsed ? "opacity-0 max-w-0 overflow-hidden" : "opacity-100")}>Collapse</span>
        </button>
    );
}
