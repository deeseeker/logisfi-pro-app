"use client";

import * as React from "react";
import {
  ArrowLeftRight,
  CheckCircle2,
  Clock,
  Download,
  Landmark,
  Percent,
  RefreshCw,
  Wallet,
} from "lucide-react";

import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import { AdminButton } from "@/components/admin/ui/admin-button";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { SectionTabs } from "@/components/admin/ui/section-tabs";
import { StatCard } from "@/components/admin/ui/stat-card";
import { StatusBadge } from "@/components/admin/ui/status-badge";
import { downloadBlob } from "@/lib/download";
import { getApiErrorMessage } from "@/lib/api/errors";
import {
  useConfirmSettlement,
  useDisputeSettlement,
  useDownloadReconciliationStatement,
  useRecomputeReconciliation,
  useReconciliationDashboard,
  useReconciliations,
  useSettlements,
} from "@/lib/api/hooks/reconciliation";
import type { ReconciliationModel, SettlementModel } from "@/lib/api/types/models";
import { formatDateShort, formatNairaCompact } from "@/utils/helpers";

const RECON_COLUMNS: DataTableColumn<ReconciliationModel>[] = [
  {
    key: "shipmentNumber",
    header: "Shipment",
    sortable: true,
    render: (row) => (
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-800 font-figure">
          {row.shipmentNumber ?? "—"}
        </p>
        <p className="text-[11px] text-slate-400 font-figure">
          {row.invoiceNumber ?? row.id}
        </p>
      </div>
    ),
  },
  {
    key: "investorOrganizationName",
    header: "Investor",
    render: (row) => (
      <span className="text-xs text-slate-600">
        {row.investorOrganizationName ?? "—"}
      </span>
    ),
  },
  {
    key: "amountFinanced",
    header: "Financed",
    render: (row) => (
      <span className="tabular-nums font-figure font-semibold text-slate-800">
        {formatNairaCompact(row.amountFinanced ?? 0)}
      </span>
    ),
  },
  {
    key: "amountRecovered",
    header: "Recovered",
    render: (row) => (
      <span className="tabular-nums font-figure text-slate-700">
        {formatNairaCompact(row.amountRecovered ?? 0)}
      </span>
    ),
  },
  {
    key: "investorReturn",
    header: "Investor return",
    render: (row) => (
      <span className="tabular-nums font-figure text-emerald-700">
        {formatNairaCompact(row.investorReturn ?? 0)}
      </span>
    ),
  },
  {
    key: "thhRevenue",
    header: "THH fee",
    render: (row) => (
      <span className="tabular-nums font-figure text-blue-800">
        {formatNairaCompact(row.thhRevenue ?? 0)}
      </span>
    ),
  },
  {
    key: "reconciliationStatus",
    header: "Status",
    render: (row) => <StatusBadge status={row.reconciliationStatus ?? "—"} />,
  },
];

const SETTLEMENT_COLUMNS: DataTableColumn<SettlementModel>[] = [
  {
    key: "investorOrganizationName",
    header: "Investor",
    render: (row) => (
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-800">
          {row.investorOrganizationName ?? "—"}
        </p>
        <p className="text-[11px] text-slate-400 font-figure">{row.id}</p>
      </div>
    ),
  },
  {
    key: "totalPrincipal",
    header: "Principal",
    render: (row) => (
      <span className="tabular-nums font-figure font-semibold text-slate-800">
        {formatNairaCompact(row.totalPrincipal ?? 0)}
      </span>
    ),
  },
  {
    key: "totalInvestorReturn",
    header: "Return",
    render: (row) => (
      <span className="tabular-nums font-figure text-emerald-700">
        {formatNairaCompact(row.totalInvestorReturn ?? 0)}
      </span>
    ),
  },
  {
    key: "netSettlementAmount",
    header: "Net",
    render: (row) => (
      <span className="tabular-nums font-figure font-semibold text-slate-900">
        {formatNairaCompact(row.netSettlementAmount ?? 0)}
      </span>
    ),
  },
  {
    key: "settlementStatus",
    header: "Status",
    render: (row) => <StatusBadge status={row.settlementStatus ?? "—"} />,
  },
  {
    key: "periodEnd",
    header: "Period end",
    render: (row) => (
      <span className="text-xs text-slate-500 font-figure">
        {row.periodEnd ? formatDateShort(row.periodEnd) : "—"}
      </span>
    ),
  },
];

