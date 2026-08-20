"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Building2,
  CalendarDays,
  CircleDollarSign,
  ClipboardList,
  Gauge,
  Landmark,
  Package,
  Receipt,
  RefreshCw,
  Send,
  ShieldAlert,
  TrendingUp,
  Truck,
  Wallet,
} from "lucide-react";
import {
  Area,
  AreaChart,
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

import { ActivityIcon } from "@/components/admin/ui/activity-icon";
import { AdminButton } from "@/components/admin/ui/admin-button";
import { AvatarInitials } from "@/components/admin/ui/avatar-initials";
import { PageHeader } from "@/components/admin/ui/page-header";
import { Panel, PanelHeader } from "@/components/admin/ui/panel";
import { StatCard } from "@/components/admin/ui/stat-card";
import { StatusBadge, ToneBadge } from "@/components/admin/ui/status-badge";
import {
  ACTIVITY_FEED,
  ALERTS,
  EXPOSURE_BY_INVESTOR,
  PAYMENT_REQUESTS,
  PIE_COLORS,
  PORTFOLIO_MIX,
  REVENUE_TREND,
} from "@/constants/admin/mock-data";
import { cn } from "@/lib/utils";
import { formatNairaCompact } from "@/utils/helpers";

const TOOLTIP_STYLE = {
  borderRadius: 10,
  border: "1px solid #e2e8f0",
  fontSize: 12,
} as const;

/** Deterministic sparkline series — no randomness, so SSR and CSR agree. */
const spark = (base: number) =>
  Array.from({ length: 12 }, (_, i) => ({
    v: base + Math.sin(i / 2) * base * 0.15 + i * base * 0.02,
  }));

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Executive Command Centre"
        title="Good afternoon, Chiamaka"
        subtitle="Here is the operational and financial pulse of The Haulage Hub as of today, 2:14 PM WAT."
        action={
          <div className="flex items-center gap-2">
            <AdminButton variant="secondary" icon={CalendarDays} size="sm">
              Last 30 days
            </AdminButton>
            <AdminButton variant="primary" icon={RefreshCw} size="sm">
              Refresh
            </AdminButton>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Total Funded (MTD)"
          value="₦452.4M"
          delta={12.4}
          icon={CircleDollarSign}
          tone="success"
          sparkline={spark(40)}
        />
        <StatCard
          label="Active Exposure"
          value="₦3.01B"
          delta={4.1}
          icon={Gauge}
          tone="info"
          sparkline={spark(30)}
        />
        <StatCard
          label="Outstanding Receivables"
          value="₦186.2M"
          delta={-6.3}
          icon={Receipt}
          tone="warning"
          sparkline={spark(25)}
        />
        <StatCard
          label="Portfolio Yield"
          value="3.14%"
          delta={0.6}
          icon={TrendingUp}
          tone="success"
          sparkline={spark(20)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Active Shippers" value="238" delta={3.2} icon={Building2} />
        <StatCard label="Active Carriers" value="94" delta={1.1} icon={Truck} />
        <StatCard label="Shipments In Transit" value="41" delta={8.9} icon={Package} />
        <StatCard
          label="Fraud Flags (Open)"
          value="2"
          delta={-33.3}
          icon={ShieldAlert}
          tone="error"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Panel className="xl:col-span-2">
          <PanelHeader
            icon={TrendingUp}
            title="Financing & Revenue Trend"
            subtitle="Funded volume vs. THH revenue, last 6 months (₦M)"
            action={
              <ToneBadge tone="success" dot={false}>
                +18.6% MoM
              </ToneBadge>
            }
          />
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={REVENUE_TREND} margin={{ left: -18, top: 6 }}>
              <defs>
                <linearGradient id="gfund" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1e3a8a" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#1e3a8a" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="grev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#059669" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="m"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <RTooltip contentStyle={TOOLTIP_STYLE} />
              <Area
                type="monotone"
                dataKey="funded"
                name="Funded (₦M)"
                stroke="#1e3a8a"
                strokeWidth={2}
                fill="url(#gfund)"
              />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue (₦M)"
                stroke="#059669"
                strokeWidth={2}
                fill="url(#grev)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        <Panel>
          <PanelHeader
            icon={ShieldAlert}
            title="Live Alerts"
            subtitle="Requires attention"
          />
          <div className="space-y-2.5">
            {ALERTS.map((a) => (
              <div
                key={a.title}
                className={cn(
                  "rounded-lg p-3 border flex items-start gap-2.5",
                  a.level === "critical"
                    ? "bg-red-50/70 border-red-100"
                    : "bg-amber-50/70 border-amber-100"
                )}
              >
                <a.icon
                  className={cn(
                    "w-4 h-4 mt-0.5 shrink-0",
                    a.level === "critical" ? "text-red-600" : "text-amber-600"
                  )}
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-800">{a.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{a.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/admin/audit"
            className="block w-full mt-3 text-xs font-semibold text-blue-800 hover:underline text-center"
          >
            View all alerts in Audit Centre
          </Link>
        </Panel>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Panel>
          <PanelHeader
            icon={ClipboardList}
            title="Portfolio Mix"
            subtitle="By product category"
          />
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={PORTFOLIO_MIX}
                dataKey="value"
                nameKey="name"
                innerRadius={52}
                outerRadius={78}
                paddingAngle={2}
              >
                {PORTFOLIO_MIX.map((e, i) => (
                  <Cell key={e.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <RTooltip contentStyle={TOOLTIP_STYLE} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {PORTFOLIO_MIX.map((p, i) => (
              <div
                key={p.name}
                className="flex items-center gap-1.5 text-[11px] text-slate-600"
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                />
                {p.name} <span className="ml-auto font-semibold">{p.value}%</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHeader
            icon={Landmark}
            title="Investor Exposure"
            subtitle="Used vs. limit (₦M)"
          />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={EXPOSURE_BY_INVESTOR} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis
                type="number"
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 11, fill: "#475569" }}
                axisLine={false}
                tickLine={false}
                width={70}
              />
              <RTooltip contentStyle={TOOLTIP_STYLE} />
              <Bar
                dataKey="limit"
                fill="#e2e8f0"
                radius={[0, 4, 4, 0]}
                barSize={10}
                name="Limit"
              />
              <Bar
                dataKey="used"
                fill="#1e3a8a"
                radius={[0, 4, 4, 0]}
                barSize={10}
                name="Used"
              />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel>
          <PanelHeader
            icon={Activity}
            title="Activity Feed"
            subtitle="Real-time system events"
          />
          <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
            {ACTIVITY_FEED.map((a, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <ActivityIcon tone={a.tone} icon={a.icon} />
                <div className="min-w-0">
                  <p className="text-xs text-slate-700 leading-relaxed">{a.text}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Panel className="xl:col-span-2" padded={false}>
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <PanelHeader
              className="mb-0"
              icon={Send}
              title="Recent Financing Requests"
              subtitle="Latest disbursement activity"
            />
            <Link
              href="/admin/payment-requests"
              className="h-8 px-3 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 flex items-center gap-1 shrink-0"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {PAYMENT_REQUESTS.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50/70"
              >
                <AvatarInitials name={p.shipper} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-slate-800 truncate">
                    {p.shipper}{" "}
                    <span className="text-slate-400 font-normal">· {p.waybill}</span>
                  </p>
                  <p className="text-[11px] text-slate-400">via {p.investor}</p>
                </div>
                <span className="text-xs font-semibold tabular-nums text-slate-700 font-figure">
                  {formatNairaCompact(p.requested)}
                </span>
                <StatusBadge status={p.status} className="py-0.5" />
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHeader icon={Wallet} title="Collection Status" subtitle="This month" />
          <div className="relative flex items-center justify-center py-2">
            <ResponsiveContainer width="100%" height={150}>
              <RadialBarChart
                innerRadius="65%"
                outerRadius="100%"
                data={[{ name: "collected", value: 78, fill: "#059669" }]}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar background dataKey="value" cornerRadius={20} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-2xl font-bold text-slate-900 font-figure">78%</p>
              <p className="text-[11px] text-slate-400">Collected on time</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-center mt-4">
            <div>
              <p className="text-sm font-semibold text-slate-800 font-figure">₦302.4M</p>
              <p className="text-[10px] text-slate-400 uppercase">Collected</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-600 font-figure">₦55.1M</p>
              <p className="text-[10px] text-slate-400 uppercase">Outstanding</p>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
