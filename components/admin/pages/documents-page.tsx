"use client";

import { useRef } from "react";
import { Download, File, FileText, FolderOpen, Upload } from "lucide-react";

import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import { AdminButton } from "@/components/admin/ui/admin-button";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { StatCard } from "@/components/admin/ui/stat-card";
import { StatusBadge } from "@/components/admin/ui/status-badge";
import { downloadBlob, formatFileSize } from "@/lib/download";
import { getApiErrorMessage } from "@/lib/api/errors";
import {
  useBulkDownloadDocuments,
  useDocuments,
  useDownloadDocument,
  useUploadDocument,
} from "@/lib/api/hooks/documents";
import { DocumentType } from "@/lib/api/types/enums";
import type { DocumentModel } from "@/lib/api/types/models";
import { formatDateShort } from "@/utils/helpers";

const COLUMNS: DataTableColumn<DocumentModel>[] = [
  {
    key: "fileName",
    header: "Document",
    sortable: true,
    render: (row) => (
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
          <FileText className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-800 truncate">
            {row.fileName ?? "—"}
          </p>
          <p className="text-[11px] text-slate-400 font-figure">{row.id}</p>
        </div>
      </div>
    ),
  },
  {
    key: "documentType",
    header: "Type",
    sortable: true,
    render: (row) => <StatusBadge status={row.documentType ?? "Other"} />,
  },
  {
    key: "sourceEntityType",
    header: "Linked to",
    render: (row) => (
      <span className="text-xs text-slate-600">
        {row.sourceEntityType ?? "—"}
      </span>
    ),
  },
  {
    key: "fileSizeBytes",
    header: "Size",
    render: (row) => (
      <span className="tabular-nums font-figure text-slate-500">
        {formatFileSize(row.fileSizeBytes)}
      </span>
    ),
  },
  {
    key: "uploadedAt",
    header: "Uploaded",
    render: (row) => (
      <span className="text-xs text-slate-500 font-figure">
        {row.uploadedAt ? formatDateShort(row.uploadedAt) : "—"}
      </span>
    ),
  },
  {
    key: "version",
    header: "Version",
    render: (row) => (
      <span className="tabular-nums font-figure">{row.version ?? 1}</span>
    ),
  },
];

export function DocumentsPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const docs = useDocuments({ PageSize: 100 });
  const rows = docs.data?.responseData ?? [];
  const download = useDownloadDocument({
    onSuccess: (blob, variables) =>
      downloadBlob(blob, `document-${variables.documentId}`),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const bulk = useBulkDownloadDocuments({
    onSuccess: (blob) => downloadBlob(blob, "documents.zip"),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const upload = useUploadDocument({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Intelligence", "Documents"]}
        eyebrow="Intelligence"
        title="Documents"
        subtitle="Evidence vault — waybills, invoices, proofs of delivery and statements."
        action={
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) {
                  return;
                }
                upload.mutate({
                  body: { file, documentType: DocumentType.Other },
                });
                event.target.value = "";
              }}
            />
            <AdminButton
              variant="primary"
              icon={Upload}
              size="sm"
              onClick={() => inputRef.current?.click()}
              disabled={upload.isPending}
            >
              Upload document
            </AdminButton>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Documents" value={rows.length} icon={FolderOpen} />
        <StatCard
          label="Types"
          value={new Set(rows.map((row) => row.documentType).filter(Boolean)).size}
          icon={File}
          tone="info"
        />
      </div>

      <DataTable
        title="Document vault"
        subtitle={docs.isPending ? "Loading…" : `${rows.length} files`}
        columns={COLUMNS}
        data={rows}
        rowKey="id"
        searchKeys={["fileName", "id", "documentType"]}
        filterOptions={[
          {
            key: "documentType",
            label: "Type",
            options: Object.values(DocumentType),
          },
        ]}
        rowActions={[
          {
            label: "Download",
            icon: Download,
            onClick: (row) =>
              row.id && download.mutate({ documentId: row.id }),
          },
        ]}
        bulkActions={[
          {
            label: "Download selected",
            icon: Download,
            onClick: (ids) =>
              bulk.mutate({ body: { documentIds: ids } }),
          },
        ]}
      />
    </div>
  );
}
