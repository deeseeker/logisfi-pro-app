"use client";

import { Layers, Ruler, Weight } from "lucide-react";

import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { StatCard } from "@/components/admin/ui/stat-card";
import { useTruckSizes } from "@/lib/api/hooks/shared";
import type { TruckSizeMiniModel } from "@/lib/api/types/models";

const COLUMNS: DataTableColumn<TruckSizeMiniModel>[] = [
  {
    key: "size",
    header: "Truck class",
    sortable: true,
    render: (row) => (
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
          <Ruler className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-800">
            {row.size ?? "—"} {row.measurementUnit ?? ""}
          </p>
          <p className="text-[11px] text-slate-400 font-figure">{row.id}</p>
        </div>
      </div>
    ),
  },
  {
    key: "measurementUnit",
    header: "Unit",
    sortable: true,
    render: (row) => (
      <span className="text-xs text-slate-700">{row.measurementUnit ?? "—"}</span>
    ),
  },
];

export function TruckSizesPage() {
  const { data, isPending } = useTruckSizes();
  const rows = data?.responseData ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Master Data", "Truck Sizes"]}
        eyebrow="Master Data"
        title="Truck Sizes"
        subtitle="Capacity classes used when quoting shipper and carrier rates."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Classes" value={rows.length} icon={Layers} />
        <StatCard
          label="Largest"
          value={
            rows.reduce((max, row) => Math.max(max, row.size ?? 0), 0) || "—"
          }
          icon={Weight}
          tone="info"
        />
        <StatCard label="Loaded" value={isPending ? "…" : rows.length} icon={Ruler} />
      </div>

      <DataTable
        title="Truck classes"
        subtitle={isPending ? "Loading…" : `${rows.length} records`}
        columns={COLUMNS}
        data={rows}
        rowKey="id"
        searchKeys={["id", "measurementUnit"]}
      />
    </div>
  );
}
