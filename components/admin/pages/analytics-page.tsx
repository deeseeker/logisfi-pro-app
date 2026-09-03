"use client";

import { useMemo, useState } from "react";
import {
  BarChart3,
  Gauge,
  Landmark,
  Route as RouteIcon,
  TrendingUp,
  Truck,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";

import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { Panel, PanelHeader } from "@/components/admin/ui/panel";
import { StatCard } from "@/components/admin/ui/stat-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCarrierAnalytics,
  usePaymentCycleBuckets,
  useProductAnalytics,
  useRouteAnalytics,
  useShipperAnalytics,
} from "@/lib/api/hooks/analytics";
import type { DateRangePeriod } from "@/lib/api/types/enums";
import type {
  CarrierAnalyticsModel,
  ProductAnalyticsModel,
  RouteAnalyticsModel,
  ShipperAnalyticsModel,
} from "@/lib/api/types/models";
import { formatNairaCompact } from "@/utils/helpers";

const TOOLTIP_STYLE = {
  borderRadius: 10,
  border: "1px solid #e2e8f0",
  fontSize: 12,
} as const;

const PERIOD_OPTIONS: { value: DateRangePeriod; label: string }[] = [
  { value: "Last7Days", label: "Last 7 days" },
  { value: "Last30Days", label: "Last 30 days" },
  { value: "Last90Days", label: "Last 90 days" },
  { value: "CurrentYear", label: "Current year" },
];

const PERIOD_LABEL: Record<DateRangePeriod, string> = {
  Last7Days: "last 7 days",
  Last30Days: "last 30 days",
  Last90Days: "last 90 days",
  CurrentYear: "current year",
  Custom: "custom range",
};

const QUERY_OPTIONS = { retry: false } as const;

function tableSubtitle(
  query: { isPending: boolean; isError: boolean },
  count: number,
  noun: string,
): string {
  if (query.isPending) return "Loading…";
  if (query.isError) return "Unavailable — could not load analytics";
  return `${count} ${noun}`;
}

function buildFundedRepaidSeries(rows: ShipperAnalyticsModel[]) {
  const byMonth = new Map<
    string,
    { month: string; funded: number; repaid: number; sort: number }
  >();

  for (const row of rows) {
    for (const point of row.series ?? []) {
      const year = point.year ?? 0;
      const month = point.month ?? 0;
      const key = `${year}-${String(month).padStart(2, "0")}`;
      const label = new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString(
        "en-GB",
        { month: "short", year: "2-digit", timeZone: "UTC" },
      );
      const existing = byMonth.get(key) ?? {
        month: label,
        funded: 0,
        repaid: 0,
        sort: year * 100 + month,
      };
      existing.funded += point.totalFunded ?? 0;
      existing.repaid += point.totalRepaid ?? 0;
      byMonth.set(key, existing);
    }
  }

  return [...byMonth.values()].sort((a, b) => a.sort - b.sort);
}

const SHIPPER_COLUMNS: DataTableColumn<ShipperAnalyticsModel>[] = [
  {
    key: "shipperName",
    header: "Shipper",
    render: (row) => (
      <span className="text-xs font-semibold text-slate-800">
        {row.shipperName ?? "—"}
      </span>
    ),
  },
  {
    key: "invoiceCount",
    header: "Invoices",
    render: (row) => (
      <span className="tabular-nums font-figure">{row.invoiceCount ?? 0}</span>
    ),
  },
  {
    key: "totalFunded",
    header: "Funded",
    render: (row) => (
      <span className="tabular-nums font-figure">
        {formatNairaCompact(row.totalFunded ?? 0)}
      </span>
    ),
  },
  {
    key: "totalRepaid",
    header: "Repaid",
    render: (row) => (
      <span className="tabular-nums font-figure">
        {formatNairaCompact(row.totalRepaid ?? 0)}
      </span>
    ),
  },
  {
    key: "outstandingBalance",
    header: "Outstanding",
    render: (row) => (
      <span className="tabular-nums font-figure text-amber-700">
        {formatNairaCompact(row.outstandingBalance ?? 0)}
      </span>
    ),
  },
  {
    key: "averagePaymentCycleDays",
    header: "Pay cycle",
    render: (row) => (
      <span className="tabular-nums font-figure">
        {row.averagePaymentCycleDays != null
          ? `${row.averagePaymentCycleDays}d`
          : "—"}
      </span>
    ),
  },
  {
    key: "averageDaysOutstanding",
    header: "Days out",
    render: (row) => (
      <span className="tabular-nums font-figure">
        {row.averageDaysOutstanding != null
          ? `${row.averageDaysOutstanding}d`
          : "—"}
      </span>
    ),
  },
];

