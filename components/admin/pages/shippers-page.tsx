"use client";

import {
  Building2,
  CheckCircle2,
  Eye,
  Pencil,
  Plus,
  Trash2,
  TrendingUp,
} from "lucide-react";

import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import { AdminButton } from "@/components/admin/ui/admin-button";
import { AvatarInitials } from "@/components/admin/ui/avatar-initials";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { StatCard } from "@/components/admin/ui/stat-card";
import { getApiErrorMessage } from "@/lib/api/errors";
import { useDeleteShipper, useShippers } from "@/lib/api/hooks/shippers";
import type { ShipperMiniModel } from "@/lib/api/types/models";
import { formatDateShort } from "@/utils/helpers";

const COLUMNS: DataTableColumn<ShipperMiniModel>[] = [
  {
    key: "name",
    header: "Shipper",
    sortable: true,
    render: (row) => (
      <div className="flex items-center gap-2.5">
        <AvatarInitials name={row.name ?? "Shipper"} size="sm" />
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-800 truncate">
            {row.name ?? "—"}
          </p>
          <p className="text-[11px] text-slate-400 font-figure">{row.id}</p>
        </div>
      </div>
    ),
  },
  {
    key: "email",
    header: "Contact",
    render: (row) => (
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-700 truncate">
          {row.email ?? "—"}
        </p>
        <p className="text-[11px] text-slate-400">{row.phone ?? "—"}</p>
      </div>
    ),
  },
  {
    key: "city",
    header: "Location",
    sortable: true,
    render: (row) => (
      <span className="text-xs text-slate-600">
        {[row.city, row.state, row.country].filter(Boolean).join(", ") || "—"}
      </span>
    ),
  },
  {
    key: "address",
    header: "Address",
    render: (row) => (
      <span className="text-xs text-slate-600 truncate max-w-[220px] block">
        {row.address ?? "—"}
      </span>
    ),
  },
  {
    key: "createdAt",
    header: "Onboarded",
    sortable: true,
    render: (row) => (
      <span className="text-xs text-slate-500 font-figure">
        {row.createdAt ? formatDateShort(row.createdAt) : "—"}
      </span>
    ),
  },
];

export function ShippersPage() {
  const { data, isPending } = useShippers({ PageSize: 100 });
  const rows = data?.responseData ?? [];
  const remove = useDeleteShipper({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Master Data", "Shippers"]}
        eyebrow="Master Data"
        title="Shippers"
        subtitle="Cargo owners whose freight is financed and hauled on the platform."
        action={
          <AdminButton variant="primary" icon={Plus} size="sm">
            Add shipper
          </AdminButton>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Shippers" value={rows.length} icon={Building2} />
        <StatCard
          label="With email"
          value={rows.filter((row) => row.email).length}
          icon={CheckCircle2}
          tone="success"
        />
        <StatCard
          label="States"
          value={new Set(rows.map((row) => row.state).filter(Boolean)).size}
          icon={TrendingUp}
          tone="info"
        />
        <StatCard
          label="Loaded"
          value={isPending ? "…" : rows.length}
          icon={Building2}
        />
      </div>

      <DataTable
        title="Shipper register"
        subtitle={isPending ? "Loading…" : `${rows.length} records`}
        columns={COLUMNS}
        data={rows}
        rowKey="id"
        searchKeys={["name", "id", "email", "phone", "city", "state"]}
        rowActions={[
          { label: "View", icon: Eye, onClick: () => undefined },
          { label: "Edit", icon: Pencil, onClick: () => undefined },
          {
            label: "Delete",
            icon: Trash2,
            danger: true,
            onClick: (row) => {
              if (row.id) {
                remove.mutate({ shipperId: row.id });
              }
            },
          },
        ]}
      />
    </div>
  );
}
