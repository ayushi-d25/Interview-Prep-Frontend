import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Code2, Cpu, Layers, Server, Zap } from "lucide-react";
import { AppLayout } from "@/layouts/AppLayout";
import { Button } from "@/components/Button";
import { ROLES } from "@/data/mockData";
import type { Difficulty, Role } from "@/types";
import { interviewService } from "@/services/interviewService";
import { useInterviewStore } from "@/store/interviewStore";

export const Route = createFileRoute("/interview/setup")({
  head: () => ({ meta: [{ title: "New interview — PreprAI" }] }),
  component: SetupPage,
});

const roleIcons: Record<Role, typeof Code2> = {
  "Frontend Developer": Code2,
  "React Developer": Zap,
  "Full Stack Developer": Layers,
  "Backend Developer": Server,
  "Node.js Developer": Cpu,
};

const difficulties: { value: Difficulty; desc: string }[] = [
  { value: "Easy", desc: "Warm-up fundamentals" },
  { value: "Medium", desc: "Standard interview loop" },
  { value: "Hard", desc: "Senior / staff level" },
];

function SetupPage() {
  const navigate = useNavigate();
  const setSetup = useInterviewStore((s) => s.setSetup);
  const setQuestions = useInterviewStore((s) => s.setQuestions);
  const [role, setRole] = useState<Role | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [loading, setLoading] = useState(false);

  async function start() {
    if (!role || !difficulty) return;
    setLoading(true);
    setSetup(role, difficulty);
    const { questions } = await interviewService.generate({ role, difficulty });
    setQuestions(questions);
    setLoading(false);
    navigate({ to: "/interview/session" });
  }

  return (
    <AppLayout title="Start a new interview" subtitle="Pick a role and difficulty to get started.">
      <div className="space-y-10 max-w-4xl">
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Choose a role</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ROLES.map((r) => {
              const Icon = roleIcons[r];
              const active = role === r;
              return (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`text-left rounded-2xl border p-5 transition-all ${
                    active
                      ? "border-primary bg-primary/5 shadow-elegant"
                      : "border-border bg-card hover:border-primary/40 hover:shadow-card"
                  }`}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${active ? "gradient-hero text-white" : "bg-primary/10 text-primary"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-3 font-semibold">{r}</p>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Difficulty</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {difficulties.map((d) => {
              const active = difficulty === d.value;
              return (
                <button
                  key={d.value}
                  onClick={() => setDifficulty(d.value)}
                  className={`text-left rounded-2xl border p-5 transition-all ${
                    active
                      ? "border-primary bg-primary/5 shadow-elegant"
                      : "border-border bg-card hover:border-primary/40 hover:shadow-card"
                  }`}
                >
                  <p className="font-bold text-lg">{d.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{d.desc}</p>
                </button>
              );
            })}
          </div>
        </section>

        <div className="flex justify-end">
          <Button size="lg" disabled={!role || !difficulty} loading={loading} onClick={start}>
            Generate interview
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
