"use client";

import {
  Eye,
  Gauge,
  Pencil,
  Plus,
  ShieldCheck,
  Star,
  Truck,
  Ban,
  Upload,
} from "lucide-react";

import { AdminButton } from "@/components/admin/ui/admin-button";
import { AvatarInitials } from "@/components/admin/ui/avatar-initials";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { ProgressBar } from "@/components/admin/ui/progress-bar";
import { StatCard } from "@/components/admin/ui/stat-card";
import { StatusBadge } from "@/components/admin/ui/status-badge";
import { CARRIERS } from "@/constants/admin/mock-data";
import type { AdminCarrier } from "@/types/admin";
import { formatDateShort } from "@/utils/helpers";

const COLUMNS: DataTableColumn<AdminCarrier>[] = [
  {
    key: "name",
    header: "Carrier",
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
  {
    key: "contact",
    header: "Contact",
    render: (r) => (
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-700">{r.contact}</p>
        <p className="text-[11px] text-slate-400">{r.phone}</p>
      </div>
    ),
  },
  { key: "city", header: "Base", sortable: true },
  {
    key: "fleet",
    header: "Fleet Utilisation",
    sortable: true,
    render: (r) => (
      <div className="w-32">
        <div className="flex items-center justify-between text-[11px] mb-1">
          <span className="tabular-nums font-figure font-medium text-slate-700">
            {r.activeTrucks}/{r.fleet}
          </span>
          <span className="text-slate-400">
            {Math.round((r.activeTrucks / r.fleet) * 100)}%
          </span>
        </div>
        <ProgressBar value={r.activeTrucks} max={r.fleet} />
      </div>
    ),
  },
  {
    key: "onTime",
    header: "On-Time",
    sortable: true,
    render: (r) => (
      <span
        className={
          r.onTime >= 90
            ? "text-emerald-700 font-semibold tabular-nums font-figure"
            : "text-amber-700 font-semibold tabular-nums font-figure"
        }
      >
        {r.onTime}%
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
    key: "insurance",
    header: "Insurance",
    sortable: true,
    render: (r) => (
      <div className="min-w-0">
        <StatusBadge status={r.insurance} />
        <p className="text-[11px] text-slate-400 mt-1">
          exp. {formatDateShort(r.insuranceExpiry)}
        </p>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (r) => <StatusBadge status={r.status} />,
  },
];

export function CarriersPage() {
  const totalFleet = CARRIERS.reduce((sum, c) => sum + c.fleet, 0);
  const activeTrucks = CARRIERS.reduce((sum, c) => sum + c.activeTrucks, 0);
  const avgOnTime = Math.round(
    CARRIERS.reduce((sum, c) => sum + c.onTime, 0) / CARRIERS.length
  );
  const expiring = CARRIERS.filter((c) => c.insurance !== "Valid").length;

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Master Data", "Carriers"]}
        eyebrow="Master Data"
        title="Carriers"
        subtitle="Haulage partners, fleet capacity, delivery reliability and insurance standing."
        action={
          <div className="flex items-center gap-2">
            <AdminButton variant="secondary" icon={Upload} size="sm">
              Bulk import
            </AdminButton>
            <AdminButton variant="primary" icon={Plus} size="sm">
              Add carrier
            </AdminButton>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Carriers" value={CARRIERS.length} icon={Truck} />
        <StatCard
          label="Avg. On-Time Rate"
          value={`${avgOnTime}%`}
          icon={Gauge}
          tone={avgOnTime >= 90 ? "success" : "warning"}
        />
        <StatCard
          label="Trucks In Service"
          value={activeTrucks}
          icon={Truck}
          tone="info"
          delta={Math.round((activeTrucks / totalFleet) * 100)}
          deltaLabel={`of ${totalFleet} fleet`}
        />
        <StatCard
          label="Insurance Attention"
          value={expiring}
          icon={ShieldCheck}
          tone={expiring > 0 ? "warning" : "success"}
        />
      </div>

      <DataTable
        title="Carrier Register"
        subtitle={`${CARRIERS.length} haulage partners`}
        columns={COLUMNS}
        data={CARRIERS}
        rowKey="id"
        searchKeys={["name", "id", "contact", "phone", "city"]}
        filterOptions={[
          { key: "status", label: "Status", options: ["Active", "Under Review", "Suspended"] },
          { key: "insurance", label: "Insurance", options: ["Valid", "Expiring"] },
          {
            key: "city",
            label: "Base",
            options: ["Lagos", "Ibadan", "Kano", "Onitsha", "Kaduna", "Port Harcourt"],
          },
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
