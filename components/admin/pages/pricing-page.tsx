"use client";

import * as React from "react";
import {
  CheckCircle2,
  Eye,
  Pencil,
  Percent,
  Plus,
  ThumbsUp,
  TrendingUp,
  Upload,
  XCircle,
} from "lucide-react";

import { AdminButton } from "@/components/admin/ui/admin-button";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { SectionTabs } from "@/components/admin/ui/section-tabs";
import { StatCard } from "@/components/admin/ui/stat-card";
import { StatusBadge } from "@/components/admin/ui/status-badge";
import { PRICING_ROWS, SHIPPERS, TRUCK_SIZES } from "@/constants/admin/mock-data";
import type { AdminPriceRule } from "@/types/admin";
import { formatDateShort, formatNaira } from "@/utils/helpers";

const TABS = [
  { key: "all", label: "All Rate Cards", count: PRICING_ROWS.length },
  {
    key: "active",
    label: "Active",
    count: PRICING_ROWS.filter((p) => p.status === "Active").length,
  },
  {
    key: "pending",
    label: "Pending Approval",
    count: PRICING_ROWS.filter((p) => p.status === "Pending Approval").length,
  },
];

const COLUMNS: DataTableColumn<AdminPriceRule>[] = [
  {
    key: "shipper",
    header: "Shipper",
    sortable: true,
    render: (r) => (
      <span className="text-xs font-semibold text-slate-800">{r.shipper}</span>
    ),
  },
  {
    key: "truck",
    header: "Truck Class",
    sortable: true,
    render: (r) => (
      <span className="text-xs font-medium text-slate-700 font-figure">{r.truck}</span>
    ),
  },
  {
    key: "route",
    header: "Route",
    sortable: true,
    render: (r) => <span className="text-xs text-slate-600">{r.route}</span>,
  },
  {
    key: "rate",
    header: "Rate / km",
    sortable: true,
    render: (r) => (
      <span className="tabular-nums font-figure font-semibold text-slate-800">
        {formatNaira(r.rate)}
      </span>
    ),
  },
  {
    key: "effective",
    header: "Effective From",
    sortable: true,
    render: (r) => (
      <span className="text-xs text-slate-500 font-figure">
        {formatDateShort(r.effective)}
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

export function PricingPage() {
  const [tab, setTab] = React.useState("all");

  const data = React.useMemo(() => {
    if (tab === "active") return PRICING_ROWS.filter((p) => p.status === "Active");
    if (tab === "pending")
      return PRICING_ROWS.filter((p) => p.status === "Pending Approval");
    return PRICING_ROWS;
  }, [tab]);

  const pending = PRICING_ROWS.filter((p) => p.status === "Pending Approval").length;
  const avgRate = Math.round(
    PRICING_ROWS.reduce((sum, p) => sum + p.rate, 0) / PRICING_ROWS.length
  );
  const highest = PRICING_ROWS.reduce((a, b) => (a.rate > b.rate ? a : b));

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Commercial", "Price Management"]}
        eyebrow="Commercial"
        title="Price Management"
        subtitle="Negotiated per-kilometre rate cards by shipper, truck class and corridor, with approval workflow."
        action={
          <div className="flex items-center gap-2">
            <AdminButton variant="secondary" icon={Upload} size="sm">
              Import rates
            </AdminButton>
            <AdminButton variant="primary" icon={Plus} size="sm">
              New rate card
            </AdminButton>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Rate Cards" value={PRICING_ROWS.length} icon={Percent} />
        <StatCard
          label="Avg. Rate / km"
          value={formatNaira(avgRate)}
          icon={TrendingUp}
          tone="info"
        />
        <StatCard
          label="Highest Rate / km"
          value={formatNaira(highest.rate)}
          icon={TrendingUp}
          tone="warning"
        />
        <StatCard
          label="Pending Approval"
          value={pending}
          icon={CheckCircle2}
          tone={pending > 0 ? "warning" : "success"}
        />
      </div>

      <SectionTabs tabs={TABS} active={tab} onChange={setTab} />

      <DataTable
        key={tab}
        columns={COLUMNS}
        data={data}
        rowKey="id"
        pageSize={10}
        searchKeys={["id", "shipper", "truck", "route"]}
        filterOptions={[
          {
            key: "status",
            label: "Status",
            options: ["Active", "Pending Approval"],
          },
          {
            key: "shipper",
            label: "Shipper",
            options: SHIPPERS.slice(0, 6).map((s) => s.name),
          },
          {
            key: "truck",
            label: "Truck",
            options: TRUCK_SIZES.map((t) => t.capacity),
          },
        ]}
        rowActions={[
          { label: "View rate card", icon: Eye, onClick: () => {} },
          { label: "Edit rate", icon: Pencil, onClick: () => {} },
          { label: "Approve", icon: ThumbsUp, onClick: () => {} },
          { label: "Revoke", icon: XCircle, danger: true, onClick: () => {} },
        ]}
        bulkActions={[{ label: "Approve selected", icon: ThumbsUp, onClick: () => {} }]}
      />
    </div>
  );
}
