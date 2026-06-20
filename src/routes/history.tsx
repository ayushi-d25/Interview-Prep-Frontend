import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { History as HistoryIcon, PlayCircle, X, ShieldAlert, Award } from "lucide-react";
import { AppLayout } from "@/layouts/AppLayout";
import { EmptyState } from "@/components/EmptyState";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { getInterviewHistory, interviewService } from "@/services/interviewService";
import type { InterviewHistoryItem } from "@/types";

export const Route = createFileRoute("/history")({
  head: () => ({ meta: [{ title: "Interview history — PreprAI" }] }),
  component: HistoryPage,
});

function HistoryPage() {
  const [history, setHistory] = useState<InterviewHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInterview, setSelectedInterview] = useState<any | null>(null);
  const [loadingDetailsId, setLoadingDetailsId] = useState<string | null>(null);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("[History Page] Starting fetch of interview history...");

      const data = await getInterviewHistory();
      console.log("[History Page] Successfully fetched interview history:", {
        count: Array.isArray(data) ? data.length : 0,
        data: data,
      });

      // Validate that data is an array
      if (!Array.isArray(data)) {
        console.error("[History Page] Invalid response format - expected array, got:", typeof data);
        setError("Failed to fetch interview history: Invalid response format.");
        setHistory([]);
        return;
      }

      // Validate each item has required fields
      const validatedData = data.filter((item) => {
        const hasRequired = item &&
          (item.id || item._id) &&
          item.role &&
          item.difficulty !== undefined &&
          item.score !== undefined;

        if (!hasRequired) {
          console.warn("[History Page] Skipping invalid history item:", item);
        }
        return hasRequired;
      });

      console.log(`[History Page] Validated ${validatedData.length}/${data.length} interview records`);
      setHistory(validatedData);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || "Unknown error";
      const fullError = `Failed to fetch interview history: ${errorMessage}`;
      console.error("[History Page] Error fetching history:", {
        message: err?.message,
        status: err?.response?.status,
        data: err?.response?.data,
        fullError,
      });
      setError(fullError);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleViewDetails = async (id: string) => {
    if (!id) {
      console.error("[History Page] Cannot fetch details: missing interview ID");
      setDetailsError("Unable to load interview details: missing ID.");
      return;
    }

    try {
      setLoadingDetailsId(id);
      setDetailsError(null);
      console.log(`[History Page] Fetching details for interview ${id}...`);

      const details = await interviewService.getDetails(id);
      console.log(`[History Page] Successfully fetched details for interview ${id}:`, details);

      // Validate required fields
      if (!details || typeof details !== "object") {
        throw new Error("Invalid response format");
      }

      setSelectedInterview(details);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || "Unknown error";
      const fullError = `Failed to load interview details: ${errorMessage}`;
      console.error(`[History Page] Error loading interview ${id} details:`, {
        message: err?.message,
        status: err?.response?.status,
        data: err?.response?.data,
        fullError,
      });
      setDetailsError(fullError);

      // Show user-friendly error
      if (err?.response?.status === 404) {
        alert("Interview session not found.");
      } else if (err?.response?.status === 403) {
        alert("You don't have permission to view this interview.");
      } else {
        alert(fullError);
      }
    } finally {
      setLoadingDetailsId(null);
    }
  };

  if (loading) {
    return (
      <AppLayout title="Interview history" subtitle="Every session you've completed.">
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-4">
          <LoadingSpinner />
          <p className="text-sm font-medium animate-pulse">Loading interview history...</p>
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout title="Interview history" subtitle="Every session you've completed.">
        <div className="flex flex-col items-center justify-center py-20 text-center gap-4 max-w-md mx-auto">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Error Loading History</h3>
            <p className="text-sm text-muted-foreground mt-1">{error}</p>
          </div>
          <button
            onClick={fetchHistory}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-elegant hover:scale-[1.01] transition cursor-pointer"
          >
            Try Again
          </button>
        </div>
      </AppLayout>
    );
  }

  if (history.length === 0) {
    return (
      <AppLayout title="Interview history" subtitle="Every session you've completed.">
        <EmptyState
          icon={HistoryIcon}
          title="No interview history found."
          description="Start your first session — it only takes a minute."
          action={
            <Link
              to="/interview/setup"
              className="inline-flex items-center gap-2 rounded-lg gradient-hero px-4 py-2 text-sm font-semibold text-white shadow-elegant animate-in fade-in"
            >
              <PlayCircle className="h-4 w-4" /> Start interview
            </Link>
          }
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Interview history" subtitle="Every session you've completed.">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Date</th>
                <th className="px-6 py-3 text-left font-semibold">Role</th>
                <th className="px-6 py-3 text-left font-semibold">Difficulty</th>
                <th className="px-6 py-3 text-left font-semibold">Score</th>
                <th className="px-6 py-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {history.map((item) => {
                const itemId = item.id || item._id || "";
                const displayDate = item.date || (item.completedAt ? new Date(item.completedAt).toLocaleDateString() : "—");
                return (
                  <tr key={itemId} className="hover:bg-muted/30 transition animate-in fade-in">
                    <td className="px-6 py-4 text-foreground">{displayDate}</td>
                    <td className="px-6 py-4 font-medium text-foreground">{item.role}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${item.difficulty === "Easy"
                          ? "bg-success/10 text-success"
                          : item.difficulty === "Medium"
                            ? "bg-warning/10 text-warning"
                            : "bg-destructive/10 text-destructive"
                          }`}
                      >
                        {item.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold tabular-nums">{item.score}/10</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleViewDetails(itemId)}
                        disabled={loadingDetailsId !== null}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:bg-secondary text-primary transition disabled:opacity-50 cursor-pointer"
                      >
                        {loadingDetailsId === itemId ? (
                          <span className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        ) : null}
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal Overlay */}
      {selectedInterview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-elegant flex flex-col gap-6 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <h2 className="text-xl font-bold font-display">
                  {selectedInterview.role || "Interview"} Evaluation Details
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Difficulty: {selectedInterview.difficulty || "—"} · Completed:{" "}
                  {selectedInterview.completedAt
                    ? new Date(selectedInterview.completedAt).toLocaleString()
                    : selectedInterview.createdAt
                      ? new Date(selectedInterview.createdAt).toLocaleString()
                      : "—"}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedInterview(null);
                  setDetailsError(null);
                }}
                className="rounded-lg p-1.5 hover:bg-secondary text-muted-foreground transition cursor-pointer"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {detailsError && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-3">
                <p className="text-sm text-destructive">{detailsError}</p>
              </div>
            )}

            {/* Score & Feedback Highlights */}
            <div className="grid gap-6 md:grid-cols-[160px_1fr] items-center">
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-muted/40 border border-border text-center">
                <span className="text-4xl font-bold font-display">
                  {selectedInterview.score ?? "—"}
                </span>
                <span className="text-xs text-muted-foreground mt-1">Score out of 10</span>
                {selectedInterview.score !== undefined && (
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    <Award className="h-3.5 w-3.5" />
                    {selectedInterview.score >= 8
                      ? "Excellent"
                      : selectedInterview.score >= 6
                        ? "Solid"
                        : "Keep Practicing"}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {selectedInterview.strengths && selectedInterview.strengths.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-success">Key Strengths</h4>
                    <ul className="mt-1 space-y-1 list-disc list-inside text-sm text-foreground">
                      {selectedInterview.strengths.map((str: string, idx: number) => (
                        <li key={`strength-${idx}`}>{str}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedInterview.weaknesses && selectedInterview.weaknesses.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-warning">Weaknesses</h4>
                    <ul className="mt-1 space-y-1 list-disc list-inside text-sm text-foreground">
                      {selectedInterview.weaknesses.map((weak: string, idx: number) => (
                        <li key={`weakness-${idx}`}>{weak}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedInterview.suggestions && selectedInterview.suggestions.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                      Suggested Improvements
                    </h4>
                    <ul className="mt-1 space-y-1 list-disc list-inside text-sm text-foreground">
                      {selectedInterview.suggestions.map((sug: string, idx: number) => (
                        <li key={`suggestion-${idx}`}>{sug}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Q&A Transcript */}
            {selectedInterview.questions && selectedInterview.questions.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-bold text-md border-b border-border pb-2">Interview Q&A Transcript</h3>
                <div className="space-y-4">
                  {selectedInterview.questions.map((q: string, idx: number) => {
                    const ans = selectedInterview.answers?.[idx] || "(No answer provided)";
                    return (
                      <div key={idx} className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
                        <p className="text-sm font-semibold text-foreground">
                          Q{idx + 1}: {q}
                        </p>
                        <p className="text-sm text-muted-foreground pl-3 border-l-2 border-primary/50 whitespace-pre-wrap">
                          {typeof ans === "string" ? ans : JSON.stringify(ans)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-end pt-4 border-t border-border">
              <button
                onClick={() => {
                  setSelectedInterview(null);
                  setDetailsError(null);
                }}
                className="rounded-lg bg-secondary px-4 py-2 text-sm font-semibold hover:bg-muted text-foreground transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
