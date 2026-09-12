"use client";

import { Atom } from "lucide-react";

import { CatalogueStats } from "@/components/admin/ui/catalogue-stats";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { PRODUCTS } from "@/constants/admin/mock-data";
import { useProductTypes } from "@/lib/api/hooks/shared";
import type { ProductTypeMiniModel } from "@/lib/api/types/models";

const COLUMNS: DataTableColumn<ProductTypeMiniModel>[] = [
  {
    key: "name",
    header: "Product",
    sortable: true,
    render: (row) => (
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center shrink-0">
          <Atom className="w-4 h-4" />
        </div>
        <p className="text-xs font-semibold text-slate-800 truncate">
          {row.name ?? "—"}
        </p>
      </div>
    ),
  },
  {
    key: "id",
    header: "ID",
    render: (row) => (
      <span className="text-[11px] text-slate-400 font-figure">{row.id}</span>
    ),
  },
];

export function ProductsPage() {
  const list = useProductTypes();
  const rows = list.data?.responseData ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Master Data", "Products"]}
        title="Products"
        subtitle="Product types from the shared catalogue. Create and update are not available on the API."
      />

      <CatalogueStats
        totalLabel="Total Products"
        totalIcon={Atom}
        rows={PRODUCTS}
      />

      <DataTable
        title="Product types"
        subtitle={list.isPending ? "Loading…" : `${rows.length} records`}
        columns={COLUMNS}
        data={rows}
        rowKey="id"
        pageSize={10}
        searchKeys={["id", "name"]}
      />
    </div>
  );
}
