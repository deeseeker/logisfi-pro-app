"use client";

import * as React from "react";
import { Percent } from "lucide-react";

import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { SectionTabs } from "@/components/admin/ui/section-tabs";
import { StatCard } from "@/components/admin/ui/stat-card";
import { useShipperPriceList } from "@/lib/api/hooks/shippers";
import { useVendorPriceList } from "@/lib/api/hooks/vendors";
import type { ShipperPriceModel, VendorPriceModel } from "@/lib/api/types/models";
import { formatDateShort, formatNaira } from "@/utils/helpers";

const SHIPPER_COLUMNS: DataTableColumn<ShipperPriceModel>[] = [
  {
    key: "shipper",
    header: "Shipper",
    sortable: true,
    render: (row) => (
      <span className="text-xs font-semibold text-slate-800">
        {row.shipper?.name ?? "—"}
      </span>
    ),
  },
  {
    key: "truck",
    header: "Truck class",
    render: (row) => (
      <span className="text-xs font-medium text-slate-700 font-figure">
        {row.truckSize?.size ?? "—"} {row.truckSize?.measurementUnit ?? ""}
      </span>
    ),
  },
  {
    key: "route",
    header: "Route",
    render: (row) => (
      <span className="text-xs text-slate-600">
        {row.route
          ? `${row.route.origin ?? "—"} → ${row.route.destination ?? "—"}`
          : "—"}
      </span>
    ),
  },
  {
    key: "price",
    header: "Rate",
    sortable: true,
    render: (row) => (
      <span className="tabular-nums font-figure font-semibold text-slate-800">
        {formatNaira(row.price ?? 0)}
      </span>
    ),
  },
  {
    key: "modifiedAt",
    header: "Updated",
    render: (row) => (
      <span className="text-xs text-slate-500 font-figure">
        {row.modifiedAt
          ? formatDateShort(row.modifiedAt)
          : row.createdAt
            ? formatDateShort(row.createdAt)
            : "—"}
      </span>
    ),
  },
];

const VENDOR_COLUMNS: DataTableColumn<VendorPriceModel>[] = [
  {
    key: "vendor",
    header: "Carrier",
    sortable: true,
    render: (row) => (
      <span className="text-xs font-semibold text-slate-800">
        {row.vendor?.name ?? "—"}
      </span>
    ),
  },
  {
    key: "truck",
    header: "Truck class",
    render: (row) => (
      <span className="text-xs font-medium text-slate-700 font-figure">
        {row.truckSize?.size ?? "—"} {row.truckSize?.measurementUnit ?? ""}
      </span>
    ),
  },
  {
    key: "route",
    header: "Route",
    render: (row) => (
      <span className="text-xs text-slate-600">
        {row.route
          ? `${row.route.origin ?? "—"} → ${row.route.destination ?? "—"}`
          : "—"}
      </span>
    ),
  },
  {
    key: "price",
    header: "Rate",
    sortable: true,
    render: (row) => (
      <span className="tabular-nums font-figure font-semibold text-slate-800">
        {formatNaira(row.price ?? 0)}
      </span>
    ),
  },
];

export function PricingPage() {
  const [tab, setTab] = React.useState("shipper");
  const shipperPrices = useShipperPriceList({ PageSize: 100 });
  const vendorPrices = useVendorPriceList({ PageSize: 100 });
  const shipperRows = shipperPrices.data?.responseData ?? [];
  const vendorRows = vendorPrices.data?.responseData ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Commercial", "Price Management"]}
        eyebrow="Commercial"
        title="Price Management"
        subtitle="Shipper and carrier rate cards by route and truck class."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Shipper rates" value={shipperRows.length} icon={Percent} />
        <StatCard
          label="Carrier rates"
          value={vendorRows.length}
          icon={Percent}
          tone="info"
        />
      </div>

      <SectionTabs
        tabs={[
          { key: "shipper", label: "Shipper rates", count: shipperRows.length },
          { key: "vendor", label: "Carrier rates", count: vendorRows.length },
        ]}
        active={tab}
        onChange={setTab}
      />

      {tab === "shipper" ? (
        <DataTable
          title="Shipper price list"
          subtitle={
            shipperPrices.isPending ? "Loading…" : `${shipperRows.length} rates`
          }
          columns={SHIPPER_COLUMNS}
          data={shipperRows}
          rowKey="id"
          searchKeys={["id"]}
        />
      ) : (
        <DataTable
          title="Carrier price list"
          subtitle={
            vendorPrices.isPending ? "Loading…" : `${vendorRows.length} rates`
          }
          columns={VENDOR_COLUMNS}
          data={vendorRows}
          rowKey="id"
          searchKeys={["id"]}
        />
      )}
    </div>
  );
}
