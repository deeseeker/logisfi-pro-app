"use client";

import {
  Building2,
  CheckCircle2,
  Eye,
  Pencil,
  Plus,
  Ban,
  Star,
  TrendingUp,
  Upload,
} from "lucide-react";

import { AdminButton } from "@/components/admin/ui/admin-button";
import { AvatarInitials } from "@/components/admin/ui/avatar-initials";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { StatCard } from "@/components/admin/ui/stat-card";
import { StatusBadge, ToneBadge } from "@/components/admin/ui/status-badge";
import { SHIPPERS } from "@/constants/admin/mock-data";
import type { AdminShipper, Tone } from "@/types/admin";
import { formatNairaCompact } from "@/utils/helpers";

const TIER_TONE: Record<string, Tone> = {
  Platinum: "violet",
  Gold: "warning",
  Silver: "neutral",
};

const COLUMNS: DataTableColumn<AdminShipper>[] = [
  {
    key: "name",
    header: "Shipper",
    sortable: true,
    render: (r) => (
      <div className="flex items-center gap-2.5">
        <AvatarInitials name={r.name} size="sm" />
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-800 truncate">{r.name}</p>
          <p className="text-[11px] text-slate-400">{r.id}</p>
        </div>
      </div>
    ),
  },
  { key: "type", header: "Category", sortable: true },
  {
    key: "contact",
    header: "Primary Contact",
    render: (r) => (
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-700">{r.contact}</p>
        <p className="text-[11px] text-slate-400 truncate">{r.email}</p>
      </div>
    ),
  },
  {
    key: "city",
    header: "Location",
    sortable: true,
    render: (r) => (
      <span className="text-xs text-slate-600">
        {r.city}, {r.state}
      </span>
    ),
  },
  {
    key: "tier",
    header: "Tier",
    sortable: true,
    render: (r) => (
      <ToneBadge tone={TIER_TONE[r.tier] ?? "neutral"} dot={false}>
        {r.tier}
      </ToneBadge>
    ),
  },
  {
    key: "shipments",
    header: "Shipments",
    sortable: true,
    render: (r) => (
      <span className="tabular-nums font-figure font-medium">{r.shipments}</span>
    ),
  },
  {
    key: "volume",
    header: "Lifetime Volume",
    sortable: true,
    render: (r) => (
      <span className="tabular-nums font-figure font-semibold text-slate-800">
        {formatNairaCompact(r.volume)}
      </span>
    ),
  },
  {
    key: "rating",
    header: "Rating",
    sortable: true,
    render: (r) => (
      <span className="inline-flex items-center gap-1 tabular-nums font-figure">
        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
        {r.rating.toFixed(1)}
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

export function ShippersPage() {
  const active = SHIPPERS.filter((s) => s.status === "Active").length;
  const totalVolume = SHIPPERS.reduce((sum, s) => sum + s.volume, 0);
  const avgRating = SHIPPERS.reduce((sum, s) => sum + s.rating, 0) / SHIPPERS.length;

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Master Data", "Shippers"]}
        eyebrow="Master Data"
        title="Shippers"
        subtitle="Corporate consignors onboarded to The Haulage Hub, their commercial tier and lifetime freight volume."
        action={
          <div className="flex items-center gap-2">
            <AdminButton variant="secondary" icon={Upload} size="sm">
              Bulk import
            </AdminButton>
            <AdminButton variant="primary" icon={Plus} size="sm">
              Add shipper
            </AdminButton>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Shippers" value={SHIPPERS.length} icon={Building2} />
        <StatCard
          label="Active"
          value={active}
          icon={CheckCircle2}
          tone="success"
          deltaLabel="of total"
          delta={Math.round((active / SHIPPERS.length) * 100)}
        />
        <StatCard
          label="Lifetime Volume"
          value={formatNairaCompact(totalVolume)}
          icon={TrendingUp}
          tone="success"
        />
        <StatCard label="Avg. Rating" value={avgRating.toFixed(2)} icon={Star} />
      </div>

      <DataTable
        title="Shipper Register"
        subtitle={`${SHIPPERS.length} organisations`}
        columns={COLUMNS}
        data={SHIPPERS}
        rowKey="id"
        searchKeys={["name", "id", "contact", "email", "city", "state", "type"]}
        filterOptions={[
          { key: "status", label: "Status", options: ["Active", "Under Review", "Suspended"] },
          { key: "tier", label: "Tier", options: ["Platinum", "Gold", "Silver"] },
          { key: "state", label: "State", options: ["Lagos", "Rivers", "Oyo", "Kano", "Ogun"] },
        ]}
        rowActions={[
          { label: "View profile", icon: Eye, onClick: () => {} },
          { label: "Edit details", icon: Pencil, onClick: () => {} },
          { label: "Suspend", icon: Ban, danger: true, onClick: () => {} },
        ]}
      />
    </div>
  );
}
