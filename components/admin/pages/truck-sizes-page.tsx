"use client";

import { Ban, Layers, Pencil, Plus, Ruler, Trash2, Weight } from "lucide-react";

import { AdminButton } from "@/components/admin/ui/admin-button";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { StatCard } from "@/components/admin/ui/stat-card";
import { StatusBadge } from "@/components/admin/ui/status-badge";
import { TRUCK_SIZES } from "@/constants/admin/mock-data";
import type { AdminTruckSize } from "@/types/admin";
import { formatNaira } from "@/utils/helpers";

const COLUMNS: DataTableColumn<AdminTruckSize>[] = [
  {
    key: "name",
    header: "Truck Class",
    sortable: true,
    render: (r) => (
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
          <Ruler className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-800">{r.name}</p>
          <p className="text-[11px] text-slate-400 font-figure">{r.id}</p>
        </div>
      </div>
    ),
  },
  {
    key: "capacity",
    header: "Capacity",
    sortable: true,
    render: (r) => (
      <span className="text-xs font-semibold text-slate-800 tabular-nums font-figure">
        {r.capacity}
      </span>
    ),
  },
  {
    key: "maxWeight",
    header: "Max Payload",
    sortable: true,
    render: (r) => (
      <span className="tabular-nums font-figure text-slate-700">{r.maxWeight}</span>
    ),
  },
  {
    key: "axles",
    header: "Axles",
    sortable: true,
    render: (r) => <span className="tabular-nums font-figure">{r.axles}</span>,
  },
  {
    key: "baseRatePerKm",
    header: "Base Rate / km",
    sortable: true,
    render: (r) => (
      <span className="tabular-nums font-figure font-semibold text-slate-800">
        {formatNaira(r.baseRatePerKm)}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (r) => <StatusBadge status={r.status} />,
  },
];

export function TruckSizesPage() {
  const largest = TRUCK_SIZES.reduce((a, b) => (a.axles > b.axles ? a : b));
  const avgRate = Math.round(
    TRUCK_SIZES.reduce((sum, t) => sum + t.baseRatePerKm, 0) / TRUCK_SIZES.length
  );

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Master Data", "Truck Sizes"]}
        eyebrow="Master Data"
        title="Truck Sizes"
        subtitle="Vehicle classes available for booking, their payload ceilings and base per-kilometre rates."
        action={
          <AdminButton variant="primary" icon={Plus} size="sm">
            Add truck class
          </AdminButton>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Truck Classes" value={TRUCK_SIZES.length} icon={Ruler} />
        <StatCard
          label="Largest Class"
          value={largest.capacity}
          icon={Weight}
          tone="info"
        />
        <StatCard
          label="Avg. Base Rate / km"
          value={formatNaira(avgRate)}
          icon={Layers}
          tone="success"
        />
        <StatCard label="Max Axles" value={largest.axles} icon={Layers} />
      </div>

      <DataTable
        title="Truck Size Register"
        subtitle={`${TRUCK_SIZES.length} vehicle classes`}
        columns={COLUMNS}
        data={TRUCK_SIZES}
        rowKey="id"
        searchKeys={["id", "name", "capacity", "maxWeight"]}
        filterOptions={[
          { key: "status", label: "Status", options: ["Active", "Suspended"] },
        ]}
        rowActions={[
          { label: "Edit class", icon: Pencil, onClick: () => {} },
          { label: "Deactivate", icon: Ban, onClick: () => {} },
          { label: "Delete", icon: Trash2, danger: true, onClick: () => {} },
        ]}
      />
    </div>
  );
}
