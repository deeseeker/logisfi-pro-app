import { cn } from "@/lib/utils";

const BAR_TONES = {
  blue: "bg-blue-800",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
} as const;

export interface ProgressBarProps {
  value: number;
  max?: number;
  tone?: keyof typeof BAR_TONES;
  className?: string;
  height?: string;
}

export function ProgressBar({
  value,
  max = 100,
  tone = "blue",
  className,
  height = "h-1.5",
}: ProgressBarProps) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div
      className={cn(
        "w-full bg-slate-100 rounded-full overflow-hidden",
        height,
        className
      )}
    >
      <div
        className={cn("h-full rounded-full transition-all duration-500", BAR_TONES[tone])}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
