"use client";

import { Boxes, Package } from "lucide-react";

import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { StatCard } from "@/components/admin/ui/stat-card";
import { useProductTypes } from "@/lib/api/hooks/shared";
import type { ProductTypeMiniModel } from "@/lib/api/types/models";

const COLUMNS: DataTableColumn<ProductTypeMiniModel>[] = [
  {
    key: "name",
    header: "Product",
    sortable: true,
    render: (row) => (
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
          <Package className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-800 truncate">
            {row.name ?? "—"}
          </p>
          <p className="text-[11px] text-slate-400 font-figure">{row.id}</p>
        </div>
      </div>
    ),
  },
];

export function ProductsPage() {
  const { data, isPending } = useProductTypes();
  const rows = data?.responseData ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Master Data", "Products"]}
        eyebrow="Master Data"
        title="Products"
        subtitle="Commodity types accepted for haulage."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Product types" value={rows.length} icon={Boxes} />
        <StatCard label="Loaded" value={isPending ? "…" : rows.length} icon={Package} />
      </div>

      <DataTable
        title="Product catalogue"
        subtitle={isPending ? "Loading…" : `${rows.length} records`}
        columns={COLUMNS}
        data={rows}
        rowKey="id"
        searchKeys={["id", "name"]}
      />
    </div>
  );
}