const ROUTE_COLUMNS: DataTableColumn<RouteAnalyticsModel>[] = [
  {
    key: "origin",
    header: "Corridor",
    render: (row) => (
      <span className="text-xs text-slate-700">
        {row.origin ?? "—"} → {row.destination ?? "—"}
      </span>
    ),
  },
  {
    key: "shipmentCount",
    header: "Shipments",
    render: (row) => (
      <span className="tabular-nums font-figure">{row.shipmentCount ?? 0}</span>
    ),
  },
  {
    key: "totalFunded",
    header: "Funded",
    render: (row) => (
      <span className="tabular-nums font-figure">
        {formatNairaCompact(row.totalFunded ?? 0)}
      </span>
    ),
  },
  {
    key: "grossMargin",
    header: "Margin",
    render: (row) => (
      <span className="tabular-nums font-figure">
        {formatNairaCompact(row.grossMargin ?? 0)}
      </span>
    ),
  },
  {
    key: "thhRevenue",
    header: "THH revenue",
    render: (row) => (
      <span className="tabular-nums font-figure">
        {formatNairaCompact(row.thhRevenue ?? 0)}
      </span>
    ),
  },
  {
    key: "defaultCount",
    header: "Defaults",
    render: (row) => (
      <span className="tabular-nums font-figure">{row.defaultCount ?? 0}</span>
    ),
  },
  {
    key: "concentration",
    header: "Concentration",
    render: (row) => (
      <span className="tabular-nums font-figure">
        {Math.round((row.concentration ?? 0) * 100) / 100}%
      </span>
    ),
  },
  {
    key: "riskScore",
    header: "Risk",
    render: (row) => (
      <span className="tabular-nums font-figure">{row.riskScore ?? 0}</span>
    ),
  },
];

const CARRIER_COLUMNS: DataTableColumn<CarrierAnalyticsModel>[] = [
  {
    key: "vendorName",
    header: "Carrier",
    render: (row) => (
      <span className="text-xs font-semibold text-slate-800">
        {row.vendorName ?? "—"}
      </span>
    ),
  },
  {
    key: "shipmentCount",
    header: "Shipments",
    render: (row) => (
      <span className="tabular-nums font-figure">{row.shipmentCount ?? 0}</span>
    ),
  },
  {
    key: "deliveredCount",
    header: "Delivered",
    render: (row) => (
      <span className="tabular-nums font-figure">{row.deliveredCount ?? 0}</span>
    ),
  },
  {
    key: "deliverySuccessRate",
    header: "Delivery rate",
    render: (row) => (
      <span className="tabular-nums font-figure">
        {Math.round((row.deliverySuccessRate ?? 0) * 100) / 100}%
      </span>
    ),
  },
  {
    key: "totalFunded",
    header: "Funded",
    render: (row) => (
      <span className="tabular-nums font-figure">
        {formatNairaCompact(row.totalFunded ?? 0)}
      </span>
    ),
  },
  {
    key: "fundingUtilization",
    header: "Utilization",
    render: (row) => (
      <span className="tabular-nums font-figure">
        {Math.round((row.fundingUtilization ?? 0) * 100) / 100}%
      </span>
    ),
  },
  {
    key: "averageRepaymentCycleDays",
    header: "Repay cycle",
    render: (row) => (
      <span className="tabular-nums font-figure">
        {row.averageRepaymentCycleDays != null
          ? `${row.averageRepaymentCycleDays}d`
          : "—"}
      </span>
    ),
  },
];

