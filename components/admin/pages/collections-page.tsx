"use client";

import {
  AlertTriangle,
  CalendarClock,
  Download,
  Eye,
  Send,
  TrendingUp,
  Wallet,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AdminButton } from "@/components/admin/ui/admin-button";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { Panel, PanelHeader } from "@/components/admin/ui/panel";
import { ProgressBar } from "@/components/admin/ui/progress-bar";
import { StatCard } from "@/components/admin/ui/stat-card";
import { StatusBadge } from "@/components/admin/ui/status-badge";
import { AGEING, COLLECTIONS_TREND, INVOICES } from "@/constants/admin/mock-data";
import type { AdminInvoice } from "@/types/admin";
import { formatDateShort, formatNairaCompact } from "@/utils/helpers";

const TOOLTIP_STYLE = {
  borderRadius: 10,
  border: "1px solid #e2e8f0",
  fontSize: 12,
} as const;

/** Collections is the receivables-chasing view: anything not fully settled. */
const OPEN_INVOICES = INVOICES.filter((i) => i.status !== "Paid");

const COLUMNS: DataTableColumn<AdminInvoice>[] = [
  {
    key: "id",
    header: "Invoice",
    sortable: true,
    render: (r) => (
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-800 font-figure">{r.id}</p>
        <p className="text-[11px] text-slate-400 font-figure">{r.waybill}</p>
      </div>
    ),
  },
  {
    key: "shipper",
    header: "Debtor",
    sortable: true,
    render: (r) => (
      <span className="text-xs font-medium text-slate-700">{r.shipper}</span>
    ),
  },
  {
    key: "amount",
    header: "Invoiced",
    sortable: true,
    render: (r) => (
      <span className="tabular-nums font-figure text-slate-700">
        {formatNairaCompact(r.amount)}
      </span>
    ),
  },
  {
    key: "paidAmount",
    header: "Recovered",
    sortable: true,
    render: (r) => {
      const pct = Math.round((r.paidAmount / r.amount) * 100);
      return (
        <div className="w-32">
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="tabular-nums font-figure font-medium text-slate-700">
              {formatNairaCompact(r.paidAmount)}
            </span>
            <span className="text-slate-400">{pct}%</span>
          </div>
          <ProgressBar
            value={r.paidAmount}
            max={r.amount}
            tone={pct > 0 ? "amber" : "blue"}
          />
        </div>
      );
    },
  },
  {
    key: "outstanding",
    header: "Balance Due",
    render: (r) => (
      <span className="tabular-nums font-figure font-semibold text-red-600">
        {formatNairaCompact(r.amount - r.paidAmount)}
      </span>
    ),
  },
  {
    key: "dueDate",
    header: "Due",
    sortable: true,
    render: (r) => (
      <span
        className={
          r.status === "Overdue"
            ? "text-xs font-semibold text-red-600 font-figure"
            : "text-xs text-slate-500 font-figure"
        }
      >
        {formatDateShort(r.dueDate)}
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

export function CollectionsPage() {
  const billed = INVOICES.reduce((sum, i) => sum + i.amount, 0);
  const collected = INVOICES.reduce((sum, i) => sum + i.paidAmount, 0);
  const outstanding = billed - collected;
  const overdue = OPEN_INVOICES.filter((i) => i.status === "Overdue");
  const overdueValue = overdue.reduce((sum, i) => sum + (i.amount - i.paidAmount), 0);
  const recoveryRate = Math.round((collected / billed) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Commercial", "Collections"]}
        eyebrow="Commercial"
        title="Collections"
        subtitle="Receivables recovery desk — outstanding balances, ageing buckets and collection performance over time."
        action={
          <div className="flex items-center gap-2">
            <AdminButton variant="secondary" icon={Download} size="sm">
              Export ledger
            </AdminButton>
            <AdminButton variant="primary" icon={Send} size="sm">
              Run reminder batch
            </AdminButton>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Collected To Date"
          value={formatNairaCompact(collected)}
          icon={Wallet}
          tone="success"
          delta={recoveryRate}
          deltaLabel="recovery rate"
        />
        <StatCard
          label="Outstanding"
          value={formatNairaCompact(outstanding)}
          icon={CalendarClock}
          tone="warning"
        />
        <StatCard
          label="Overdue"
          value={formatNairaCompact(overdueValue)}
          icon={AlertTriangle}
          tone={overdue.length > 0 ? "error" : "success"}
          deltaLabel={`${overdue.length} invoices`}
        />
        <StatCard
          label="Open Accounts"
          value={OPEN_INVOICES.length}
          icon={TrendingUp}
          tone="info"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Panel className="xl:col-span-2">
          <PanelHeader
            icon={TrendingUp}
            title="Collections Trend"
            subtitle="Collected vs. outstanding, last 6 months (₦M)"
          />
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={COLLECTIONS_TREND} margin={{ left: -18, top: 6 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="m"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <RTooltip contentStyle={TOOLTIP_STYLE} />
              <Line
                type="monotone"
                dataKey="collected"
                name="Collected (₦M)"
                stroke="#059669"
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="outstanding"
                name="Outstanding (₦M)"
                stroke="#d97706"
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Panel>

        <Panel>
          <PanelHeader
            icon={CalendarClock}
            title="Ageing Buckets"
            subtitle="Outstanding by age (₦M)"
          />
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={AGEING} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis
                type="number"
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="bucket"
                tick={{ fontSize: 10, fill: "#475569" }}
                axisLine={false}
                tickLine={false}
                width={72}
              />
              <RTooltip contentStyle={TOOLTIP_STYLE} />
              <Bar
                dataKey="amount"
                name="Outstanding (₦M)"
                fill="#1e3a8a"
                radius={[0, 4, 4, 0]}
                barSize={16}
              />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <DataTable
        title="Collection Ledger"
        subtitle={`${OPEN_INVOICES.length} accounts with an open balance`}
        columns={COLUMNS}
        data={OPEN_INVOICES}
        rowKey="id"
        pageSize={10}
        searchKeys={["id", "waybill", "shipper"]}
        filterOptions={[
          {
            key: "status",
            label: "Status",
            options: ["Outstanding", "Partially Paid", "Overdue"],
          },
        ]}
        rowActions={[
          { label: "View invoice", icon: Eye, onClick: () => {} },
          { label: "Send reminder", icon: Send, onClick: () => {} },
          { label: "Log payment", icon: Wallet, onClick: () => {} },
        ]}
        bulkActions={[
          { label: "Send reminders", icon: Send, onClick: () => {} },
          { label: "Export selection", icon: Download, onClick: () => {} },
        ]}
      />
    </div>
  );
}
