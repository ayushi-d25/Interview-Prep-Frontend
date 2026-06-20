import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppLayout } from "@/layouts/AppLayout";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { DashboardCard } from "@/components/DashboardCard";
import { Award, CheckCircle2, ListChecks, TrendingUp } from "lucide-react";
import { profileService } from "@/services/profileService";
import { useAuthStore } from "@/store/authStore";
import type { ProfileStats } from "@/types";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — PreprAI" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const setAuth = useAuthStore((s) => s.setAuth);
  const logout = useAuthStore((s) => s.logout);
  const token = useAuthStore((s) => s.token);
  const navigate = useNavigate();
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [form, setForm] = useState({ name: user?.name ?? "", email: user?.email ?? "" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { profileService.getStats().then(setStats); }, []);
  useEffect(() => { setForm({ name: user?.name ?? "", email: user?.email ?? "" }); }, [user]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const u = await profileService.updateProfile(form);
    if (token) setAuth(u, token);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const initials = (user?.name ?? "U").split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  return (
    <AppLayout title="Profile" subtitle="Manage your account and review your stats.">
      <div className="space-y-8 max-w-4xl">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-hero text-xl font-bold text-white shadow-glow">
            {initials}
          </div>
          <div>
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Member since {user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : "—"}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardCard label="Total interviews" value={stats?.totalInterviews ?? 0} icon={ListChecks} />
          <DashboardCard label="Average score" value={`${stats?.averageScore ?? 0}/10`} icon={TrendingUp} accent="success" />
          <DashboardCard label="Completed" value={stats?.completed ?? 0} icon={CheckCircle2} accent="success" />
          <DashboardCard label="Top role" value={stats?.bestRole ?? "—"} icon={Award} accent="warning" />
        </div>

        <form onSubmit={save} className="rounded-2xl border border-border bg-card p-6 shadow-card space-y-4">
          <h3 className="text-lg font-bold">Account settings</h3>
          <Input label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <div className="flex items-center justify-between pt-2">
            <Button type="submit" loading={saving}>Save changes</Button>
            {saved && <span className="text-sm text-success">Saved ✓</span>}
          </div>
        </form>

        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
          <h3 className="font-bold text-destructive">Danger zone</h3>
          <p className="text-sm text-muted-foreground mt-1">Sign out of your account on this device.</p>
          <Button
            variant="destructive"
            className="mt-4"
            onClick={() => { logout(); navigate({ to: "/" }); }}
          >
            Sign out
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
