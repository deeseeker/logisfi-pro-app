"use client";

import {
  Eye,
  Gauge,
  Landmark,
  Pencil,
  Plus,
  ShieldAlert,
  TrendingUp,
  Wallet,
} from "lucide-react";

import { AdminButton } from "@/components/admin/ui/admin-button";
import { AvatarInitials } from "@/components/admin/ui/avatar-initials";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { ProgressBar } from "@/components/admin/ui/progress-bar";
import { StatCard } from "@/components/admin/ui/stat-card";
import { StatusBadge, ToneBadge } from "@/components/admin/ui/status-badge";
import { INVESTORS } from "@/constants/admin/mock-data";
import type { AdminInvestor } from "@/types/admin";
import { formatDateShort, formatNairaCompact } from "@/utils/helpers";

const exposurePct = (r: AdminInvestor) =>
  Math.round((r.exposureUsed / r.exposureLimit) * 100);

const COLUMNS: DataTableColumn<AdminInvestor>[] = [
  {
    key: "name",
    header: "Investor",
    sortable: true,
    render: (r) => (
      <div className="flex items-center gap-2.5">
        <AvatarInitials name={r.name} size="sm" />
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-800 truncate">{r.name}</p>
          <p className="text-[11px] text-slate-400">{r.type}</p>
        </div>
      </div>
    ),
  },
  {
    key: "tier",
    header: "Tier",
    sortable: true,
    render: (r) => (
      <ToneBadge tone={r.tier === "Tier 1" ? "violet" : "neutral"} dot={false}>
        {r.tier}
      </ToneBadge>
    ),
  },
  {
    key: "wallet",
    header: "Wallet Balance",
    sortable: true,
    render: (r) => (
      <span className="tabular-nums font-figure font-semibold text-slate-800">
        {formatNairaCompact(r.wallet)}
      </span>
    ),
  },
  {
    key: "exposureUsed",
    header: "Exposure Utilisation",
    sortable: true,
    render: (r) => {
      const pct = exposurePct(r);
      return (
        <div className="w-40">
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="tabular-nums font-figure font-medium text-slate-700">
              {formatNairaCompact(r.exposureUsed)} / {formatNairaCompact(r.exposureLimit)}
            </span>
            <span
              className={
                pct >= 90
                  ? "text-red-600 font-semibold"
                  : pct >= 75
                    ? "text-amber-600 font-semibold"
                    : "text-slate-400"
              }
            >
              {pct}%
            </span>
          </div>
          <ProgressBar
            value={r.exposureUsed}
            max={r.exposureLimit}
            tone={pct >= 90 ? "red" : pct >= 75 ? "amber" : "emerald"}
          />
        </div>
      );
    },
  },
  {
    key: "interestRate",
    header: "Rate",
    sortable: true,
    render: (r) => (
      <span className="tabular-nums font-figure font-semibold text-slate-800">
        {r.interestRate.toFixed(1)}%
      </span>
    ),
  },
  {
    key: "activeFinancings",
    header: "Active Deals",
    sortable: true,
    render: (r) => (
      <span className="tabular-nums font-figure">{r.activeFinancings}</span>
    ),
  },
  {
    key: "since",
    header: "Partner Since",
    sortable: true,
    render: (r) => (
      <span className="text-xs text-slate-500 font-figure">
        {formatDateShort(r.since)}
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

export function InvestorsPage() {
  const totalWallet = INVESTORS.reduce((sum, i) => sum + i.wallet, 0);
  const totalLimit = INVESTORS.reduce((sum, i) => sum + i.exposureLimit, 0);
  const totalUsed = INVESTORS.reduce((sum, i) => sum + i.exposureUsed, 0);
  const avgRate = (
    INVESTORS.reduce((sum, i) => sum + i.interestRate, 0) / INVESTORS.length
  ).toFixed(2);
  const atRisk = INVESTORS.filter((i) => exposurePct(i) >= 90).length;

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Commercial", "Investor Management"]}
        eyebrow="Commercial"
        title="Investor Management"
        subtitle="Funding partners, their wallet liquidity, exposure headroom and blended cost of capital."
        action={
          <div className="flex items-center gap-2">
            <AdminButton variant="secondary" icon={Gauge} size="sm">
              Exposure report
            </AdminButton>
            <AdminButton variant="primary" icon={Plus} size="sm">
              Onboard investor
            </AdminButton>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Available Liquidity"
          value={formatNairaCompact(totalWallet)}
          icon={Wallet}
          tone="success"
        />
        <StatCard
          label="Exposure Deployed"
          value={formatNairaCompact(totalUsed)}
          icon={Gauge}
          tone="info"
          delta={Math.round((totalUsed / totalLimit) * 100)}
          deltaLabel="of total limit"
        />
        <StatCard label="Avg. Cost of Capital" value={`${avgRate}%`} icon={TrendingUp} />
        <StatCard
          label="Near Exposure Cap"
          value={atRisk}
          icon={ShieldAlert}
          tone={atRisk > 0 ? "error" : "success"}
        />
      </div>

      <DataTable
        title="Investor Register"
        subtitle={`${INVESTORS.length} funding partners · ${formatNairaCompact(totalLimit)} aggregate limit`}
        columns={COLUMNS}
        data={INVESTORS}
        rowKey="id"
        searchKeys={["id", "name", "type", "tier"]}
        filterOptions={[
          { key: "status", label: "Status", options: ["Active", "Exposure Warning"] },
          { key: "tier", label: "Tier", options: ["Tier 1", "Tier 2"] },
          { key: "type", label: "Type", options: ["Digital Bank", "Commercial Bank"] },
        ]}
        rowActions={[
          { label: "View investor", icon: Eye, onClick: () => {} },
          { label: "Adjust limit", icon: Pencil, onClick: () => {} },
          { label: "Fund wallet", icon: Wallet, onClick: () => {} },
        ]}
        headerAction={
          <AdminButton variant="secondary" icon={Landmark} size="sm">
            Reconcile wallets
          </AdminButton>
        }
      />
    </div>
  );
}
