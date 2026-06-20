import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { AppLayout } from "@/layouts/AppLayout";
import { Button } from "@/components/Button";
import { useInterviewStore } from "@/store/interviewStore";
import { interviewService } from "@/services/interviewService";

export const Route = createFileRoute("/interview/session")({
  head: () => ({ meta: [{ title: "Interview session — PreprAI" }] }),
  component: SessionPage,
});

function SessionPage() {
  const navigate = useNavigate();
  const { questions, currentIndex, answers, role, difficulty, setIndex, setAnswer, setResult } =
    useInterviewStore();
  const [seconds, setSeconds] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!questions.length) {
      navigate({ to: "/interview/setup" });
    }
  }, [questions.length, navigate]);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const current = questions[currentIndex];
  const progress = useMemo(
    () => (questions.length ? ((currentIndex + 1) / questions.length) * 100 : 0),
    [currentIndex, questions.length],
  );
  const time = useMemo(() => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }, [seconds]);

  async function submit() {
    if (!role || !difficulty) return;
    setSubmitting(true);
    const payload = questions.map((q) => ({
      questionId: q.id,
      question: q.question,
      answer: answers[q.id] ?? "",
    }));
    const result = await interviewService.evaluate({ role, difficulty, answers: payload });
    setResult(result);
    setSubmitting(false);
    navigate({ to: "/interview/results" });
  }

  if (!current) return null;

  return (
    <AppLayout title={`${role} · ${difficulty}`} subtitle="Take your time. Answer thoughtfully.">
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                <Clock className="h-4 w-4" /> {time}
              </span>
            </div>
            <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full gradient-hero transition-all" style={{ width: `${progress}%` }} />
            </div>
            <h2 className="mt-6 text-2xl font-bold font-display leading-snug">{current.question}</h2>
            <textarea
              value={answers[current.id] ?? ""}
              onChange={(e) => setAnswer(current.id, e.target.value)}
              placeholder="Type your answer here…"
              className="mt-6 w-full min-h-[220px] rounded-xl border border-border bg-background p-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
            />
            <div className="mt-4 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </Button>
              {currentIndex < questions.length - 1 ? (
                <Button onClick={() => setIndex(currentIndex + 1)}>
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={submit} loading={submitting}>
                  Submit for evaluation
                </Button>
              )}
            </div>
          </div>
        </div>

        <aside className="rounded-2xl border border-border bg-card p-5 shadow-card h-fit">
          <h3 className="text-sm font-semibold mb-3">Question navigator</h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, i) => {
              const isCurrent = i === currentIndex;
              const isAnswered = (answers[q.id] ?? "").trim().length > 0;
              return (
                <button
                  key={q.id}
                  onClick={() => setIndex(i)}
                  className={`h-10 rounded-lg text-sm font-semibold transition ${
                    isCurrent
                      ? "gradient-hero text-white shadow-elegant"
                      : isAnswered
                        ? "bg-success/15 text-success"
                        : "bg-muted text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <div className="mt-5 space-y-2 text-xs text-muted-foreground">
            <p><span className="inline-block h-2 w-2 rounded-full bg-success mr-2" />Answered</p>
            <p><span className="inline-block h-2 w-2 rounded-full bg-muted-foreground/40 mr-2" />Unanswered</p>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}
