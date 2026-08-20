import { TICKER } from "@/constants/admin/mock-data";
import { cn } from "@/lib/utils";
import type { Tone } from "@/types/admin";

const DOT: Partial<Record<Tone, string>> = {
  success: "bg-emerald-400",
  warning: "bg-amber-400",
  error: "bg-red-400",
};

export function TickerStrip() {
  return (
    <div className="h-9 bg-blue-950 border-b border-white/10 flex items-center overflow-hidden shrink-0">
      {/* The list is duplicated so the -50% translate loops seamlessly. */}
      <div className="flex items-center gap-8 animate-ticker whitespace-nowrap px-6">
        {[...TICKER, ...TICKER].map((t, i) => (
          <span key={i} className="flex items-center gap-2 text-xs">
            <span
              className={cn("w-1.5 h-1.5 rounded-full", DOT[t.tone] ?? "bg-cyan-400")}
            />
            <span className="text-blue-300/70">{t.label}</span>
            <span className="text-white font-semibold tabular-nums font-figure">
              {t.value}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
