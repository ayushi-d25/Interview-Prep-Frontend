import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Award, CheckCircle2, ListChecks, PlayCircle, TrendingUp } from "lucide-react";
import { AppLayout } from "@/layouts/AppLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { interviewService } from "@/services/interviewService";
import { profileService } from "@/services/profileService";
import type { InterviewHistoryItem, ProfileStats } from "@/types";
import { useAuthStore } from "@/store/authStore";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — PreprAI" }] }),
  component: Dashboard,
});

function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [history, setHistory] = useState<InterviewHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        console.log("[Dashboard] Fetching stats and history...");
        const [s, h] = await Promise.all([
          profileService.getStats(),
          interviewService.history(),
        ]);

        console.log("[Dashboard] Successfully fetched:", {
          statsAvailable: !!s,
          historyCount: Array.isArray(h) ? h.length : 0,
        });

        setStats(s);
        setHistory(Array.isArray(h) ? h : []);
        setLoading(false);
      } catch (error) {
        console.error("[Dashboard] Error fetching data:", error);
        setLoading(false);
        // Set defaults to allow page to render
        setStats({
          totalInterviews: 0,
          averageScore: 0,
          completed: 0,
          bestRole: "—",
        });
        setHistory([]);
      }
    })();
  }, []);

  return (
    <AppLayout title={`Welcome back, ${user?.name?.split(" ")[0] ?? "there"}`} subtitle="Here's your prep snapshot for today.">
      {loading ? (
        <div className="flex items-center justify-center py-24 text-muted-foreground"><LoadingSpinner /></div>
      ) : (
        <div className="space-y-8">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            <DashboardCard label="Total interviews" value={stats?.totalInterviews ?? 0} icon={ListChecks} delta="+3 this month" />
            <DashboardCard label="Average score" value={`${stats?.averageScore ?? 0}/10`} icon={TrendingUp} accent="success" delta="+0.8 vs last month" />
            <DashboardCard label="Completed" value={stats?.completed ?? 0} icon={CheckCircle2} accent="success" />
            <DashboardCard label="Top role" value={stats?.bestRole ?? "—"} icon={Award} accent="warning" />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold">Recent activity</h2>
                  <p className="text-sm text-muted-foreground">Your last interview sessions.</p>
                </div>
                <Link to="/history" className="text-sm font-semibold text-primary hover:underline">View all</Link>
              </div>
              <div className="divide-y divide-border">
                {history.slice(0, 5).map((h) => (
                  <div key={h.id} className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-semibold">{h.role}</p>
                      <p className="text-xs text-muted-foreground">{h.date} · {h.difficulty}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-medium rounded-full px-2.5 py-1 ${h.status === "Completed" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                        }`}>{h.status}</span>
                      <span className="font-bold tabular-nums">{h.score}/10</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border gradient-hero p-6 text-white shadow-elegant flex flex-col justify-between">
              <div>
                <PlayCircle className="h-8 w-8" />
                <h3 className="mt-4 text-xl font-bold font-display">Start a new interview</h3>
                <p className="mt-1 text-sm text-white/85">Pick a role and difficulty — get a tailored session in seconds.</p>
              </div>
              <Link to="/interview/setup" className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-primary hover:scale-[1.02] transition">
                Begin now
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-lg font-bold">Profile summary</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="text-sm font-semibold">{user?.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-semibold">{user?.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Member since</p>
                <p className="text-sm font-semibold">{user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : "—"}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
