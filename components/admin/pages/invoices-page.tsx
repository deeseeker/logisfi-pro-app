"use client";

import * as React from "react";
import {
  AlertTriangle,
  Ban,
  CheckCircle2,
  Download,
  Eye,
  Plus,
  Receipt,
  Send,
  Wallet,
} from "lucide-react";

import { AdminButton } from "@/components/admin/ui/admin-button";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { ProgressBar } from "@/components/admin/ui/progress-bar";
import { SectionTabs } from "@/components/admin/ui/section-tabs";
import { StatCard } from "@/components/admin/ui/stat-card";
import { StatusBadge } from "@/components/admin/ui/status-badge";
import { INVOICES } from "@/constants/admin/mock-data";
import type { AdminInvoice } from "@/types/admin";
import { formatDateShort, formatNairaCompact } from "@/utils/helpers";

const TABS = [
  { key: "all", label: "All Invoices", count: INVOICES.length },
  {
    key: "outstanding",
    label: "Outstanding",
    count: INVOICES.filter((i) => i.status === "Outstanding").length,
  },
  {
    key: "overdue",
    label: "Overdue",
    count: INVOICES.filter((i) => i.status === "Overdue").length,
  },
  {
    key: "paid",
    label: "Paid",
    count: INVOICES.filter((i) => i.status === "Paid").length,
  },
];

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
    header: "Shipper",
    sortable: true,
    render: (r) => (
      <span className="text-xs font-medium text-slate-700">{r.shipper}</span>
    ),
  },
  {
    key: "amount",
    header: "Invoice Amount",
    sortable: true,
    render: (r) => (
      <span className="tabular-nums font-figure font-semibold text-slate-800">
        {formatNairaCompact(r.amount)}
      </span>
    ),
  },
  {
    key: "paidAmount",
    header: "Settlement Progress",
    sortable: true,
    render: (r) => {
      const pct = Math.round((r.paidAmount / r.amount) * 100);
      return (
        <div className="w-36">
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="tabular-nums font-figure font-medium text-slate-700">
              {formatNairaCompact(r.paidAmount)}
            </span>
            <span className="text-slate-400">{pct}%</span>
          </div>
          <ProgressBar
            value={r.paidAmount}
            max={r.amount}
            tone={pct === 100 ? "emerald" : pct > 0 ? "amber" : "blue"}
          />
        </div>
      );
    },
  },
  {
    key: "issued",
    header: "Issued",
    sortable: true,
    render: (r) => (
      <span className="text-xs text-slate-500 font-figure">
        {formatDateShort(r.issued)}
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

export function InvoicesPage() {
  const [tab, setTab] = React.useState("all");

  const data = React.useMemo(() => {
    if (tab === "outstanding")
      return INVOICES.filter((i) => i.status === "Outstanding");
    if (tab === "overdue") return INVOICES.filter((i) => i.status === "Overdue");
    if (tab === "paid") return INVOICES.filter((i) => i.status === "Paid");
    return INVOICES;
  }, [tab]);

  const billed = INVOICES.reduce((sum, i) => sum + i.amount, 0);
  const collected = INVOICES.reduce((sum, i) => sum + i.paidAmount, 0);
  const overdue = INVOICES.filter((i) => i.status === "Overdue");
  const overdueValue = overdue.reduce((sum, i) => sum + (i.amount - i.paidAmount), 0);

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Commercial", "Invoice Management"]}
        eyebrow="Commercial"
        title="Invoice Management"
        subtitle="Receivables raised against delivered freight, their settlement progress and ageing position."
        action={
          <div className="flex items-center gap-2">
            <AdminButton variant="secondary" icon={Download} size="sm">
              Ageing report
            </AdminButton>
            <AdminButton variant="primary" icon={Plus} size="sm">
              Raise invoice
            </AdminButton>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Total Billed"
          value={formatNairaCompact(billed)}
          icon={Receipt}
        />
        <StatCard
          label="Collected"
          value={formatNairaCompact(collected)}
          icon={Wallet}
          tone="success"
          delta={Math.round((collected / billed) * 100)}
          deltaLabel="of billed"
        />
        <StatCard
          label="Outstanding"
          value={formatNairaCompact(billed - collected)}
          icon={AlertTriangle}
          tone="warning"
        />
        <StatCard
          label="Overdue"
          value={formatNairaCompact(overdueValue)}
          icon={Ban}
          tone={overdue.length > 0 ? "error" : "success"}
          deltaLabel={`${overdue.length} invoices`}
        />
      </div>

      <SectionTabs tabs={TABS} active={tab} onChange={setTab} />

      <DataTable
        key={tab}
        columns={COLUMNS}
        data={data}
        rowKey="id"
        pageSize={10}
        searchKeys={["id", "waybill", "shipper", "shipmentId"]}
        filterOptions={[
          {
            key: "status",
            label: "Status",
            options: ["Paid", "Partially Paid", "Outstanding", "Overdue"],
          },
        ]}
        rowActions={[
          { label: "View invoice", icon: Eye, onClick: () => {} },
          { label: "Send reminder", icon: Send, onClick: () => {} },
          { label: "Mark paid", icon: CheckCircle2, onClick: () => {} },
          { label: "Void invoice", icon: Ban, danger: true, onClick: () => {} },
        ]}
        bulkActions={[
          { label: "Send reminders", icon: Send, onClick: () => {} },
          { label: "Export selection", icon: Download, onClick: () => {} },
        ]}
      />
    </div>
  );
}
