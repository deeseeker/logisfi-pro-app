"use client";

import Link from "next/link";
import {
  Building2,
  CircleDollarSign,
  Gauge,
  Package,
  Receipt,
  RefreshCw,
  Send,
  Truck,
  Wallet,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AdminButton } from "@/components/admin/ui/admin-button";
import { PageHeader } from "@/components/admin/ui/page-header";
import { Panel, PanelHeader } from "@/components/admin/ui/panel";
import { StatCard } from "@/components/admin/ui/stat-card";
import { useAdminSummary } from "@/lib/api/hooks/dashboard";
import { useCollectionsDashboard } from "@/lib/api/hooks/collections";
import { useFinancingRequests } from "@/lib/api/hooks/financing";
import { useShipments } from "@/lib/api/hooks/shipments";
import { formatNairaCompact } from "@/utils/helpers";

const TOOLTIP_STYLE = {
  borderRadius: 10,
  border: "1px solid #e2e8f0",
  fontSize: 12,
} as const;

export function AdminDashboard() {
  const summary = useAdminSummary({ period: "Last30Days" });
  const collections = useCollectionsDashboard();
  const financing = useFinancingRequests({ PageSize: 20, Status: "Pending" });
  const shipments = useShipments({ PageSize: 20, ShipmentStatus: "InTransit" });
  const data = summary.data?.responseData;
  const collect = collections.data?.responseData;
  const pendingRequests = financing.data?.responseData ?? [];
  const inTransit = shipments.data?.responseData ?? [];
  const exposure = data?.investorExposure ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Executive Command Centre"
        title="Operations pulse"
        subtitle="Live admin summary, collections and in-transit shipments."
        action={
          <AdminButton
            variant="primary"
            icon={RefreshCw}
            size="sm"
            onClick={() => {
              void summary.refetch();
              void collections.refetch();
            }}
          >
            Refresh
          </AdminButton>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Loan in use"
          value={data?.loanAmountInUse ?? "—"}
          icon={CircleDollarSign}
          tone="success"
        />
        <StatCard
          label="Loan available"
          value={data?.loanAmountAvailable ?? "—"}
          icon={Wallet}
          tone="info"
        />
        <StatCard
          label="Collected"
          value={formatNairaCompact(collect?.totalCollected ?? data?.totalCollected ?? 0)}
          icon={Receipt}
          tone="success"
        />
        <StatCard
          label="Outstanding"
          value={formatNairaCompact(collect?.outstandingBalance ?? 0)}
          icon={Gauge}
          tone="warning"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Active investors"
          value={data?.totalActiveInvestors ?? 0}
          icon={Building2}
        />
        <StatCard
          label="Active carriers"
          value={data?.activeCarriers ?? 0}
          icon={Truck}
        />
        <StatCard
          label="Active invoices"
          value={data?.activeInvoices ?? 0}
          icon={Receipt}
        />
        <StatCard
          label="In transit"
          value={inTransit.length}
          icon={Package}
          tone="info"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Panel className="xl:col-span-2">
          <PanelHeader
            icon={Gauge}
            title="Investor exposure"
            subtitle="Outstanding vs financed by organization"
          />
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={exposure} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis
                type="category"
                dataKey="investorOrganizationName"
                tick={{ fontSize: 10, fill: "#475569" }}
                axisLine={false}
                tickLine={false}
                width={90}
              />
              <RTooltip contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="totalFinanced" name="Financed" fill="#e2e8f0" radius={[0, 4, 4, 0]} barSize={10} />
              <Bar dataKey="outstandingExposure" name="Outstanding" fill="#1e3a8a" radius={[0, 4, 4, 0]} barSize={10} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel>
          <PanelHeader
            icon={Send}
            title="Pending financing"
            subtitle={`${pendingRequests.length} awaiting review`}
            action={
              <Link href="/admin/payment-requests" className="text-xs text-blue-800">
                Open
              </Link>
            }
          />
          <div className="space-y-2">
            {pendingRequests.slice(0, 6).map((row) => (
              <div key={row.id} className="rounded-lg border border-slate-100 p-3">
                <p className="text-xs font-semibold text-slate-800 font-figure">
                  {row.requestNumber ?? row.id}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {row.investorOrganizationName ?? "—"} ·{" "}
                  {formatNairaCompact(row.amount ?? 0)}
                </p>
              </div>
            ))}
            {pendingRequests.length === 0 && (
              <p className="text-xs text-slate-400">No pending requests.</p>
            )}
          </div>
        </Panel>
      </div>
    </div>
  );
}
