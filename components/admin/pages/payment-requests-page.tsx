"use client";

import * as React from "react";
import { CheckCircle2, Clock, Send, ThumbsUp, Wallet, XCircle } from "lucide-react";

import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { SectionTabs } from "@/components/admin/ui/section-tabs";
import { StatCard } from "@/components/admin/ui/stat-card";
import { StatusBadge } from "@/components/admin/ui/status-badge";
import { getApiErrorMessage } from "@/lib/api/errors";
import {
  useApproveFinalPayment,
  useFinalPayments,
  useRejectFinalPayment,
} from "@/lib/api/hooks/deliveries";
import {
  useApproveFinancingRequest,
  useFinancingRequests,
  useRejectFinancingRequest,
} from "@/lib/api/hooks/financing";
import type {
  FinalPaymentRequestModel,
  FinancingRequestModel,
} from "@/lib/api/types/models";
import { formatDateShort, formatNairaCompact } from "@/utils/helpers";

const FINANCING_COLUMNS: DataTableColumn<FinancingRequestModel>[] = [
  {
    key: "requestNumber",
    header: "Request",
    sortable: true,
    render: (row) => (
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-800 font-figure">
          {row.requestNumber ?? "—"}
        </p>
        <p className="text-[11px] text-slate-400 font-figure">
          {row.waybillNumber ?? row.shipmentNumber ?? row.id}
        </p>
      </div>
    ),
  },
  {
    key: "investorOrganizationName",
    header: "Investor",
    render: (row) => (
      <span className="text-xs text-slate-700">
        {row.investorOrganizationName ?? "—"}
      </span>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    sortable: true,
    render: (row) => (
      <span className="tabular-nums font-figure font-semibold text-slate-800">
        {formatNairaCompact(row.amount ?? 0)}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (row) => <StatusBadge status={row.status ?? "—"} />,
  },
  {
    key: "submittedAt",
    header: "Submitted",
    render: (row) => (
      <span className="text-xs text-slate-500 font-figure">
        {row.submittedAt ? formatDateShort(row.submittedAt) : "—"}
      </span>
    ),
  },
];

const FINAL_COLUMNS: DataTableColumn<FinalPaymentRequestModel>[] = [
  {
    key: "shipmentNumber",
    header: "Shipment",
    render: (row) => (
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-800 font-figure">
          {row.shipmentNumber ?? "—"}
        </p>
        <p className="text-[11px] text-slate-400 font-figure">{row.id}</p>
      </div>
    ),
  },
  {
    key: "vendorName",
    header: "Carrier",
    render: (row) => (
      <span className="text-xs text-slate-700">{row.vendorName ?? "—"}</span>
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
    key: "finalPaymentStatus",
    header: "Status",
    render: (row) => <StatusBadge status={row.finalPaymentStatus ?? "—"} />,
  },
];

export function PaymentRequestsPage() {
  const [tab, setTab] = React.useState("financing");
  const financing = useFinancingRequests({ PageSize: 100 });
  const finals = useFinalPayments({ PageSize: 100 });
  const requests = financing.data?.responseData ?? [];
  const finalRows = finals.data?.responseData ?? [];

  const approve = useApproveFinancingRequest({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const reject = useRejectFinancingRequest({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const approveFinal = useApproveFinalPayment({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const rejectFinal = useRejectFinalPayment({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });

  const pending = requests.filter((row) => row.status === "Pending");

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Commercial", "Payment Requests"]}
        eyebrow="Commercial"
        title="Payment Requests"
        subtitle="Financing requests and carrier final-payment approvals."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Financing requests" value={requests.length} icon={Send} />
        <StatCard
          label="Pending review"
          value={pending.length}
          icon={Clock}
          tone={pending.length > 0 ? "warning" : "success"}
        />
        <StatCard
          label="Final payments"
          value={finalRows.length}
          icon={Wallet}
          tone="info"
        />
        <StatCard
          label="Approved"
          value={requests.filter((row) => row.status === "Approved").length}
          icon={CheckCircle2}
          tone="success"
        />
      </div>

      <SectionTabs
        tabs={[
          { key: "financing", label: "Financing", count: requests.length },
          { key: "final", label: "Final payments", count: finalRows.length },
        ]}
        active={tab}
        onChange={setTab}
      />

      {tab === "financing" ? (
        <DataTable
          title="Financing requests"
          subtitle={financing.isPending ? "Loading…" : `${requests.length} records`}
          columns={FINANCING_COLUMNS}
          data={requests}
          rowKey="id"
          searchKeys={["requestNumber", "waybillNumber", "shipmentNumber"]}
          filterOptions={[
            {
              key: "status",
              label: "Status",
              options: ["Pending", "Approved", "Rejected", "Disbursed", "Failed"],
            },
          ]}
          rowActions={[
            {
              label: "Approve",
              icon: ThumbsUp,
              onClick: (row) => row.id && approve.mutate({ id: row.id }),
            },
            {
              label: "Reject",
              icon: XCircle,
              danger: true,
              onClick: (row) =>
                row.id &&
                reject.mutate({
                  id: row.id,
                  body: { reason: "Rejected from admin console" },
                }),
            },
          ]}
        />
      ) : (
        <DataTable
          title="Final payments"
          subtitle={finals.isPending ? "Loading…" : `${finalRows.length} records`}
          columns={FINAL_COLUMNS}
          data={finalRows}
          rowKey="id"
          searchKeys={["shipmentNumber", "vendorName", "id"]}
          rowActions={[
            {
              label: "Approve",
              icon: ThumbsUp,
              onClick: (row) => row.id && approveFinal.mutate({ id: row.id }),
            },
            {
              label: "Reject",
              icon: XCircle,
              danger: true,
              onClick: (row) =>
                row.id &&
                rejectFinal.mutate({
                  id: row.id,
                  body: { rejectionReason: "Rejected from admin console" },
                }),
            },
          ]}
        />
      )}
    </div>
  );
}
