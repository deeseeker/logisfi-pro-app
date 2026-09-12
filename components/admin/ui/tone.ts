import type { Tone } from "@/types/admin";

export interface ToneStyle {
  bg: string;
  text: string;
  ring: string;
  dot: string;
}

export const TONE: Record<Tone, ToneStyle> = {
  success: { bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-200", dot: "bg-emerald-500" },
  warning: { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-200", dot: "bg-amber-500" },
  error: { bg: "bg-red-50", text: "text-red-700", ring: "ring-red-200", dot: "bg-red-500" },
  info: { bg: "bg-blue-50", text: "text-blue-700", ring: "ring-blue-200", dot: "bg-blue-500" },
  neutral: { bg: "bg-slate-100", text: "text-slate-600", ring: "ring-slate-200", dot: "bg-slate-400" },
  violet: { bg: "bg-violet-50", text: "text-violet-700", ring: "ring-violet-200", dot: "bg-violet-500" },
};

export const STATUS_TONE: Record<string, Tone> = {
  Active: "success",
  Draft: "neutral",
  Submitted: "info",
  Confirmed: "info",
  "In Transit": "violet",
  Delivered: "info",
  "Waybill Confirmed": "success",
  "Financing Requested": "warning",
  Funded: "success",
  Invoiced: "info",
  Collected: "success",
  Reconciled: "success",
  "Pending Review": "warning",
  "Pending Approval": "warning",
  "Pending Settlement": "warning",
  Approved: "info",
  Completed: "success",
  Disbursed: "success",
  Pending: "warning",
  Failed: "error",
  InTransit: "violet",
  Rejected: "error",
  Paid: "success",
  "Partially Paid": "warning",
  Outstanding: "neutral",
  Overdue: "error",
  "Under Review": "warning",
  Suspended: "error",
  Expiring: "warning",
  Valid: "success",
  Verified: "success",
  Yes: "warning",
  No: "success",
  Sent: "info",
  "Exposure Warning": "warning",
};

export function toneFor(status: string): Tone {
  return STATUS_TONE[status] ?? "neutral";
}
