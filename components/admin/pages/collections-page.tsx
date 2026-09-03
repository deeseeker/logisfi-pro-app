"use client";

import { AlertTriangle, CalendarClock, Download, Send, Wallet } from "lucide-react";

import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import { AdminButton } from "@/components/admin/ui/admin-button";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { ProgressBar } from "@/components/admin/ui/progress-bar";
import { StatCard } from "@/components/admin/ui/stat-card";
import { StatusBadge } from "@/components/admin/ui/status-badge";
import { getApiErrorMessage } from "@/lib/api/errors";
import {
  useCollections,
  useCollectionsDashboard,
  useRecordPayment,
} from "@/lib/api/hooks/collections";
import { useCollectionsReport } from "@/lib/api/hooks/reports";
import { downloadBlob } from "@/lib/download";
import type { CollectionListItemModel } from "@/lib/api/types/models";
import { formatDateShort, formatNairaCompact } from "@/utils/helpers";

const COLUMNS: DataTableColumn<CollectionListItemModel>[] = [
  {
    key: "invoiceNumber",
    header: "Invoice",
    sortable: true,
    render: (row) => (
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-800 font-figure">
          {row.invoiceNumber ?? "—"}
        </p>
        <p className="text-[11px] text-slate-400 font-figure">{row.id}</p>
      </div>
    ),
  },
  {
    key: "shipperName",
    header: "Debtor",
    sortable: true,
    render: (row) => (
      <span className="text-xs font-medium text-slate-700">
        {row.shipperName ?? "—"}
      </span>
    ),
  },
  {
    key: "invoiceValue",
    header: "Invoiced",
    render: (row) => (
      <span className="tabular-nums font-figure text-slate-700">
        {formatNairaCompact(row.invoiceValue ?? 0)}
      </span>
    ),
  },
  {
    key: "amountPaid",
    header: "Recovered",
    render: (row) => {
      const invoiced = row.invoiceValue ?? 0;
      const paid = row.amountPaid ?? 0;
      const pct = invoiced ? Math.round((paid / invoiced) * 100) : 0;
      return (
        <div className="w-32">
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="tabular-nums font-figure font-medium text-slate-700">
              {formatNairaCompact(paid)}
            </span>
            <span className="text-slate-400">{pct}%</span>
          </div>
          <ProgressBar value={paid} max={invoiced || 1} tone={pct > 0 ? "amber" : "blue"} />
        </div>
      );
    },
  },
  {
    key: "outstandingBalance",
    header: "Balance due",
    render: (row) => (
      <span className="tabular-nums font-figure font-semibold text-red-600">
        {formatNairaCompact(row.outstandingBalance ?? 0)}
      </span>
    ),
  },
  {
    key: "dueDate",
    header: "Due",
    render: (row) => (
      <span
        className={
          row.isOverdue
            ? "text-xs font-semibold text-red-600 font-figure"
            : "text-xs text-slate-500 font-figure"
        }
      >
        {row.dueDate ? formatDateShort(row.dueDate) : "—"}
      </span>
    ),
  },
  {
    key: "invoiceStatus",
    header: "Status",
    render: (row) => <StatusBadge status={row.invoiceStatus ?? "—"} />,
  },
];

export function CollectionsPage() {
  const dashboard = useCollectionsDashboard();
  const collections = useCollections({ PageSize: 100 });
  const summary = dashboard.data?.responseData;
  const rows = collections.data?.responseData ?? [];
  const record = useRecordPayment({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const exportLedger = useCollectionsReport({
    onSuccess: (blob) => downloadBlob(blob, "collections-report.pdf"),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Commercial", "Collections"]}
        eyebrow="Commercial"
        title="Collections"
        subtitle="Receivables recovery desk — outstanding balances and collection performance."
        action={
          <AdminButton
            variant="secondary"
            icon={Download}
            size="sm"
            onClick={() => exportLedger.mutate({})}
            disabled={exportLedger.isPending}
          >
            Export ledger
          </AdminButton>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Collected"
          value={formatNairaCompact(summary?.totalCollected ?? 0)}
          icon={Wallet}
          tone="success"
          delta={Math.round(summary?.collectionRate ?? 0)}
          deltaLabel="collection rate"
        />
        <StatCard
          label="Outstanding"
          value={formatNairaCompact(summary?.outstandingBalance ?? 0)}
          icon={CalendarClock}
          tone="warning"
        />
        <StatCard
          label="Overdue"
          value={formatNairaCompact(summary?.overdueBalance ?? 0)}
          icon={AlertTriangle}
          tone={(summary?.overdueBalance ?? 0) > 0 ? "error" : "success"}
        />
        <StatCard
          label="Open accounts"
          value={rows.length}
          icon={Send}
          tone="info"
        />
      </div>

      <DataTable
        title="Collection ledger"
        subtitle={
          collections.isPending ? "Loading…" : `${rows.length} receivables`
        }
        columns={COLUMNS}
        data={rows}
        rowKey="id"
        searchKeys={["invoiceNumber", "shipperName", "id"]}
        rowActions={[
          {
            label: "Log payment",
            icon: Wallet,
            onClick: (row) => {
              if (!row.id) {
                return;
              }
              const amount = window.prompt("Payment amount");
              if (!amount) {
                return;
              }
              record.mutate({
                body: {
                  invoiceId: row.id,
                  amount: Number(amount),
                  paymentDate: new Date().toISOString(),
                  paymentReference: `ADMIN-${Date.now()}`,
                  paymentMethod: "BankTransfer",
                },
              });
            },
          },
        ]}
      />
    </div>
  );
}
