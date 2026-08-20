"use client";

import {
  BarChart3,
  CalendarDays,
  CircleDollarSign,
  Download,
  Gauge,
  Landmark,
  PieChart as PieIcon,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AdminButton } from "@/components/admin/ui/admin-button";
import { PageHeader } from "@/components/admin/ui/page-header";
import { Panel, PanelHeader } from "@/components/admin/ui/panel";
import { StatCard } from "@/components/admin/ui/stat-card";
import { ToneBadge } from "@/components/admin/ui/status-badge";
import {
  AGEING,
  COLLECTIONS_TREND,
  EXPOSURE_BY_INVESTOR,
  PIE_COLORS,
  PORTFOLIO_MIX,
  REVENUE_TREND,
} from "@/constants/admin/mock-data";

const TOOLTIP_STYLE = {
  borderRadius: 10,
  border: "1px solid #e2e8f0",
  fontSize: 12,
} as const;

export function AnalyticsPage() {
  const totalFunded = REVENUE_TREND.reduce((sum, r) => sum + r.funded, 0);
  const totalRevenue = REVENUE_TREND.reduce((sum, r) => sum + r.revenue, 0);
  const totalDefaults = REVENUE_TREND.reduce((sum, r) => sum + r.defaults, 0);
  const defaultRate = ((totalDefaults / totalFunded) * 100).toFixed(2);
  const takeRate = ((totalRevenue / totalFunded) * 100).toFixed(2);

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Intelligence", "Analytics"]}
        eyebrow="Intelligence"
        title="Analytics"
        subtitle="Portfolio performance across financing volume, revenue take rate, concentration risk and receivables health."
        action={
          <div className="flex items-center gap-2">
            <AdminButton variant="secondary" icon={CalendarDays} size="sm">
              Last 6 months
            </AdminButton>
            <AdminButton variant="primary" icon={Download} size="sm">
              Export deck
            </AdminButton>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Funded Volume (6M)"
          value={`₦${totalFunded.toLocaleString()}M`}
          icon={CircleDollarSign}
          tone="success"
          delta={18.6}
        />
        <StatCard
          label="Revenue (6M)"
          value={`₦${totalRevenue}M`}
          icon={TrendingUp}
          tone="success"
          delta={16.7}
        />
        <StatCard
          label="Take Rate"
          value={`${takeRate}%`}
          icon={Gauge}
          tone="info"
          deltaLabel="revenue / funded"
        />
        <StatCard
          label="Default Rate"
          value={`${defaultRate}%`}
          icon={ShieldAlert}
          tone="warning"
          delta={-0.4}
        />
      </div>

      <Panel>
        <PanelHeader
          icon={TrendingUp}
          title="Financing Volume vs. Revenue"
          subtitle="Funded volume and platform revenue, last 6 months (₦M)"
          action={
            <ToneBadge tone="success" dot={false}>
              +18.6% MoM
            </ToneBadge>
          }
        />
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={REVENUE_TREND} margin={{ left: -18, top: 6 }}>
            <defs>
              <linearGradient id="afund" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e3a8a" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#1e3a8a" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="arev" x1="0" y1="0" x2="0" y2="1">
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
              fill="url(#afund)"
            />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Revenue (₦M)"
              stroke="#059669"
              strokeWidth={2}
              fill="url(#arev)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Panel>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Panel>
          <PanelHeader
            icon={PieIcon}
            title="Portfolio Concentration"
            subtitle="Share of funded volume by sector"
          />
          <ResponsiveContainer width="100%" height={210}>
            <PieChart>
              <Pie
                data={PORTFOLIO_MIX}
                dataKey="value"
                nameKey="name"
                innerRadius={52}
                outerRadius={80}
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
                {p.name}{" "}
                <span className="ml-auto font-semibold font-figure">{p.value}%</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHeader
            icon={Landmark}
            title="Investor Concentration"
            subtitle="Exposure used vs. limit (₦M)"
          />
          <ResponsiveContainer width="100%" height={280}>
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
            icon={ShieldAlert}
            title="Credit Losses"
            subtitle="Defaults by month (₦M)"
          />
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={REVENUE_TREND} margin={{ left: -18, top: 6 }}>
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
              <Bar
                dataKey="defaults"
                name="Defaults (₦M)"
                fill="#dc2626"
                radius={[4, 4, 0, 0]}
                barSize={22}
              />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Panel className="xl:col-span-2">
          <PanelHeader
            icon={BarChart3}
            title="Collections Performance"
            subtitle="Collected vs. outstanding, last 6 months (₦M)"
          />
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={COLLECTIONS_TREND} margin={{ left: -18, top: 6 }}>
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
              <Line
                type="monotone"
                dataKey="collected"
                name="Collected (₦M)"
                stroke="#059669"
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="outstanding"
                name="Outstanding (₦M)"
                stroke="#d97706"
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Panel>

        <Panel>
          <PanelHeader
            icon={CalendarDays}
            title="Receivables Ageing"
            subtitle="Outstanding by age (₦M)"
          />
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={AGEING} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis
                type="number"
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="bucket"
                tick={{ fontSize: 10, fill: "#475569" }}
                axisLine={false}
                tickLine={false}
                width={72}
              />
              <RTooltip contentStyle={TOOLTIP_STYLE} />
              <Bar
                dataKey="amount"
                name="Outstanding (₦M)"
                fill="#1e3a8a"
                radius={[0, 4, 4, 0]}
                barSize={16}
              />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>
    </div>
  );
}
