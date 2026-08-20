"use client";

import * as React from "react";
import {
  BarChart3,
  CalendarClock,
  CheckCircle2,
  Clock,
  Download,
  FileBarChart,
  FileSpreadsheet,
  FileText,
  Landmark,
  Package,
  Percent,
  Play,
  Receipt,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";

import { AdminButton } from "@/components/admin/ui/admin-button";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { Panel } from "@/components/admin/ui/panel";
import { SectionTabs } from "@/components/admin/ui/section-tabs";
import { StatCard } from "@/components/admin/ui/stat-card";
import { StatusBadge, ToneBadge } from "@/components/admin/ui/status-badge";
import type { Tone } from "@/types/admin";
import { formatDateTime } from "@/utils/helpers";

interface ReportDefinition {
  key: string;
  title: string;
  description: string;
  category: "Operations" | "Finance" | "Risk";
  icon: LucideIcon;
  cadence: string;
  tone: Tone;
}

const REPORTS: ReportDefinition[] = [
  {
    key: "shipment-register",
    title: "Shipment Register",
    description:
      "Every consignment in the period with route, carrier, truck class and freight value.",
    category: "Operations",
    icon: Package,
    cadence: "Daily",
    tone: "info",
  },
  {
    key: "carrier-performance",
    title: "Carrier Performance",
    description:
      "On-time delivery, fleet utilisation and rating movement by haulage partner.",
    category: "Operations",
    icon: BarChart3,
    cadence: "Weekly",
    tone: "info",
  },
  {
    key: "financing-book",
    title: "Financing Book",
    description:
      "Disbursements by investor with principal outstanding, interest accrued and tenor.",
    category: "Finance",
    icon: Landmark,
    cadence: "Daily",
    tone: "success",
  },
  {
    key: "receivables-ageing",
    title: "Receivables Ageing",
    description:
      "Outstanding invoices bucketed by age, with debtor concentration and recovery rate.",
    category: "Finance",
    icon: Receipt,
    cadence: "Weekly",
    tone: "warning",
  },
  {
    key: "settlement-advice",
    title: "Settlement Advice",
    description:
      "Principal, investor interest and platform fee per settled financing request.",
    category: "Finance",
    icon: Percent,
    cadence: "Monthly",
    tone: "success",
  },
  {
    key: "exposure-limits",
    title: "Exposure & Limits",
    description:
      "Investor exposure against approved limits, with headroom and breach warnings.",
    category: "Risk",
    icon: FileBarChart,
    cadence: "Daily",
    tone: "violet",
  },
  {
    key: "fraud-screening",
    title: "Fraud Screening",
    description:
      "Duplicate waybill matches, anomalous pricing and flagged financing requests.",
    category: "Risk",
    icon: ShieldAlert,
    cadence: "Daily",
    tone: "error",
  },
  {
    key: "regulatory-pack",
    title: "Regulatory Pack",
    description:
      "CBN-aligned disclosure bundle covering the book, provisions and control breaches.",
    category: "Risk",
    icon: FileText,
    cadence: "Quarterly",
    tone: "neutral",
  },
];

const TABS = [
  { key: "all", label: "All Reports", count: REPORTS.length },
  {
    key: "Operations",
    label: "Operations",
    count: REPORTS.filter((r) => r.category === "Operations").length,
  },
  {
    key: "Finance",
    label: "Finance",
    count: REPORTS.filter((r) => r.category === "Finance").length,
  },
  {
    key: "Risk",
    label: "Risk",
    count: REPORTS.filter((r) => r.category === "Risk").length,
  },
];

type GeneratedReport = {
  id: string;
  report: string;
  period: string;
  format: string;
  requestedBy: string;
  generated: string;
  status: string;
};

const RECENT_EXPORTS: GeneratedReport[] = [
  { id: "RPT-1187", report: "Financing Book", period: "Jul 2026", format: "XLSX", requestedBy: "Ada Okonkwo", generated: "2026-08-04T09:12:00Z", status: "Completed" },
  { id: "RPT-1186", report: "Receivables Ageing", period: "Jul 2026", format: "PDF", requestedBy: "Ada Okonkwo", generated: "2026-08-04T08:40:00Z", status: "Completed" },
  { id: "RPT-1185", report: "Fraud Screening", period: "03 Aug 2026", format: "CSV", requestedBy: "System", generated: "2026-08-04T00:05:00Z", status: "Completed" },
  { id: "RPT-1184", report: "Shipment Register", period: "03 Aug 2026", format: "XLSX", requestedBy: "Chiamaka Reginald", generated: "2026-08-03T18:22:00Z", status: "Completed" },
  { id: "RPT-1183", report: "Regulatory Pack", period: "Q2 2026", format: "PDF", requestedBy: "Tolu Adeyemi", generated: "2026-08-03T14:01:00Z", status: "Pending Review" },
  { id: "RPT-1182", report: "Exposure & Limits", period: "02 Aug 2026", format: "CSV", requestedBy: "System", generated: "2026-08-03T00:05:00Z", status: "Completed" },
];

const EXPORT_COLUMNS: DataTableColumn<GeneratedReport>[] = [
  {
    key: "id",
    header: "Export",
    sortable: true,
    render: (r) => (
      <span className="text-xs font-semibold text-slate-800 font-figure">{r.id}</span>
    ),
  },
  {
    key: "report",
    header: "Report",
    sortable: true,
    render: (r) => (
      <span className="text-xs font-medium text-slate-700">{r.report}</span>
    ),
  },
  {
    key: "period",
    header: "Period",
    sortable: true,
    render: (r) => <span className="text-xs text-slate-600 font-figure">{r.period}</span>,
  },
  {
    key: "format",
    header: "Format",
    sortable: true,
    render: (r) => (
      <ToneBadge tone="neutral" dot={false}>
        {r.format}
      </ToneBadge>
    ),
  },
  {
    key: "requestedBy",
    header: "Requested By",
    sortable: true,
    render: (r) => <span className="text-xs text-slate-600">{r.requestedBy}</span>,
  },
  {
    key: "generated",
    header: "Generated",
    sortable: true,
    render: (r) => (
      <span className="text-xs text-slate-500 font-figure">
        {formatDateTime(r.generated)}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (r) => <StatusBadge status={r.status} />,
  },
];

export function ReportsPage() {
  const [tab, setTab] = React.useState("all");

  const visible = React.useMemo(
    () => (tab === "all" ? REPORTS : REPORTS.filter((r) => r.category === tab)),
    [tab]
  );

  const scheduled = REPORTS.filter((r) => r.cadence === "Daily").length;

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Intelligence", "Reports"]}
        eyebrow="Intelligence"
        title="Reports"
        subtitle="Generate operational, financial and risk reporting packs, or pull a previous export from the archive."
        action={
          <div className="flex items-center gap-2">
            <AdminButton variant="secondary" icon={CalendarClock} size="sm">
              Manage schedules
            </AdminButton>
            <AdminButton variant="primary" icon={Play} size="sm">
              Run report
            </AdminButton>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Available Reports" value={REPORTS.length} icon={FileBarChart} />
        <StatCard
          label="Daily Schedules"
          value={scheduled}
          icon={Clock}
          tone="info"
        />
        <StatCard
          label="Exports (30 days)"
          value={RECENT_EXPORTS.length}
          icon={Download}
          tone="success"
          delta={12.5}
        />
        <StatCard
          label="Awaiting Sign-off"
          value={RECENT_EXPORTS.filter((r) => r.status !== "Completed").length}
          icon={CheckCircle2}
          tone="warning"
        />
      </div>

      <SectionTabs tabs={TABS} active={tab} onChange={setTab} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {visible.map((r) => (
          <Panel key={r.key} hover className="flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
                <r.icon className="w-5 h-5" strokeWidth={2} />
              </div>
              <ToneBadge tone={r.tone} dot={false}>
                {r.cadence}
              </ToneBadge>
            </div>
            <h3 className="text-sm font-semibold text-slate-900">{r.title}</h3>
            <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed flex-1">
              {r.description}
            </p>
            <div className="flex items-center gap-2 mt-4">
              <AdminButton variant="primary" size="sm" icon={Play} className="flex-1">
                Generate
              </AdminButton>
              <AdminButton
                variant="secondary"
                size="sm"
                icon={FileSpreadsheet}
                aria-label={`Schedule ${r.title}`}
              />
            </div>
          </Panel>
        ))}
      </div>

      <DataTable
        title="Recent Exports"
        subtitle="Generated reports available for download"
        columns={EXPORT_COLUMNS}
        data={RECENT_EXPORTS}
        rowKey="id"
        searchKeys={["id", "report", "period", "requestedBy", "format"]}
        filterOptions={[
          { key: "format", label: "Format", options: ["PDF", "XLSX", "CSV"] },
          { key: "status", label: "Status", options: ["Completed", "Pending Review"] },
        ]}
        rowActions={[
          { label: "Download", icon: Download, onClick: () => {} },
          { label: "Re-run", icon: Play, onClick: () => {} },
        ]}
        bulkActions={[{ label: "Download selected", icon: Download, onClick: () => {} }]}
      />
    </div>
  );
}
