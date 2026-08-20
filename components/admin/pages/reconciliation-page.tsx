"use client";

import * as React from "react";
import {
  ArrowLeftRight,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  Landmark,
  Percent,
  Wallet,
} from "lucide-react";

import { AdminButton } from "@/components/admin/ui/admin-button";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { SectionTabs } from "@/components/admin/ui/section-tabs";
import { StatCard } from "@/components/admin/ui/stat-card";
import { StatusBadge } from "@/components/admin/ui/status-badge";
import { RECON_ROWS } from "@/constants/admin/mock-data";
import type { AdminSettlement } from "@/types/admin";
import { formatDateShort, formatNairaCompact } from "@/utils/helpers";

const TABS = [
  { key: "all", label: "All Settlements", count: RECON_ROWS.length },
  {
    key: "pending",
    label: "Pending Settlement",
    count: RECON_ROWS.filter((r) => r.status === "Pending Settlement").length,
  },
  {
    key: "completed",
    label: "Completed",
    count: RECON_ROWS.filter((r) => r.status === "Completed").length,
  },
];

const COLUMNS: DataTableColumn<AdminSettlement>[] = [
  {
    key: "id",
    header: "Settlement",
    sortable: true,
    render: (r) => (
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-800 font-figure">{r.id}</p>
        <p className="text-[11px] text-slate-400 font-figure">{r.requestId}</p>
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
    key: "investor",
    header: "Investor",
    sortable: true,
    render: (r) => <span className="text-xs text-slate-600">{r.investor}</span>,
  },
  {
    key: "principal",
    header: "Principal",
    sortable: true,
    render: (r) => (
      <span className="tabular-nums font-figure font-semibold text-slate-800">
        {formatNairaCompact(r.principal)}
      </span>
    ),
  },
  {
    key: "interest",
    header: "Investor Interest",
    sortable: true,
    render: (r) => (
      <span className="tabular-nums font-figure text-emerald-700 font-medium">
        {formatNairaCompact(r.interest)}
      </span>
    ),
  },
  {
    key: "thhFee",
    header: "THH Fee",
    sortable: true,
    render: (r) => (
      <span className="tabular-nums font-figure text-blue-800 font-medium">
        {formatNairaCompact(r.thhFee)}
      </span>
    ),
  },
  {
    key: "total",
    header: "Total Settled",
    render: (r) => (
      <span className="tabular-nums font-figure font-semibold text-slate-900">
        {formatNairaCompact(r.principal + r.interest + r.thhFee)}
      </span>
    ),
  },
  {
    key: "date",
    header: "Value Date",
    sortable: true,
    render: (r) => (
      <span className="text-xs text-slate-500 font-figure">
        {formatDateShort(r.date)}
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

export function ReconciliationPage() {
  const [tab, setTab] = React.useState("all");

  const data = React.useMemo(() => {
    if (tab === "pending")
      return RECON_ROWS.filter((r) => r.status === "Pending Settlement");
    if (tab === "completed") return RECON_ROWS.filter((r) => r.status === "Completed");
    return RECON_ROWS;
  }, [tab]);

  const principal = RECON_ROWS.reduce((sum, r) => sum + r.principal, 0);
  const interest = RECON_ROWS.reduce((sum, r) => sum + r.interest, 0);
  const thhFee = RECON_ROWS.reduce((sum, r) => sum + r.thhFee, 0);
  const pending = RECON_ROWS.filter((r) => r.status === "Pending Settlement");
  const pendingValue = pending.reduce(
    (sum, r) => sum + r.principal + r.interest + r.thhFee,
    0
  );

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Commercial", "Reconciliation"]}
        eyebrow="Commercial"
        title="Reconciliation"
        subtitle="Settlement of funded shipments — principal returned to investors, interest earned and platform fee recognised."
        action={
          <div className="flex items-center gap-2">
            <AdminButton variant="secondary" icon={Download} size="sm">
              Settlement report
            </AdminButton>
            <AdminButton variant="primary" icon={ArrowLeftRight} size="sm">
              Run settlement batch
            </AdminButton>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Principal Settled"
          value={formatNairaCompact(principal)}
          icon={Landmark}
        />
        <StatCard
          label="Investor Interest"
          value={formatNairaCompact(interest)}
          icon={Percent}
          tone="success"
        />
        <StatCard
          label="THH Revenue"
          value={formatNairaCompact(thhFee)}
          icon={Wallet}
          tone="success"
        />
        <StatCard
          label="Awaiting Settlement"
          value={formatNairaCompact(pendingValue)}
          icon={Clock}
          tone={pending.length > 0 ? "warning" : "success"}
          deltaLabel={`${pending.length} batches`}
        />
      </div>

      <SectionTabs tabs={TABS} active={tab} onChange={setTab} />

      <DataTable
        key={tab}
        columns={COLUMNS}
        data={data}
        rowKey="id"
        pageSize={10}
        searchKeys={["id", "requestId", "shipper", "investor"]}
        filterOptions={[
          {
            key: "status",
            label: "Status",
            options: ["Completed", "Pending Settlement"],
          },
        ]}
        rowActions={[
          { label: "View settlement", icon: Eye, onClick: () => {} },
          { label: "Mark settled", icon: CheckCircle2, onClick: () => {} },
          { label: "Download advice", icon: Download, onClick: () => {} },
        ]}
        bulkActions={[
          { label: "Settle selected", icon: CheckCircle2, onClick: () => {} },
          { label: "Export selection", icon: Download, onClick: () => {} },
        ]}
      />
    </div>
  );
}
