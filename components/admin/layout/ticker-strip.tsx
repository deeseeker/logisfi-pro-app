"use client";

import { useAdminSummary } from "@/lib/api/hooks/dashboard";
import { cn } from "@/lib/utils";
import { formatNairaCompact } from "@/utils/helpers";

export function TickerStrip() {
  const summary = useAdminSummary();
  const data = summary.data?.responseData;
  const items = [
    { label: "Shipments", value: data?.totalShipments ?? "—" },
    { label: "Active invoices", value: String(data?.activeInvoices ?? "—") },
    {
      label: "Loan in use",
      value: formatNairaCompact(Number(data?.loanAmountInUse ?? 0)),
    },
    {
      label: "Available book",
      value: formatNairaCompact(Number(data?.loanAmountAvailable ?? 0)),
    },
    {
      label: "Collected",
      value: formatNairaCompact(data?.totalCollected ?? 0),
    },
  ];

  return (
    <div className="h-9 bg-blue-950 border-b border-white/10 flex items-center overflow-hidden shrink-0">
      <div className="flex items-center gap-8 animate-ticker whitespace-nowrap px-6">
        {[...items, ...items].map((item, index) => (
          <span key={`${item.label}-${index}`} className="flex items-center gap-2 text-xs">
            <span className={cn("w-1.5 h-1.5 rounded-full bg-cyan-400")} />
            <span className="text-blue-300/70">{item.label}</span>
            <span className="text-white font-semibold tabular-nums font-figure">
              {item.value}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
