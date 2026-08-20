"use client";

import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

import { cn } from "@/lib/utils";
import type { Tone } from "@/types/admin";

import { Panel } from "./panel";

const ICON_TONES: Partial<Record<Tone, string>> = {
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  error: "bg-red-50 text-red-700",
};

export interface StatCardProps {
  label: string;
  value: React.ReactNode;
  delta?: number;
  deltaLabel?: string;
  icon?: LucideIcon;
  tone?: Tone;
  sparkline?: { v: number }[];
}

export function StatCard({
  label,
  value,
  delta,
  deltaLabel,
  icon: Icon,
  tone = "neutral",
  sparkline,
}: StatCardProps) {
  const up = (delta ?? 0) >= 0;
  const gradientId = `spark-${label.replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <Panel hover className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            {label}
          </p>
          <p className="text-[26px] font-semibold text-slate-900 mt-2 tabular-nums tracking-tight font-figure">
            {value}
          </p>
          {delta !== undefined && (
            <div className="flex items-center gap-1.5 mt-2">
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded",
                  up ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50"
                )}
              >
                {up ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {Math.abs(delta)}%
              </span>
              <span className="text-xs text-slate-400">
                {deltaLabel || "vs last month"}
              </span>
            </div>
          )}
        </div>
        {Icon && (
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
              ICON_TONES[tone] ?? "bg-blue-50 text-blue-800"
            )}
          >
            <Icon className="w-5 h-5" strokeWidth={2} />
          </div>
        )}
      </div>
      {sparkline && (
        <div className="h-8 mt-3 -mb-1 -mx-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparkline}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1e3a8a" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#1e3a8a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke="#1e3a8a"
                strokeWidth={1.75}
                fill={`url(#${gradientId})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </Panel>
  );
}