export function ReconciliationPage() {
  const [tab, setTab] = React.useState("recon");
  const dashboard = useReconciliationDashboard();
  const recon = useReconciliations({ PageSize: 100 });
  const settlements = useSettlements({ PageSize: 100 });
  const summary = dashboard.data?.responseData;
  const reconRows = recon.data?.responseData ?? [];
  const settlementRows = settlements.data?.responseData ?? [];

  const recompute = useRecomputeReconciliation({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const confirm = useConfirmSettlement({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const dispute = useDisputeSettlement({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const statement = useDownloadReconciliationStatement({
    onSuccess: (blob) => downloadBlob(blob, "reconciliation-statement.pdf"),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Commercial", "Reconciliation"]}
        eyebrow="Commercial"
        title="Reconciliation"
        subtitle="Financed shipment recovery, investor settlement and platform fee recognition."
        action={
          <AdminButton
            variant="secondary"
            icon={Download}
            size="sm"
            onClick={() => statement.mutate({})}
            disabled={statement.isPending}
          >
            Settlement report
          </AdminButton>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Financed"
          value={formatNairaCompact(summary?.totalFinanced ?? 0)}
          icon={Landmark}
        />
        <StatCard
          label="Investor revenue"
          value={formatNairaCompact(summary?.investorRevenue ?? 0)}
          icon={Percent}
          tone="success"
        />
        <StatCard
          label="THH revenue"
          value={formatNairaCompact(summary?.thhRevenue ?? 0)}
          icon={Wallet}
          tone="success"
        />
        <StatCard
          label="Pending settlements"
          value={summary?.pendingSettlements ?? 0}
          icon={Clock}
          tone={(summary?.pendingSettlements ?? 0) > 0 ? "warning" : "success"}
        />
      </div>

      <SectionTabs
        tabs={[
          { key: "recon", label: "Reconciliations", count: reconRows.length },
          { key: "settlements", label: "Settlements", count: settlementRows.length },
        ]}
        active={tab}
        onChange={setTab}
      />

      {tab === "recon" ? (
        <DataTable
          title="Reconciliations"
          subtitle={recon.isPending ? "Loading…" : `${reconRows.length} records`}
          columns={RECON_COLUMNS}
          data={reconRows}
          rowKey="id"
          searchKeys={["shipmentNumber", "invoiceNumber", "id"]}
          rowActions={[
            {
              label: "Recompute",
              icon: RefreshCw,
              onClick: (row) =>
                row.shipmentId &&
                recompute.mutate({ shipmentId: row.shipmentId }),
            },
          ]}
        />
      ) : (
        <DataTable
          title="Settlements"
          subtitle={
            settlements.isPending ? "Loading…" : `${settlementRows.length} records`
          }
          columns={SETTLEMENT_COLUMNS}
          data={settlementRows}
          rowKey="id"
          searchKeys={["investorOrganizationName", "id"]}
          rowActions={[
            {
              label: "Confirm",
              icon: CheckCircle2,
              onClick: (row) =>
                row.id && confirm.mutate({ settlementId: row.id }),
            },
            {
              label: "Dispute",
              icon: ArrowLeftRight,
              danger: true,
              onClick: (row) =>
                row.id &&
                dispute.mutate({
                  settlementId: row.id,
                  body: {
                    settlementId: row.id,
                    reason: "Disputed from admin console",
                  },
                }),
            },
          ]}
        />
      )}
    </div>
  );
}
