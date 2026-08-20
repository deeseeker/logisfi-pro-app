"use client";

import * as React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  Send,
  ShieldAlert,
  ThumbsUp,
  Wallet,
  XCircle,
} from "lucide-react";

import { AdminButton } from "@/components/admin/ui/admin-button";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { SectionTabs } from "@/components/admin/ui/section-tabs";
import { StatCard } from "@/components/admin/ui/stat-card";
import { StatusBadge, ToneBadge } from "@/components/admin/ui/status-badge";
import { PaymentRequestForm } from "@/components/admin/pages/payment-request-form";
import { PAYMENT_REQUESTS } from "@/constants/admin/mock-data";
import type { AdminPaymentRequest } from "@/types/admin";
import { formatDateShort, formatNairaCompact } from "@/utils/helpers";

const TABS = [
  { key: "all", label: "All Requests", count: PAYMENT_REQUESTS.length },
  {
    key: "pending",
    label: "Pending Review",
    count: PAYMENT_REQUESTS.filter((p) => p.status === "Pending Review").length,
  },
  {
    key: "disbursed",
    label: "Disbursed",
    count: PAYMENT_REQUESTS.filter((p) => p.status === "Disbursed").length,
  },
  {
    key: "flagged",
    label: "Flagged",
    count: PAYMENT_REQUESTS.filter((p) => p.flagged).length,
  },
];

const COLUMNS: DataTableColumn<AdminPaymentRequest>[] = [
  {
    key: "id",
    header: "Request",
    sortable: true,
    render: (r) => (
      <div className="flex items-center gap-2 min-w-0">
        {r.flagged && (
          <span title="Flagged by fraud engine" className="shrink-0">
            <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
          </span>
        )}
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-800 font-figure">{r.id}</p>
          <p className="text-[11px] text-slate-400 font-figure">{r.waybill}</p>
        </div>
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
    header: "Funding Investor",
    sortable: true,
    render: (r) => (
      <div className="min-w-0">
        <p className="text-xs text-slate-700">{r.investor}</p>
        <p className="text-[11px] text-slate-400 font-figure">{r.investorId}</p>
      </div>
    ),
  },
  {
    key: "requested",
    header: "Requested",
    sortable: true,
    render: (r) => (
      <span className="tabular-nums font-figure font-semibold text-slate-800">
        {formatNairaCompact(r.requested)}
      </span>
    ),
  },
  {
    key: "approved",
    header: "Approved",
    sortable: true,
    render: (r) =>
      r.approved > 0 ? (
        <span className="tabular-nums font-figure font-semibold text-emerald-700">
          {formatNairaCompact(r.approved)}
        </span>
      ) : (
        <span className="text-xs text-slate-400">—</span>
      ),
  },
  {
    key: "interestRate",
    header: "Rate",
    sortable: true,
    render: (r) => (
      <ToneBadge tone="info" dot={false}>
        <span className="font-figure">{r.interestRate.toFixed(1)}%</span>
      </ToneBadge>
    ),
  },
  {
    key: "requestedOn",
    header: "Requested On",
    sortable: true,
    render: (r) => (
      <span className="text-xs text-slate-500 font-figure">
        {formatDateShort(r.requestedOn)}
      </span>
    ),
  },
  {
    key: "dueDate",
    header: "Due",
    sortable: true,
    render: (r) => (
      <span className="text-xs text-slate-500 font-figure">
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

export function PaymentRequestsPage() {
  const [tab, setTab] = React.useState("all");
  const [formOpen, setFormOpen] = React.useState(false);

  const data = React.useMemo(() => {
    if (tab === "pending")
      return PAYMENT_REQUESTS.filter((p) => p.status === "Pending Review");
    if (tab === "disbursed")
      return PAYMENT_REQUESTS.filter((p) => p.status === "Disbursed");
    if (tab === "flagged") return PAYMENT_REQUESTS.filter((p) => p.flagged);
    return PAYMENT_REQUESTS;
  }, [tab]);

  const pending = PAYMENT_REQUESTS.filter((p) => p.status === "Pending Review");
  const disbursedTotal = PAYMENT_REQUESTS.filter((p) => p.status === "Disbursed").reduce(
    (sum, p) => sum + p.approved,
    0
  );
  const pendingValue = pending.reduce((sum, p) => sum + p.requested, 0);
  const flagged = PAYMENT_REQUESTS.filter((p) => p.flagged).length;

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Commercial", "Payment Requests"]}
        eyebrow="Commercial"
        title="Payment Requests"
        subtitle="Freight financing requests raised against confirmed waybills, with investor allocation and fraud screening."
        action={
          <div className="flex items-center gap-2">
            <AdminButton variant="secondary" icon={Clock} size="sm">
              Review queue
            </AdminButton>
            <AdminButton
              variant="primary"
              icon={Send}
              size="sm"
              onClick={() => setFormOpen(true)}
            >
              New request
            </AdminButton>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Requests" value={PAYMENT_REQUESTS.length} icon={Send} />
        <StatCard
          label="Pending Review"
          value={pending.length}
          icon={Clock}
          tone="warning"
        />
        <StatCard
          label="Total Disbursed"
          value={formatNairaCompact(disbursedTotal)}
          icon={Wallet}
          tone="success"
        />
        <StatCard
          label="Fraud Flags"
          value={flagged}
          icon={AlertTriangle}
          tone={flagged > 0 ? "error" : "success"}
        />
      </div>

      {pending.length > 0 && (
        <div className="rounded-xl bg-amber-50/70 border border-amber-100 px-4 py-3 flex items-center gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <p className="text-xs text-amber-900">
            <span className="font-semibold">{pending.length} requests</span> awaiting
            review, totalling{" "}
            <span className="font-semibold font-figure">
              {formatNairaCompact(pendingValue)}
            </span>
            .
          </p>
          <AdminButton
            variant="secondary"
            size="sm"
            className="ml-auto"
            onClick={() => setTab("pending")}
          >
            Review now
          </AdminButton>
        </div>
      )}

      <SectionTabs tabs={TABS} active={tab} onChange={setTab} />

      <DataTable
        key={tab}
        columns={COLUMNS}
        data={data}
        rowKey="id"
        pageSize={10}
        searchKeys={["id", "waybill", "shipper", "investor", "shipmentId"]}
        filterOptions={[
          {
            key: "status",
            label: "Status",
            options: ["Pending Review", "Approved", "Disbursed", "Rejected"],
          },
        ]}
        rowActions={[
          { label: "View request", icon: Eye, onClick: () => {} },
          { label: "Approve", icon: ThumbsUp, onClick: () => {} },
          { label: "Mark disbursed", icon: CheckCircle2, onClick: () => {} },
          { label: "Reject", icon: XCircle, danger: true, onClick: () => {} },
        ]}
        bulkActions={[
          { label: "Approve selected", icon: ThumbsUp, onClick: () => {} },
          { label: "Reject selected", icon: XCircle, onClick: () => {} },
        ]}
      />

      <PaymentRequestForm open={formOpen} onClose={() => setFormOpen(false)} />
    </div>
  );
}
