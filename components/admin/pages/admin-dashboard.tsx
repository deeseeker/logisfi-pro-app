"use client";

import * as React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CircleDollarSign,
  Clock,
  Gauge,
  Landmark,
  Package,
  Receipt,
  RefreshCw,
  Send,
  ShieldAlert,
  TrendingUp,
  Truck,
  Users,
  Wallet,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AdminButton } from "@/components/admin/ui/admin-button";
import { AdminSelect } from "@/components/admin/ui/form-field";
import { AvatarInitials } from "@/components/admin/ui/avatar-initials";
import { PageHeader } from "@/components/admin/ui/page-header";
import { Panel, PanelHeader } from "@/components/admin/ui/panel";
import { StatCard } from "@/components/admin/ui/stat-card";
import { ToneBadge } from "@/components/admin/ui/status-badge";
import { useAdminSummary } from "@/lib/api/hooks/dashboard";
import type { InvestorExposureSummaryModel } from "@/lib/api/types/models";
import { DateRangePeriod } from "@/lib/api/types/enums";
import { cn } from "@/lib/utils";
import {
  displayAdminMoney,
  formatNairaCompact,
  parseCompactNaira,
} from "@/utils/helpers";

const TOOLTIP_STYLE = {
  borderRadius: 10,
  border: "1px solid #e2e8f0",
  fontSize: 12,
} as const;

const PIE_COLORS = ["#1e3a8a", "#059669"];

const PERIOD_OPTIONS = [
  DateRangePeriod.Last7Days,
  DateRangePeriod.Last30Days,
  DateRangePeriod.Last90Days,
  DateRangePeriod.CurrentYear,
] as const;

function periodLabel(period: DateRangePeriod): string {
  switch (period) {
    case "Last7Days":
      return "Last 7 days";
    case "Last30Days":
      return "Last 30 days";
    case "Last90Days":
      return "Last 90 days";
    case "CurrentYear":
      return "This year";
    case "Custom":
      return "Custom range";
    default: {
      const _never: never = period;
      return _never;
    }
  }
}

function asCount(value: string | number | null | undefined): number {
  const amount = parseCompactNaira(value);
  return Number.isFinite(amount) ? Math.round(amount) : 0;
}

function shortLabel(name: string | null | undefined, max = 14): string {
  const raw = name?.trim() || "Investor";
  return raw.length > max ? `${raw.slice(0, max)}…` : raw;
}

function statDisplay(
  pending: boolean,
  value: number,
  format: "money" | "count" = "count"
): React.ReactNode {
  if (pending) {
    return "—";
  }
  if (format === "money") {
    return formatNairaCompact(value);
  }
  return value.toLocaleString("en-NG");
}

function exposureRows(items: InvestorExposureSummaryModel[]) {
  return items
    .map((item) => ({
      id: item.investorOrganizationId ?? item.investorOrganizationName ?? "investor",
      fullName: item.investorOrganizationName?.trim() || "Investor",
      name: shortLabel(item.investorOrganizationName),
      outstanding: item.outstandingExposure ?? 0,
      financed: item.totalFinanced ?? 0,
    }))
    .sort((a, b) => b.outstanding - a.outstanding);
}

type DashboardAlert = {
  title: string;
  detail: string;
  level: "critical" | "warning";
};

