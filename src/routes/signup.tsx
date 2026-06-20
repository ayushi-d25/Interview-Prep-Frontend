import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Logo } from "@/components/Logo";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create your account — PreprAI" }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (form.password.length < 6) e.password = "At least 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await authService.signup({ name: form.name, email: form.email, password: form.password });
      setAuth(res.user, res.token);
      setSuccess(true);
      setTimeout(() => navigate({ to: "/dashboard" }), 700);
    } catch {
      setErrors({ form: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:flex relative overflow-hidden gradient-hero text-white p-12 flex-col justify-between">
        <Logo />
        <div className="relative z-10">
          <h2 className="text-4xl font-bold font-display leading-tight">
            Practice like it's <br /> the real thing.
          </h2>
          <p className="mt-4 text-white/85 max-w-md">
            Realistic mock interviews. Instant feedback. A clearer path to your next offer.
          </p>
          <ul className="mt-8 space-y-3">
            {["AI-generated, role-specific questions", "Detailed scoring & feedback", "Track progress over time"].map(
              (item) => (
                <li key={item} className="flex items-center gap-2 text-white/90">
                  <CheckCircle2 className="h-5 w-5" />
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>
        <p className="text-xs text-white/60">© {new Date().getFullYear()} PreprAI</p>
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      </div>
      <div className="flex items-center justify-center p-6 md:p-12 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="md:hidden mb-8"><Logo /></div>
          <h1 className="text-3xl font-bold font-display">Create your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">Free forever. No credit card required.</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <Input label="Full name" name="name" placeholder="Jane Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} />
            <Input label="Email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
            <Input label="Password" name="password" type="password" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} error={errors.password} />
            <Input label="Confirm password" name="confirm" type="password" placeholder="••••••••" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} error={errors.confirm} />
            {errors.form && <p className="text-sm text-destructive">{errors.form}</p>}
            {success && (
              <div className="rounded-lg border border-success/30 bg-success/10 px-3 py-2 text-sm text-success flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Account created — redirecting…
              </div>
            )}
            <Button type="submit" size="lg" loading={loading} className="w-full">
              Create account
            </Button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
