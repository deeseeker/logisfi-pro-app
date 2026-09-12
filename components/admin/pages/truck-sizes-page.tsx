"use client";

import { Paperclip, Truck } from "lucide-react";

import { CatalogueStats } from "@/components/admin/ui/catalogue-stats";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { TRUCK_SIZES } from "@/constants/admin/mock-data";
import { useTruckSizes } from "@/lib/api/hooks/shared";
import type { TruckSizeMiniModel } from "@/lib/api/types/models";

const COLUMNS: DataTableColumn<TruckSizeMiniModel>[] = [
  {
    key: "size",
    header: "Size",
    sortable: true,
    render: (row) => (
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center shrink-0">
          <Truck className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-800 font-figure">
            {row.size ?? "—"}
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
      <span className="text-xs text-slate-700">
        {row.measurementUnit ?? "—"}
      </span>
    ),
  },
];

export function TruckSizesPage() {
  const list = useTruckSizes();
  const rows = list.data?.responseData ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Master Data", "Truck Sizes"]}
        title="Truck Sizes"
        subtitle="Fleet capacity classes from the shared catalogue. Create and update are not available on the API."
      />

      <CatalogueStats
        totalLabel="Total Truck Sizes"
        totalIcon={Paperclip}
        rows={TRUCK_SIZES}
      />

      <DataTable
        title="Truck sizes"
        subtitle={list.isPending ? "Loading…" : `${rows.length} records`}
        columns={COLUMNS}
        data={rows}
        rowKey="id"
        pageSize={10}
        searchKeys={["id", "size", "measurementUnit"]}
      />
    </div>
  );
}
