"use client";

import { Download, ShieldAlert, Wallet } from "lucide-react";

import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import { AdminButton } from "@/components/admin/ui/admin-button";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { StatCard } from "@/components/admin/ui/stat-card";
import { StatusBadge } from "@/components/admin/ui/status-badge";
import { downloadBlob } from "@/lib/download";
import { getApiErrorMessage } from "@/lib/api/errors";
import {
  useDisbursements,
  useReconcileDisbursement,
  useReverseDisbursement,
} from "@/lib/api/hooks/disbursements";
import { useAuditReport } from "@/lib/api/hooks/reports";
import type { DisbursementModel } from "@/lib/api/types/models";
import { formatDateTime, formatNairaCompact } from "@/utils/helpers";

const COLUMNS: DataTableColumn<DisbursementModel>[] = [
  {
    key: "id",
    header: "Disbursement",
    render: (row) => (
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-800 font-figure">
          {row.id}
        </p>
        <p className="text-[11px] text-slate-400 font-figure">{row.type ?? "—"}</p>
      </div>
    ),
  },
  {
    key: "beneficiaryName",
    header: "Beneficiary",
    render: (row) => (
      <span className="text-xs text-slate-700">{row.beneficiaryName ?? "—"}</span>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    render: (row) => (
      <span className="tabular-nums font-figure font-semibold text-slate-800">
        {formatNairaCompact(row.amount ?? 0)}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusBadge status={row.status ?? "—"} />,
  },
  {
    key: "submittedAt",
    header: "Submitted",
    render: (row) => (
      <span className="text-xs text-slate-500 font-figure">
        {row.submittedAt ? formatDateTime(row.submittedAt) : "—"}
      </span>
    ),
  },
  {
    key: "failureReason",
    header: "Failure",
    render: (row) => (
      <span className="text-xs text-red-600">{row.failureReason ?? "—"}</span>
    ),
  },
];

export function AuditPage() {
  const disbursements = useDisbursements({ PageSize: 100 });
  const rows = disbursements.data?.responseData ?? [];
  const audit = useAuditReport({
    onSuccess: (blob) => downloadBlob(blob, "audit-report.pdf"),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const reverse = useReverseDisbursement({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const reconcile = useReconcileDisbursement({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Intelligence", "Audit Centre"]}
        eyebrow="Intelligence"
        title="Audit Centre"
        subtitle="Disbursement ledger plus the downloadable audit pack."
        action={
          <AdminButton
            variant="primary"
            icon={Download}
            size="sm"
            onClick={() => audit.mutate({ params: { period: "Last90Days" } })}
            disabled={audit.isPending}
          >
            Download audit report
          </AdminButton>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Disbursements" value={rows.length} icon={Wallet} />
        <StatCard
          label="Failed"
          value={rows.filter((row) => row.status === "Failed").length}
          icon={ShieldAlert}
          tone="warning"
        />
      </div>

      <DataTable
        title="Disbursement trail"
        subtitle={disbursements.isPending ? "Loading…" : `${rows.length} records`}
        columns={COLUMNS}
        data={rows}
        rowKey="id"
        searchKeys={["id", "beneficiaryName", "bankReference"]}
        filterOptions={[
          {
            key: "status",
            label: "Status",
            options: ["Pending", "Submitted", "Succeeded", "Failed", "Reversed", "Unknown"],
          },
        ]}
        rowActions={[
          {
            label: "Reconcile",
            icon: Wallet,
            onClick: (row) => row.id && reconcile.mutate({ id: row.id }),
          },
          {
            label: "Reverse",
            icon: ShieldAlert,
            danger: true,
            onClick: (row) =>
              row.id &&
              reverse.mutate({
                id: row.id,
                body: { reason: "Reversed from admin console" },
              }),
          },
        ]}
      />
    </div>
  );
}
