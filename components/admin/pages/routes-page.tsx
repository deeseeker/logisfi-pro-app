"use client";

import { MapPin, Plus, Route as RouteIcon, Trash2 } from "lucide-react";

import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import { AdminButton } from "@/components/admin/ui/admin-button";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { StatCard } from "@/components/admin/ui/stat-card";
import { getApiErrorMessage } from "@/lib/api/errors";
import { useDeleteRoute, useRoutes } from "@/lib/api/hooks/routes";
import type { RouteMiniModel } from "@/lib/api/types/models";
import { formatDateShort } from "@/utils/helpers";

const COLUMNS: DataTableColumn<RouteMiniModel>[] = [
  {
    key: "id",
    header: "Route ID",
    sortable: true,
    render: (row) => (
      <span className="text-xs font-semibold text-slate-800 font-figure">
        {row.id}
      </span>
    ),
  },
  {
    key: "origin",
    header: "Corridor",
    sortable: true,
    render: (row) => (
      <span className="flex items-center gap-2 text-xs font-medium text-slate-700">
        <MapPin className="w-3.5 h-3.5 text-blue-800 shrink-0" />
        {row.origin ?? "—"}
        <span className="text-slate-300">→</span>
        {row.destination ?? "—"}
      </span>
    ),
  },
  {
    key: "createdAt",
    header: "Created",
    sortable: true,
    render: (row) => (
      <span className="text-xs text-slate-500 font-figure">
        {row.createdAt ? formatDateShort(row.createdAt) : "—"}
      </span>
    ),
  },
];

export function RoutesPage() {
  const { data, isPending } = useRoutes({ PageSize: 100 });
  const rows = data?.responseData ?? [];
  const remove = useDeleteRoute({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Master Data", "Routes"]}
        eyebrow="Master Data"
        title="Routes"
        subtitle="Origin–destination corridors used for pricing and shipment planning."
        action={
          <AdminButton variant="primary" icon={Plus} size="sm">
            Add route
          </AdminButton>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Routes" value={rows.length} icon={RouteIcon} />
        <StatCard
          label="Origins"
          value={new Set(rows.map((row) => row.origin).filter(Boolean)).size}
          icon={MapPin}
          tone="info"
        />
        <StatCard
          label="Destinations"
          value={new Set(rows.map((row) => row.destination).filter(Boolean)).size}
          icon={MapPin}
        />
        <StatCard
          label="Loaded"
          value={isPending ? "…" : rows.length}
          icon={RouteIcon}
        />
      </div>

      <DataTable
        title="Route catalogue"
        subtitle={isPending ? "Loading…" : `${rows.length} records`}
        columns={COLUMNS}
        data={rows}
        rowKey="id"
        searchKeys={["id", "origin", "destination"]}
        rowActions={[
          {
            label: "Delete",
            icon: Trash2,
            danger: true,
            onClick: (row) => {
              if (row.id) {
                remove.mutate({ routeId: row.id });
              }
            },
          },
        ]}
      />
    </div>
  );
}
