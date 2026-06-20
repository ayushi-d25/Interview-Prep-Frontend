import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            AI-powered interview practice that adapts to your goals. Land your next role with confidence.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#features" className="hover:text-foreground">Features</a></li>
            <li><a href="#pricing" className="hover:text-foreground">Pricing</a></li>
            <li><a href="#testimonials" className="hover:text-foreground">Testimonials</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">About</a></li>
            <li><a href="#" className="hover:text-foreground">Careers</a></li>
            <li><a href="#" className="hover:text-foreground">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} PreprAI. All rights reserved.
      </div>
    </footer>
  );
}
