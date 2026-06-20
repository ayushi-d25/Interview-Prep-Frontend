import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl gradient-hero shadow-glow transition-transform group-hover:scale-105">
        <Sparkles className="h-5 w-5 text-white" strokeWidth={2.5} />
      </span>
      {!compact && (
        <span className="font-display text-lg font-bold tracking-tight text-foreground">
          Prepr<span className="gradient-text">AI</span>
        </span>
      )}
    </Link>
  );
}