const PRODUCT_COLUMNS: DataTableColumn<ProductAnalyticsModel>[] = [
  {
    key: "productTypeName",
    header: "Product",
    render: (row) => (
      <span className="text-xs font-semibold text-slate-800">
        {row.productTypeName ?? "—"}
      </span>
    ),
  },
  {
    key: "shipmentCount",
    header: "Shipments",
    render: (row) => (
      <span className="tabular-nums font-figure">{row.shipmentCount ?? 0}</span>
    ),
  },
  {
    key: "totalFunded",
    header: "Funded",
    render: (row) => (
      <span className="tabular-nums font-figure">
        {formatNairaCompact(row.totalFunded ?? 0)}
      </span>
    ),
  },
  {
    key: "totalRecovered",
    header: "Recovered",
    render: (row) => (
      <span className="tabular-nums font-figure">
        {formatNairaCompact(row.totalRecovered ?? 0)}
      </span>
    ),
  },
  {
    key: "averagePaymentCycleDays",
    header: "Pay cycle",
    render: (row) => (
      <span className="tabular-nums font-figure">
        {row.averagePaymentCycleDays != null
          ? `${row.averagePaymentCycleDays}d`
          : "—"}
      </span>
    ),
  },
  {
    key: "recoveryRate",
    header: "Recovery",
    render: (row) => (
      <span className="tabular-nums font-figure">
        {Math.round((row.recoveryRate ?? 0) * 100) / 100}%
      </span>
    ),
  },
];

