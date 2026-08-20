"use client";

import { Clock, MapPin, Pencil, Plus, Route as RouteIcon, Ban, Trash2 } from "lucide-react";

import { AdminButton } from "@/components/admin/ui/admin-button";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { StatCard } from "@/components/admin/ui/stat-card";
import { StatusBadge } from "@/components/admin/ui/status-badge";
import { ROUTES } from "@/constants/admin/mock-data";
import type { AdminRoute } from "@/types/admin";

const COLUMNS: DataTableColumn<AdminRoute>[] = [
  {
    key: "id",
    header: "Route ID",
    sortable: true,
    render: (r) => (
      <span className="text-xs font-semibold text-slate-800 font-figure">{r.id}</span>
    ),
  },
  {
    key: "origin",
    header: "Corridor",
    sortable: true,
    render: (r) => (
      <span className="flex items-center gap-2 text-xs font-medium text-slate-700">
        <MapPin className="w-3.5 h-3.5 text-blue-800 shrink-0" />
        {r.origin}
        <span className="text-slate-300">→</span>
        {r.destination}
      </span>
    ),
  },
  {
    key: "distanceKm",
    header: "Distance",
    sortable: true,
    render: (r) => (
      <span className="tabular-nums font-figure font-semibold text-slate-800">
        {r.distanceKm.toLocaleString()} km
      </span>
    ),
  },
  {
    key: "avgTransitHrs",
    header: "Avg. Transit",
    sortable: true,
    render: (r) => (
      <span className="inline-flex items-center gap-1 text-xs text-slate-600">
        <Clock className="w-3 h-3 text-slate-400" />
        <span className="tabular-nums font-figure">{r.avgTransitHrs} hrs</span>
      </span>
    ),
  },
  {
    key: "tollPoints",
    header: "Toll Points",
    sortable: true,
    render: (r) => <span className="tabular-nums font-figure">{r.tollPoints}</span>,
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (r) => <StatusBadge status={r.status} />,
  },
];

export function RoutesPage() {
  const totalKm = ROUTES.reduce((sum, r) => sum + r.distanceKm, 0);
  const avgTransit = Math.round(
    ROUTES.reduce((sum, r) => sum + r.avgTransitHrs, 0) / ROUTES.length
  );
  const longest = ROUTES.reduce((a, b) => (a.distanceKm > b.distanceKm ? a : b));

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Master Data", "Routes"]}
        eyebrow="Master Data"
        title="Routes"
        subtitle="Freight corridors served by the network, with distance, transit benchmarks and toll exposure."
        action={
          <AdminButton variant="primary" icon={Plus} size="sm">
            Add route
          </AdminButton>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Active Routes" value={ROUTES.length} icon={RouteIcon} />
        <StatCard
          label="Network Distance"
          value={`${totalKm.toLocaleString()} km`}
          icon={MapPin}
          tone="info"
        />
        <StatCard label="Avg. Transit" value={`${avgTransit} hrs`} icon={Clock} />
        <StatCard
          label="Longest Corridor"
          value={`${longest.distanceKm.toLocaleString()} km`}
          icon={RouteIcon}
          tone="warning"
        />
      </div>

      <DataTable
        title="Route Register"
        subtitle={`${ROUTES.length} corridors`}
        columns={COLUMNS}
        data={ROUTES}
        rowKey="id"
        searchKeys={["id", "origin", "destination"]}
        filterOptions={[
          { key: "status", label: "Status", options: ["Active", "Suspended"] },
        ]}
        rowActions={[
          { label: "Edit route", icon: Pencil, onClick: () => {} },
          { label: "Deactivate", icon: Ban, onClick: () => {} },
          { label: "Delete", icon: Trash2, danger: true, onClick: () => {} },
        ]}
      />
    </div>
  );
}
