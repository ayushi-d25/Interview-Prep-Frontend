import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/authStore";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown, LogOut, Settings, User as UserIcon } from "lucide-react";

export function UserDropdown() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    const initials = (user?.name ?? "User")
        .split(" ")
        .map((name) => name[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    const handleProfile = () => {
        navigate({ to: "/profile" });
    };

    const handleLogout = () => {
        logout();
        navigate({ to: "/" });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    type="button"
                    className="inline-flex h-10 items-center gap-3 rounded-full border border-border bg-card px-3 text-sm font-medium text-foreground transition hover:bg-accent hover:text-foreground"
                >
                    <Avatar>
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <span className="hidden min-w-0 truncate sm:inline">{user?.name ?? "Profile"}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-72">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 space-y-0.5">
                            <p className="truncate text-sm font-semibold text-foreground">{user?.name ?? "Your profile"}</p>
                            <p className="truncate text-xs text-muted-foreground">{user?.email ?? "Account settings"}</p>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Button variant="secondary" size="sm" onClick={handleProfile} className="justify-center">
                            <UserIcon className="h-4 w-4" />
                            View profile
                        </Button>
                        <Button variant="outline" size="sm" disabled className="justify-center">
                            <Settings className="h-4 w-4" />
                            Settings
                        </Button>
                    </div>
                    <div className="rounded-xl border border-border bg-muted p-3">
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground transition hover:bg-destructive/90"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
