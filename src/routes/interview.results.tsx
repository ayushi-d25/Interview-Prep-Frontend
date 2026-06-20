import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AlertCircle, Lightbulb, ThumbsUp, Trophy } from "lucide-react";
import { AppLayout } from "@/layouts/AppLayout";
import { Button } from "@/components/Button";
import { useInterviewStore } from "@/store/interviewStore";

export const Route = createFileRoute("/interview/results")({
  head: () => ({ meta: [{ title: "Results — PreprAI" }] }),
  component: ResultsPage,
});

function ResultsPage() {
  const navigate = useNavigate();
  const { result, role, difficulty, reset } = useInterviewStore();

  useEffect(() => {
    if (!result) navigate({ to: "/dashboard" });
  }, [result, navigate]);

  if (!result) return null;

  const pct = (result.score / 10) * 100;
  const radius = 70;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (pct / 100) * circ;

  return (
    <AppLayout title="Interview results" subtitle={`${role} · ${difficulty}`}>
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card flex flex-col items-center text-center">
          <div className="relative h-44 w-44">
            <svg viewBox="0 0 160 160" className="-rotate-90">
              <circle cx="80" cy="80" r={radius} stroke="currentColor" strokeWidth="12" fill="none" className="text-muted" />
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="url(#g)"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={circ}
                strokeDashoffset={offset}
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.55 0.22 270)" />
                  <stop offset="100%" stopColor="oklch(0.7 0.2 310)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold font-display">{result.score}</span>
              <span className="text-xs text-muted-foreground">out of 10</span>
            </div>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            <Trophy className="h-4 w-4" /> {result.score >= 8 ? "Excellent" : result.score >= 6 ? "Solid" : "Keep practicing"}
          </div>
          <div className="mt-6 w-full space-y-2">
            <Button className="w-full" onClick={() => { reset(); navigate({ to: "/interview/setup" }); }}>
              Practice again
            </Button>
            <Link to="/dashboard" className="block w-full rounded-lg border border-border px-4 py-2 text-center text-sm font-semibold hover:bg-secondary">
              Back to dashboard
            </Link>
          </div>
        </div>

        <div className="space-y-5">
          <FeedbackCard icon={ThumbsUp} title="Strengths" accent="success" items={result.strengths} />
          <FeedbackCard icon={AlertCircle} title="Weaknesses" accent="warning" items={result.weaknesses} />
          <FeedbackCard icon={Lightbulb} title="Suggested improvements" accent="primary" items={result.suggestions} />
        </div>
      </div>
    </AppLayout>
  );
}

function FeedbackCard({
  icon: Icon,
  title,
  items,
  accent,
}: {
  icon: typeof ThumbsUp;
  title: string;
  items: string[];
  accent: "success" | "warning" | "primary";
}) {
  const colors =
    accent === "success"
      ? "bg-success/10 text-success"
      : accent === "warning"
        ? "bg-warning/10 text-warning"
        : "bg-primary/10 text-primary";
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors}`}>
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-bold text-lg">{title}</h3>
      </div>
      <ul className="mt-4 space-y-2">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2 text-sm text-foreground">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-current opacity-50 shrink-0" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
