"use client";

import * as React from "react";
import { Ban, Calendar, CheckCircle2, Download, Plus, Receipt, Send } from "lucide-react";

import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import { AdminButton } from "@/components/admin/ui/admin-button";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { AdminSelect, Field } from "@/components/admin/ui/form-field";
import { Modal } from "@/components/admin/ui/modal";
import { PageHeader } from "@/components/admin/ui/page-header";
import { SectionTabs } from "@/components/admin/ui/section-tabs";
import { StatCard } from "@/components/admin/ui/stat-card";
import { StatusBadge } from "@/components/admin/ui/status-badge";
import { downloadBlob } from "@/lib/download";
import { getApiErrorMessage } from "@/lib/api/errors";
import {
  useCancelInvoice,
  useCloseInvoice,
  useDownloadInvoicePdf,
  useGenerateInvoice,
  useInvoiceDashboard,
  useInvoices,
  useMarkInvoiceDue,
  useSubmitInvoice,
  useUpdateInvoice,
} from "@/lib/api/hooks/finances";
import { useShippers } from "@/lib/api/hooks/shippers";
import type { InvoiceMiniModel } from "@/lib/api/types/models";
import { InvoiceStatus } from "@/lib/api/types/enums";
import { formatDateShort } from "@/utils/helpers";

const COLUMNS: DataTableColumn<InvoiceMiniModel>[] = [
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
    key: "shipper",
    header: "Shipper",
    render: (row) => (
      <span className="text-xs font-medium text-slate-700">
        {row.shipper?.name ?? "—"}
      </span>
    ),
  },
  {
    key: "invoiceDate",
    header: "Invoice date",
    sortable: true,
    render: (row) => (
      <span className="text-xs text-slate-500 font-figure">
        {row.invoiceDate ? formatDateShort(row.invoiceDate) : "—"}
      </span>
    ),
  },
  {
    key: "invoiceStatus",
    header: "Status",
    sortable: true,
    render: (row) => <StatusBadge status={row.invoiceStatus ?? "—"} />,
  },
];

export function InvoicesPage() {
  const [tab, setTab] = React.useState("all");
  const [generateOpen, setGenerateOpen] = React.useState(false);
  const [shipperId, setShipperId] = React.useState("");
  const dashboard = useInvoiceDashboard();
  const invoices = useInvoices({ PageSize: 100 });
  const shippers = useShippers({ PageSize: 100 }, { enabled: generateOpen });
  const rows = invoices.data?.responseData ?? [];
  const summary = dashboard.data?.responseData;
  const shipperRows = shippers.data?.responseData ?? [];

  const submit = useSubmitInvoice({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const markDue = useMarkInvoiceDue({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const close = useCloseInvoice({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const cancel = useCancelInvoice({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const pdf = useDownloadInvoicePdf({
    onSuccess: (blob, variables) =>
      downloadBlob(blob, `invoice-${variables.id}.pdf`),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const generate = useGenerateInvoice({
    onSuccess: (response) => {
      showSuccessAlert(response.responseMessage ?? "Invoice generated");
      setGenerateOpen(false);
    },
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const update = useUpdateInvoice({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });

  React.useEffect(() => {
    if (!shipperId && shipperRows[0]?.id) {
      setShipperId(shipperRows[0].id);
    }
  }, [shipperId, shipperRows]);

  const filtered = React.useMemo(() => {
    if (tab === "all") {
      return rows;
    }
    return rows.filter((row) => row.invoiceStatus === tab);
  }, [rows, tab]);

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Commercial", "Invoice Management"]}
        eyebrow="Commercial"
        title="Invoice Management"
        subtitle="Generated invoices, submission, due marking, close-out and PDF export."
        action={
          <AdminButton
            variant="primary"
            icon={Plus}
            size="sm"
            onClick={() => setGenerateOpen(true)}
          >
            Generate invoice
          </AdminButton>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Active"
          value={summary?.totalActive ?? rows.length}
          icon={Receipt}
        />
        <StatCard
          label="Submitted"
          value={summary?.submitted ?? 0}
          icon={Send}
          tone="info"
        />
        <StatCard
          label="Overdue"
          value={summary?.overdue ?? 0}
          icon={Ban}
          tone="warning"
        />
        <StatCard
          label="Paid this month"
          value={summary?.paidThisMonth ?? 0}
          icon={CheckCircle2}
          tone="success"
        />
      </div>

      <SectionTabs
        tabs={[
          { key: "all", label: "All", count: rows.length },
          ...Object.values(InvoiceStatus).map((status) => ({
            key: status,
            label: status,
            count: rows.filter((row) => row.invoiceStatus === status).length,
          })),
        ]}
        active={tab}
        onChange={setTab}
      />

      <DataTable
        key={tab}
        title="Invoices"
        subtitle={invoices.isPending ? "Loading…" : `${filtered.length} records`}
        columns={COLUMNS}
        data={filtered}
        rowKey="id"
        searchKeys={["invoiceNumber", "id"]}
        rowActions={[
          {
            label: "Submit",
            icon: Send,
            onClick: (row) => row.id && submit.mutate({ id: row.id }),
          },
          {
            label: "Mark due",
            icon: Receipt,
            onClick: (row) => row.id && markDue.mutate({ id: row.id }),
          },
          {
            label: "Update dates",
            icon: Calendar,
            onClick: (row) => {
              if (!row.id) {
                return;
              }
              const dueDate = window.prompt(
                "Due date (YYYY-MM-DD)",
                row.invoiceDate?.slice(0, 10) ?? ""
              );
              if (!dueDate) {
                return;
              }
              update.mutate({
                id: row.id,
                body: {
                  invoiceId: row.id,
                  dueDate,
                  editReason: "Admin date correction",
                },
              });
            },
          },
          {
            label: "Download PDF",
            icon: Download,
            onClick: (row) => row.id && pdf.mutate({ id: row.id }),
          },
          {
            label: "Close",
            icon: CheckCircle2,
            onClick: (row) => row.id && close.mutate({ id: row.id }),
          },
          {
            label: "Cancel",
            icon: Ban,
            danger: true,
            onClick: (row) => row.id && cancel.mutate({ id: row.id }),
          },
        ]}
      />

      <Modal
        open={generateOpen}
        onClose={() => setGenerateOpen(false)}
        title="Generate invoice"
        size="sm"
        footer={
          <AdminButton
            variant="primary"
            disabled={!shipperId || generate.isPending}
            onClick={() => generate.mutate({ body: { shipperId } })}
          >
            {generate.isPending ? "Generating…" : "Generate"}
          </AdminButton>
        }
      >
        <Field label="Shipper" required>
          <AdminSelect
            value={shipperId}
            onChange={(event) => setShipperId(event.target.value)}
          >
            {shipperRows.map((shipper) => (
              <option key={shipper.id} value={shipper.id}>
                {shipper.name}
              </option>
            ))}
          </AdminSelect>
        </Field>
      </Modal>
    </div>
  );
}