export function AnalyticsPage() {
  const [period, setPeriod] = useState<DateRangePeriod>("Last90Days");
  const params = useMemo(() => ({ period }), [period]);

  const shippers = useShipperAnalytics(params, QUERY_OPTIONS);
  const routes = useRouteAnalytics(params, QUERY_OPTIONS);
  const carriers = useCarrierAnalytics(params, QUERY_OPTIONS);
  const products = useProductAnalytics(params, QUERY_OPTIONS);
  const buckets = usePaymentCycleBuckets(params, QUERY_OPTIONS);

  const shipperRows = shippers.data?.responseData ?? [];
  const routeRows = routes.data?.responseData ?? [];
  const carrierRows = carriers.data?.responseData ?? [];
  const productRows = products.data?.responseData ?? [];
  const cycle = buckets.data?.responseData;

  const funded = shipperRows.reduce(
    (sum, row) => sum + (row.totalFunded ?? 0),
    0,
  );
  const repaid = shipperRows.reduce(
    (sum, row) => sum + (row.totalRepaid ?? 0),
    0,
  );
  const outstanding = shipperRows.reduce(
    (sum, row) => sum + (row.outstandingBalance ?? 0),
    0,
  );
  const fundedRepaidSeries = useMemo(
    () => buildFundedRepaidSeries(shipperRows),
    [shipperRows],
  );

  const ageing = [
    { bucket: "< 25 days", amount: cycle?.under25Days ?? 0 },
    { bucket: "25–35 days", amount: cycle?.between25And35Days ?? 0 },
    { bucket: "> 35 days", amount: cycle?.over35Days ?? 0 },
  ];

  const periodLabel = PERIOD_LABEL[period];

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Intelligence", "Analytics"]}
        eyebrow="Intelligence"
        title="Analytics"
        subtitle={`Shipper, route, carrier and product performance for the ${periodLabel}.`}
        action={
          <Select
            value={period}
            onValueChange={(value) => setPeriod(value as DateRangePeriod)}
          >
            <SelectTrigger className="h-9 w-[160px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PERIOD_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Funded volume"
          value={
            shippers.isPending
              ? "…"
              : shippers.isError
                ? "—"
                : formatNairaCompact(funded)
          }
          icon={TrendingUp}
          tone="success"
        />
        <StatCard
          label="Repaid"
          value={
            shippers.isPending
              ? "…"
              : shippers.isError
                ? "—"
                : formatNairaCompact(repaid)
          }
          icon={Landmark}
          tone="info"
        />
        <StatCard
          label="Outstanding"
          value={
            shippers.isPending
              ? "…"
              : shippers.isError
                ? "—"
                : formatNairaCompact(outstanding)
          }
          icon={Gauge}
        />
        <StatCard
          label="Routes tracked"
          value={
            routes.isPending ? "…" : routes.isError ? "—" : routeRows.length
          }
          icon={RouteIcon}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Panel>
          <PanelHeader
            icon={TrendingUp}
            title="Funded vs repaid"
            subtitle="Monthly trend from shipper analytics"
          />
          {shippers.isError ? (
            <p className="text-xs text-amber-700">
              Shipper analytics unavailable — trend chart cannot be loaded.
            </p>
          ) : shippers.isPending ? (
            <p className="text-xs text-slate-500">Loading trend…</p>
          ) : fundedRepaidSeries.length === 0 ? (
            <p className="text-xs text-slate-500">No monthly series data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={fundedRepaidSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value: number) => formatNairaCompact(value)}
                  width={56}
                />
                <RTooltip
                  contentStyle={TOOLTIP_STYLE}
                  formatter={(value: number) => formatNairaCompact(value)}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area
                  type="monotone"
                  dataKey="funded"
                  name="Funded"
                  stroke="#1e3a8a"
                  fill="#dbeafe"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="repaid"
                  name="Repaid"
                  stroke="#059669"
                  fill="#d1fae5"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </Panel>

        <Panel>
          <PanelHeader
            icon={BarChart3}
            title="Payment cycle buckets"
            subtitle="Paid invoices by collection speed"
          />
          {buckets.isError ? (
            <p className="text-xs text-amber-700">
              Payment cycle data unavailable.
            </p>
          ) : buckets.isPending ? (
            <p className="text-xs text-slate-500">Loading buckets…</p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={ageing} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#f1f5f9"
                />
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
                  width={80}
                />
                <RTooltip contentStyle={TOOLTIP_STYLE} />
                <Bar
                  dataKey="amount"
                  name="Invoices"
                  fill="#1e3a8a"
                  radius={[0, 4, 4, 0]}
                  barSize={16}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Panel>
      </div>

      <DataTable
        title="Shipper analytics"
        subtitle={tableSubtitle(shippers, shipperRows.length, "shippers")}
        columns={SHIPPER_COLUMNS}
        data={shippers.isError ? [] : shipperRows}
        rowKey="shipperId"
        searchKeys={["shipperName"]}
      />
      <DataTable
        title="Route analytics"
        subtitle={tableSubtitle(routes, routeRows.length, "routes")}
        columns={ROUTE_COLUMNS}
        data={routes.isError ? [] : routeRows}
        rowKey="routeId"
        searchKeys={["origin", "destination"]}
      />
      <DataTable
        title="Carrier analytics"
        subtitle={tableSubtitle(carriers, carrierRows.length, "carriers")}
        columns={CARRIER_COLUMNS}
        data={carriers.isError ? [] : carrierRows}
        rowKey="vendorId"
        searchKeys={["vendorName"]}
      />
      <DataTable
        title="Product analytics"
        subtitle={tableSubtitle(products, productRows.length, "products")}
        columns={PRODUCT_COLUMNS}
        data={products.isError ? [] : productRows}
        rowKey="productTypeId"
        searchKeys={["productTypeName"]}
      />
    </div>
  );
}
