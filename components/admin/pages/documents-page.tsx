"use client";

import {
  Download,
  Eye,
  File,
  FileCheck2,
  FileText,
  FolderOpen,
  Image as ImageIcon,
  ShieldCheck,
  Trash2,
  Upload,
} from "lucide-react";

import { AdminButton } from "@/components/admin/ui/admin-button";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { StatCard } from "@/components/admin/ui/stat-card";
import { StatusBadge } from "@/components/admin/ui/status-badge";
import { DOCS } from "@/constants/admin/mock-data";
import type { AdminDocument } from "@/types/admin";
import { formatDateShort } from "@/utils/helpers";

const isImage = (name: string) => /\.(jpe?g|png|gif|webp)$/i.test(name);

const COLUMNS: DataTableColumn<AdminDocument>[] = [
  {
    key: "name",
    header: "Document",
    sortable: true,
    render: (r) => (
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
          {isImage(r.name) ? (
            <ImageIcon className="w-4 h-4" />
          ) : (
            <FileText className="w-4 h-4" />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-800 truncate">{r.name}</p>
          <p className="text-[11px] text-slate-400 font-figure">{r.id}</p>
        </div>
      </div>
    ),
  },
  { key: "type", header: "Type", sortable: true },
  {
    key: "shipper",
    header: "Linked Party",
    sortable: true,
    render: (r) => <span className="text-xs text-slate-600">{r.shipper}</span>,
  },
  {
    key: "size",
    header: "Size",
    sortable: true,
    render: (r) => (
      <span className="tabular-nums font-figure text-slate-500">{r.size}</span>
    ),
  },
  {
    key: "uploaded",
    header: "Uploaded",
    sortable: true,
    render: (r) => (
      <span className="text-xs text-slate-500 font-figure">
        {formatDateShort(r.uploaded)}
      </span>
    ),
  },
  {
    key: "tag",
    header: "Verification",
    sortable: true,
    render: (r) => <StatusBadge status={r.tag} />,
  },
];

export function DocumentsPage() {
  const verified = DOCS.filter((d) => d.tag === "Verified").length;
  const pending = DOCS.filter((d) => d.tag === "Pending Review").length;
  const types = new Set(DOCS.map((d) => d.type)).size;

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Intelligence", "Documents"]}
        eyebrow="Intelligence"
        title="Documents"
        subtitle="Central evidence vault — waybills, invoices, proofs of delivery, KYC and insurance certificates."
        action={
          <div className="flex items-center gap-2">
            <AdminButton variant="secondary" icon={Download} size="sm">
              Download all
            </AdminButton>
            <AdminButton variant="primary" icon={Upload} size="sm">
              Upload document
            </AdminButton>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Documents" value={DOCS.length} icon={FolderOpen} />
        <StatCard label="Document Types" value={types} icon={File} tone="info" />
        <StatCard
          label="Verified"
          value={verified}
          icon={ShieldCheck}
          tone="success"
          delta={Math.round((verified / DOCS.length) * 100)}
          deltaLabel="of total"
        />
        <StatCard
          label="Pending Review"
          value={pending}
          icon={FileCheck2}
          tone={pending > 0 ? "warning" : "success"}
        />
      </div>

      <DataTable
        title="Document Vault"
        subtitle={`${DOCS.length} files across ${types} categories`}
        columns={COLUMNS}
        data={DOCS}
        rowKey="id"
        searchKeys={["id", "name", "type", "shipper", "tag"]}
        filterOptions={[
          {
            key: "type",
            label: "Type",
            options: [
              "Waybill",
              "Invoice",
              "Settlement",
              "Proof of Delivery",
              "KYC",
              "Insurance",
            ],
          },
          {
            key: "tag",
            label: "Verification",
            options: ["Verified", "Sent", "Final", "Pending Review", "Valid"],
          },
        ]}
        rowActions={[
          { label: "Preview", icon: Eye, onClick: () => {} },
          { label: "Download", icon: Download, onClick: () => {} },
          { label: "Mark verified", icon: ShieldCheck, onClick: () => {} },
          { label: "Delete", icon: Trash2, danger: true, onClick: () => {} },
        ]}
        bulkActions={[
          { label: "Download selected", icon: Download, onClick: () => {} },
          { label: "Delete selected", icon: Trash2, onClick: () => {} },
        ]}
      />
    </div>
  );
}
