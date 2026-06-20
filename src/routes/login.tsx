import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — PreprAI" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await authService.login(form);
      setAuth(res.user, res.token);
      navigate({ to: "/dashboard" });
    } catch {
      setErrors({ form: "Invalid credentials" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="flex items-center justify-center p-6 md:p-12 bg-background order-2 md:order-1">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="md:hidden mb-8"><Logo /></div>
          <h1 className="text-3xl font-bold font-display">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to continue your prep journey.</p>
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <Input label="Email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
            <Input label="Password" name="password" type="password" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} error={errors.password} />
            {errors.form && <p className="text-sm text-destructive">{errors.form}</p>}
            <Button type="submit" size="lg" loading={loading} className="w-full">Sign in</Button>
          </form>
          <p className="mt-6 text-sm text-muted-foreground text-center">
            New here?{" "}
            <Link to="/signup" className="font-semibold text-primary hover:underline">Create an account</Link>
          </p>
          <div className="mt-8 rounded-lg border border-border bg-card p-3 text-xs text-muted-foreground">
            <strong className="text-foreground">Demo:</strong> use any email & password to sign in.
          </div>
        </motion.div>
      </div>
      <div className="hidden md:flex relative overflow-hidden gradient-hero text-white p-12 flex-col justify-between order-1 md:order-2">
        <Logo />
        <div>
          <h2 className="text-4xl font-bold font-display leading-tight">
            Welcome back to <br /> your prep workspace.
          </h2>
          <p className="mt-4 text-white/85 max-w-md">
            Your progress, history, and personalized plan are waiting.
          </p>
        </div>
        <p className="text-xs text-white/60">© {new Date().getFullYear()} PreprAI</p>
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      </div>
    </div>
  );
}
