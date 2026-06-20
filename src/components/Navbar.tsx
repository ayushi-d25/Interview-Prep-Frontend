import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { label: "Features", href: "#features" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 glass border-b border-border/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-lg gradient-hero px-4 py-2 text-sm font-semibold text-white shadow-elegant transition-transform hover:scale-[1.03]"
          >
            Get Started
          </Link>
        </div>
        <button
          className="md:hidden p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 space-y-3">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-sm font-medium text-muted-foreground">
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-3 pt-3">
            <ThemeToggle />
            <Link to="/login" className="flex-1 rounded-lg border border-border px-4 py-2 text-center text-sm font-semibold">Login</Link>
            <Link to="/signup" className="flex-1 rounded-lg gradient-hero px-4 py-2 text-center text-sm font-semibold text-white">Sign Up</Link>
          </div>
        </div>
      )}
    </header>
  );
}
