"use client";

import { Eye, Pencil, Plus, Trash2, Truck } from "lucide-react";

import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import { AdminButton } from "@/components/admin/ui/admin-button";
import { AvatarInitials } from "@/components/admin/ui/avatar-initials";
import {
  DataTable,
  type DataTableColumn,
} from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { StatCard } from "@/components/admin/ui/stat-card";
import { getApiErrorMessage } from "@/lib/api/errors";
import { useDeleteVendor, useVendors } from "@/lib/api/hooks/vendors";
import type { VendorMiniModel } from "@/lib/api/types/models";
import { formatDateShort } from "@/utils/helpers";

const COLUMNS: DataTableColumn<VendorMiniModel>[] = [
  {
    key: "name",
    header: "Carrier",
    sortable: true,
    render: (row) => (
      <div className="flex items-center gap-2.5">
        <AvatarInitials name={row.name ?? "Carrier"} size="sm" />
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-800 truncate">
            {row.name ?? "—"}
          </p>
          <p className="text-[11px] text-slate-400">{row.id}</p>
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
        {[row.city, row.state].filter(Boolean).join(", ") || "—"}
      </span>
    ),
  },
  {
    key: "vendorBankDetail",
    header: "Bank",
    render: (row) => (
      <span className="text-xs text-slate-600">
        {row.vendorBankDetail?.bankName ?? "—"}
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

export function CarriersPage() {
  const { data, isPending } = useVendors({ PageSize: 100 });
  const rows = data?.responseData ?? [];
  const remove = useDeleteVendor({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Master Data", "Carriers"]}
        eyebrow="Master Data"
        title="Carriers"
        subtitle="Haulage partners (vendors) available to move financed cargo."
        action={
          <AdminButton variant="primary" icon={Plus} size="sm">
            Add carrier
          </AdminButton>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Carriers" value={rows.length} icon={Truck} />
        <StatCard
          label="With bank details"
          value={rows.filter((row) => row.vendorBankDetail).length}
          icon={Truck}
          tone="info"
        />
        <StatCard
          label="States"
          value={new Set(rows.map((row) => row.state).filter(Boolean)).size}
          icon={Truck}
        />
        <StatCard
          label="Loaded"
          value={isPending ? "…" : rows.length}
          icon={Truck}
        />
      </div>

      <DataTable
        title="Carrier register"
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
                remove.mutate({ vendorId: row.id });
              }
            },
          },
        ]}
      />
    </div>
  );
}
