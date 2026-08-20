"use client";

import { Ban, Boxes, Flame, Package, Pencil, Plus, Trash2, Upload } from "lucide-react";

import { AdminButton } from "@/components/admin/ui/admin-button";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { StatCard } from "@/components/admin/ui/stat-card";
import { StatusBadge, ToneBadge } from "@/components/admin/ui/status-badge";
import { PRODUCTS } from "@/constants/admin/mock-data";
import type { AdminProduct } from "@/types/admin";

const COLUMNS: DataTableColumn<AdminProduct>[] = [
  {
    key: "name",
    header: "Product",
    sortable: true,
    render: (r) => (
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
          <Package className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-800 truncate">{r.name}</p>
          <p className="text-[11px] text-slate-400 font-figure">{r.id}</p>
        </div>
      </div>
    ),
  },
  { key: "category", header: "Category", sortable: true },
  { key: "unit", header: "Unit", sortable: true },
  {
    key: "avgWeight",
    header: "Avg. Weight",
    sortable: true,
    render: (r) => (
      <span className="tabular-nums font-figure text-slate-700">{r.avgWeight}</span>
    ),
  },
  {
    key: "hazmat",
    header: "Handling",
    sortable: true,
    render: (r) =>
      r.hazmat ? (
        <ToneBadge tone="error" dot={false}>
          <Flame className="w-3 h-3" />
          Hazmat
        </ToneBadge>
      ) : (
        <span className="text-xs text-slate-400">Standard</span>
      ),
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (r) => <StatusBadge status={r.status} />,
  },
];

export function ProductsPage() {
  const categories = new Set(PRODUCTS.map((p) => p.category)).size;
  const hazmat = PRODUCTS.filter((p) => p.hazmat).length;
  const active = PRODUCTS.filter((p) => p.status === "Active").length;

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Master Data", "Products"]}
        eyebrow="Master Data"
        title="Products"
        subtitle="Commodity catalogue accepted for haulage, including packaging units and hazardous-goods classification."
        action={
          <div className="flex items-center gap-2">
            <AdminButton variant="secondary" icon={Upload} size="sm">
              Bulk import
            </AdminButton>
            <AdminButton variant="primary" icon={Plus} size="sm">
              Add product
            </AdminButton>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Products" value={PRODUCTS.length} icon={Boxes} />
        <StatCard label="Categories" value={categories} icon={Boxes} tone="info" />
        <StatCard label="Active" value={active} icon={Package} tone="success" />
        <StatCard
          label="Hazmat Items"
          value={hazmat}
          icon={Flame}
          tone={hazmat > 0 ? "warning" : "neutral"}
        />
      </div>

      <DataTable
        title="Product Catalogue"
        subtitle={`${PRODUCTS.length} commodities across ${categories} categories`}
        columns={COLUMNS}
        data={PRODUCTS}
        rowKey="id"
        searchKeys={["id", "name", "category", "unit"]}
        filterOptions={[
          {
            key: "category",
            label: "Category",
            options: [
              "Grains",
              "Sugar",
              "Edible Oil",
              "Construction",
              "Beverages",
              "HPC",
              "Fuel",
            ],
          },
          { key: "status", label: "Status", options: ["Active", "Suspended"] },
        ]}
        rowActions={[
          { label: "Edit product", icon: Pencil, onClick: () => {} },
          { label: "Deactivate", icon: Ban, onClick: () => {} },
          { label: "Delete", icon: Trash2, danger: true, onClick: () => {} },
        ]}
      />
    </div>
  );
}
