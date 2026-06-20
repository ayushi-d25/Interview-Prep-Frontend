import type { LucideIcon } from "lucide-react";

export function DashboardCard({
  label,
  value,
  delta,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string | number;
  delta?: string;
  icon: LucideIcon;
  accent?: "primary" | "success" | "warning";
}) {
  const ring =
    accent === "success"
      ? "bg-success/10 text-success"
      : accent === "warning"
        ? "bg-warning/10 text-warning"
        : "bg-primary/10 text-primary";
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elegant">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold font-display tracking-tight">{value}</p>
          {delta && <p className="mt-1 text-xs text-success">{delta}</p>}
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${ring}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