export function AdminDashboard() {
  const [period, setPeriod] = React.useState<DateRangePeriod>(
    DateRangePeriod.Last30Days
  );
  const range = React.useMemo(() => ({ period }), [period]);
  const summaryQuery = useAdminSummary(range);
  const summary = summaryQuery.data?.responseData;
  const pending = summaryQuery.isPending;

  const loanInUse = parseCompactNaira(summary?.loanAmountInUse);
  const availableBook = parseCompactNaira(summary?.loanAmountAvailable);
  const collected = summary?.totalCollected ?? 0;
  const thhRevenue = summary?.thhRevenue ?? 0;
  const investorRevenue = summary?.investorRevenue ?? 0;
  const book = loanInUse + availableBook;
  const utilization = book > 0 ? Math.round((loanInUse / book) * 100) : 0;

  const exposure = React.useMemo(
    () => exposureRows(summary?.investorExposure ?? []),
    [summary?.investorExposure]
  );
  const revenueMix = [
    { name: "THH revenue", value: thhRevenue },
    { name: "Investor revenue", value: investorRevenue },
  ].filter((item) => item.value > 0);
  const requestMix = [
    { name: "Approved", value: summary?.approvedPaymentRequests ?? 0 },
    { name: "Rejected", value: summary?.rejectedPaymentRequests ?? 0 },
  ];

  const alerts = React.useMemo<DashboardAlert[]>(() => {
    const items: DashboardAlert[] = [];
    const pendingWithdrawals = asCount(summary?.pendingFundWithdrawals);
    const rejected = summary?.rejectedPaymentRequests ?? 0;
    const hotBook = exposure.find(
      (item) => item.financed > 0 && item.outstanding / item.financed >= 0.85
    );

    if (pendingWithdrawals > 0) {
      items.push({
        title: `${pendingWithdrawals} pending fund withdrawal${pendingWithdrawals === 1 ? "" : "s"}`,
        detail: "Investor withdrawals are waiting on review",
        level: "warning",
      });
    }
    if (rejected > 0) {
      items.push({
        title: `${rejected} rejected payment request${rejected === 1 ? "" : "s"}`,
        detail: "Review rejected financing requests in the commercial desk",
        level: "warning",
      });
    }
    if (hotBook) {
      items.push({
        title: "High investor utilization",
        detail: `${hotBook.fullName} has ${formatNairaCompact(hotBook.outstanding)} outstanding against ${formatNairaCompact(hotBook.financed)} financed`,
        level: "critical",
      });
    }

    return items;
  }, [exposure, summary?.pendingFundWithdrawals, summary?.rejectedPaymentRequests]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Executive Command Centre"
        title="Admin summary"
        subtitle={`Operational and financial pulse for ${periodLabel(period).toLowerCase()}.`}
        action={
          <div className="flex items-center gap-2">
            <AdminSelect
              aria-label="Reporting period"
              className="h-8 w-[150px] text-xs"
              value={period}
              onChange={(event) =>
                setPeriod(event.target.value as (typeof PERIOD_OPTIONS)[number])
              }
            >
              {PERIOD_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {periodLabel(option)}
                </option>
              ))}
            </AdminSelect>
            <AdminButton
              variant="primary"
              icon={RefreshCw}
              size="sm"
              onClick={() => void summaryQuery.refetch()}
              disabled={summaryQuery.isFetching}
            >
              {summaryQuery.isFetching ? "Refreshing…" : "Refresh"}
            </AdminButton>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Loan in use"
          value={pending ? "—" : displayAdminMoney(summary?.loanAmountInUse)}
          icon={CircleDollarSign}
          tone="info"
        />
        <StatCard
          label="Loan available"
          value={pending ? "—" : displayAdminMoney(summary?.loanAmountAvailable)}
          icon={Gauge}
          tone="success"
        />
        <StatCard
          label="Total collected"
          value={statDisplay(pending, collected, "money")}
          icon={Receipt}
        />
        <StatCard
          label="THH revenue"
          value={statDisplay(pending, thhRevenue, "money")}
          icon={TrendingUp}
          tone="success"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Active investors"
          value={statDisplay(pending, summary?.totalActiveInvestors ?? asCount(summary?.totalInvestors))}
          icon={Users}
        />
        <StatCard
          label="Active shippers"
          value={statDisplay(pending, summary?.shippersWithShipmentsThisMonth ?? 0)}
          icon={Building2}
        />
        <StatCard
          label="Active carriers"
          value={statDisplay(pending, summary?.activeCarriers ?? 0)}
          icon={Truck}
        />
        <StatCard
          label="Total shipments"
          value={statDisplay(pending, asCount(summary?.totalShipments))}
          icon={Package}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Panel className="xl:col-span-2">
          <PanelHeader
            icon={Landmark}
            title="Investor exposure"
            subtitle="Outstanding vs financed from the admin summary"
          />
          {exposure.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={exposure.slice(0, 8)} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => formatNairaCompact(Number(value))}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#475569" }}
                  axisLine={false}
                  tickLine={false}
                  width={70}
                />
                <RTooltip
                  contentStyle={TOOLTIP_STYLE}
                  formatter={(value) => formatNairaCompact(Number(value ?? 0))}
                />
                <Bar
                  dataKey="financed"
                  fill="#e2e8f0"
                  radius={[0, 4, 4, 0]}
                  barSize={10}
                  name="Financed"
                />
                <Bar
                  dataKey="outstanding"
                  fill="#1e3a8a"
                  radius={[0, 4, 4, 0]}
                  barSize={10}
                  name="Outstanding"
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState
              loading={pending}
              message="No investor exposure in the admin summary."
            />
          )}
        </Panel>

        <Panel>
          <PanelHeader icon={ShieldAlert} title="Exceptions" subtitle="From admin summary only" />
          <div className="space-y-2.5">
            {alerts.length > 0 ? (
              alerts.map((alert) => (
                <div
                  key={alert.title}
                  className={cn(
                    "rounded-lg p-3 border flex items-start gap-2.5",
                    alert.level === "critical"
                      ? "bg-red-50/70 border-red-100"
                      : "bg-amber-50/70 border-amber-100"
                  )}
                >
                  {alert.level === "critical" ? (
                    <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0 text-red-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" />
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800">{alert.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{alert.detail}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-6 text-center">
                <Clock className="w-4 h-4 mx-auto text-slate-400 mb-2" />
                <p className="text-xs text-slate-500">
                  {pending ? "Checking exceptions…" : "No exceptions in the current summary."}
                </p>
              </div>
            )}
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Panel>
          <PanelHeader
            icon={TrendingUp}
            title="Revenue split"
            subtitle="THH vs investor revenue"
          />
          {revenueMix.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={revenueMix}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={52}
                    outerRadius={78}
                    paddingAngle={2}
                  >
                    {revenueMix.map((entry, index) => (
                      <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <RTooltip
                    contentStyle={TOOLTIP_STYLE}
                    formatter={(value) => formatNairaCompact(Number(value ?? 0))}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-1 gap-2 mt-2">
                {revenueMix.map((item, index) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-1.5 text-[11px] text-slate-600"
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: PIE_COLORS[index % PIE_COLORS.length] }}
                    />
                    {item.name}
                    <span className="ml-auto font-semibold font-figure">
                      {formatNairaCompact(item.value)}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <EmptyState loading={pending} message="No revenue reported for this period." />
          )}
        </Panel>

        <Panel>
          <PanelHeader
            icon={Send}
            title="Payment requests"
            subtitle="Approved vs rejected"
            action={
              <ToneBadge tone="neutral" dot={false}>
                {pending
                  ? "—"
                  : `${(summary?.approvedPaymentRequests ?? 0) + (summary?.rejectedPaymentRequests ?? 0)} total`}
              </ToneBadge>
            }
          />
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="rounded-lg bg-emerald-50 px-3 py-2.5">
              <p className="text-sm font-semibold text-emerald-800 font-figure">
                {statDisplay(pending, summary?.approvedPaymentRequests ?? 0)}
              </p>
              <p className="text-[10px] text-emerald-700/70 uppercase">Approved</p>
            </div>
            <div className="rounded-lg bg-red-50 px-3 py-2.5">
              <p className="text-sm font-semibold text-red-700 font-figure">
                {statDisplay(pending, summary?.rejectedPaymentRequests ?? 0)}
              </p>
              <p className="text-[10px] text-red-600/70 uppercase">Rejected</p>
            </div>
          </div>
          {requestMix.some((item) => item.value > 0) ? (
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={requestMix}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <RTooltip contentStyle={TOOLTIP_STYLE} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={28}>
                  <Cell fill="#059669" />
                  <Cell fill="#dc2626" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState loading={pending} message="No payment-request totals yet." />
          )}
        </Panel>

        <Panel>
          <PanelHeader icon={Wallet} title="Book utilization" subtitle="Loan in use vs available" />
          <div className="relative flex items-center justify-center py-2">
            <ResponsiveContainer width="100%" height={150}>
              <RadialBarChart
                innerRadius="65%"
                outerRadius="100%"
                data={[{ name: "used", value: utilization, fill: "#1e3a8a" }]}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar background dataKey="value" cornerRadius={20} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-2xl font-bold text-slate-900 font-figure">
                {pending ? "—" : `${utilization}%`}
              </p>
              <p className="text-[11px] text-slate-400">In use</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-center mt-4">
            <div>
              <p className="text-sm font-semibold text-slate-800 font-figure">
                {pending ? "—" : displayAdminMoney(summary?.loanAmountInUse)}
              </p>
              <p className="text-[10px] text-slate-400 uppercase">In use</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-700 font-figure">
                {pending ? "—" : displayAdminMoney(summary?.loanAmountAvailable)}
              </p>
              <p className="text-[10px] text-slate-400 uppercase">Available</p>
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Panel className="xl:col-span-2" padded={false}>
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <PanelHeader
              className="mb-0"
              icon={Landmark}
              title="Investor book"
              subtitle="Exposure rows from the admin summary"
            />
            <Link
              href="/admin/investors"
              className="h-8 px-3 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 flex items-center gap-1 shrink-0"
            >
              View investors <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {exposure.length > 0 ? (
              exposure.slice(0, 6).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50/70"
                >
                  <AvatarInitials name={item.fullName} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-800 truncate">
                      {item.fullName}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Financed {formatNairaCompact(item.financed)}
                    </p>
                  </div>
                  <span className="text-xs font-semibold tabular-nums text-slate-700 font-figure">
                    {formatNairaCompact(item.outstanding)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 px-5 py-8 text-center">
                {pending ? "Loading investors…" : "No investor exposure rows."}
              </p>
            )}
          </div>
        </Panel>

        <Panel>
          <PanelHeader icon={Receipt} title="Invoice desk" subtitle="Counts from the summary" />
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2.5">
              <span className="text-xs text-slate-500">Active invoices</span>
              <span className="text-sm font-semibold font-figure text-slate-800">
                {statDisplay(pending, summary?.activeInvoices ?? 0)}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2.5">
              <span className="text-xs text-slate-500">Paid this month</span>
              <span className="text-sm font-semibold font-figure text-slate-800">
                {statDisplay(pending, summary?.paidInvoicesThisMonth ?? 0)}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2.5">
              <span className="text-xs text-slate-500">Pending withdrawals</span>
              <span className="text-sm font-semibold font-figure text-slate-800">
                {statDisplay(pending, asCount(summary?.pendingFundWithdrawals))}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2.5">
              <span className="text-xs text-slate-500">Investor revenue</span>
              <span className="text-sm font-semibold font-figure text-slate-800">
                {statDisplay(pending, investorRevenue, "money")}
              </span>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function EmptyState({
  loading,
  message,
}: {
  loading: boolean;
  message: string;
}) {
  return (
    <div className="h-[220px] flex items-center justify-center">
      <p className="text-xs text-slate-400">{loading ? "Loading…" : message}</p>
    </div>
  );
}
