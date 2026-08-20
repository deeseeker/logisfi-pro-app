"use client";

import * as React from "react";
import {
  CheckCircle2,
  Eye,
  FileText,
  Package,
  Plus,
  Send,
  Truck,
  XCircle,
} from "lucide-react";

import { AdminButton } from "@/components/admin/ui/admin-button";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { SectionTabs } from "@/components/admin/ui/section-tabs";
import { StatCard } from "@/components/admin/ui/stat-card";
import { StatusBadge } from "@/components/admin/ui/status-badge";
import { ShipmentWizard } from "@/components/admin/pages/shipment-wizard";
import { SHIPMENTS } from "@/constants/admin/mock-data";
import type { AdminShipment } from "@/types/admin";
import { formatDateShort, formatNairaCompact } from "@/utils/helpers";

const IN_TRANSIT = ["Confirmed", "In Transit"];
const FINANCING = ["Financing Requested", "Funded"];
const CLOSED = ["Invoiced", "Collected", "Reconciled"];

const TABS = [
  { key: "all", label: "All Shipments", count: SHIPMENTS.length },
  {
    key: "transit",
    label: "In Transit",
    count: SHIPMENTS.filter((s) => IN_TRANSIT.includes(s.status)).length,
  },
  {
    key: "financing",
    label: "Financing",
    count: SHIPMENTS.filter((s) => FINANCING.includes(s.status)).length,
  },
  {
    key: "closed",
    label: "Closed",
    count: SHIPMENTS.filter((s) => CLOSED.includes(s.status)).length,
  },
];

const COLUMNS: DataTableColumn<AdminShipment>[] = [
  {
    key: "waybill",
    header: "Waybill / Shipment",
    sortable: true,
    render: (r) => (
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-800 font-figure">{r.waybill}</p>
        <p className="text-[11px] text-slate-400 font-figure">{r.id}</p>
      </div>
    ),
  },
  {
    key: "shipper",
    header: "Shipper",
    sortable: true,
    render: (r) => (
      <span className="text-xs font-medium text-slate-700">{r.shipper}</span>
    ),
  },
  {
    key: "route",
    header: "Route",
    sortable: true,
    render: (r) => (
      <div className="min-w-0">
        <p className="text-xs text-slate-700">{r.route}</p>
        <p className="text-[11px] text-slate-400 font-figure">
          {r.distance.toLocaleString()} km
        </p>
      </div>
    ),
  },
  {
    key: "carrier",
    header: "Carrier",
    sortable: true,
    render: (r) => <span className="text-xs text-slate-600">{r.carrier}</span>,
  },
  {
    key: "truck",
    header: "Truck",
    sortable: true,
    render: (r) => (
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-700 font-figure">{r.truck}</p>
        <p className="text-[11px] text-slate-400 font-figure">{r.plate}</p>
      </div>
    ),
  },
  {
    key: "value",
    header: "Freight Value",
    sortable: true,
    render: (r) => (
      <span className="tabular-nums font-figure font-semibold text-slate-800">
        {formatNairaCompact(r.value)}
      </span>
    ),
  },
  {
    key: "created",
    header: "Created",
    sortable: true,
    render: (r) => (
      <span className="text-xs text-slate-500 font-figure">
        {formatDateShort(r.created)}
      </span>
    ),
  },
  {
    key: "eta",
    header: "ETA",
    sortable: true,
    render: (r) => (
      <span className="text-xs text-slate-500 font-figure">
        {formatDateShort(r.eta)}
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

export function ShipmentsPage() {
  const [tab, setTab] = React.useState("all");
  const [wizardOpen, setWizardOpen] = React.useState(false);

  const data = React.useMemo(() => {
    if (tab === "transit") return SHIPMENTS.filter((s) => IN_TRANSIT.includes(s.status));
    if (tab === "financing") return SHIPMENTS.filter((s) => FINANCING.includes(s.status));
    if (tab === "closed") return SHIPMENTS.filter((s) => CLOSED.includes(s.status));
    return SHIPMENTS;
  }, [tab]);

  const inTransit = SHIPMENTS.filter((s) => IN_TRANSIT.includes(s.status)).length;
  const delivered = SHIPMENTS.filter((s) =>
    ["Delivered", "Waybill Confirmed"].includes(s.status)
  ).length;
  const totalValue = SHIPMENTS.reduce((sum, s) => sum + s.value, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Commercial", "Shipment Management"]}
        eyebrow="Commercial"
        title="Shipment Management"
        subtitle="Every consignment moving through the network, from draft booking to reconciled settlement."
        action={
          <div className="flex items-center gap-2">
            <AdminButton variant="secondary" icon={FileText} size="sm">
              Status flow
            </AdminButton>
            <AdminButton
              variant="primary"
              icon={Plus}
              size="sm"
              onClick={() => setWizardOpen(true)}
            >
              New shipment
            </AdminButton>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Shipments" value={SHIPMENTS.length} icon={Package} />
        <StatCard label="In Transit" value={inTransit} icon={Truck} tone="info" />
        <StatCard
          label="Awaiting Financing"
          value={delivered}
          icon={Send}
          tone="warning"
        />
        <StatCard
          label="Total Freight Value"
          value={formatNairaCompact(totalValue)}
          icon={CheckCircle2}
          tone="success"
        />
      </div>

      <SectionTabs tabs={TABS} active={tab} onChange={setTab} />

      <DataTable
        key={tab}
        columns={COLUMNS}
        data={data}
        rowKey="id"
        pageSize={10}
        searchKeys={["id", "waybill", "shipper", "carrier", "route", "driver", "plate"]}
        filterOptions={[
          {
            key: "status",
            label: "Status",
            options: [
              "Draft",
              "Submitted",
              "Confirmed",
              "In Transit",
              "Delivered",
              "Waybill Confirmed",
              "Financing Requested",
              "Funded",
              "Invoiced",
              "Collected",
            ],
          },
          {
            key: "truck",
            label: "Truck",
            options: ["10T", "20T", "30T", "40T", "45T"],
          },
        ]}
        rowActions={[
          { label: "View shipment", icon: Eye, onClick: () => {} },
          { label: "Confirm waybill", icon: CheckCircle2, onClick: () => {} },
          { label: "Request financing", icon: Send, onClick: () => {} },
          { label: "Cancel", icon: XCircle, danger: true, onClick: () => {} },
        ]}
        bulkActions={[
          { label: "Confirm waybills", icon: CheckCircle2, onClick: () => {} },
          { label: "Export selection", icon: FileText, onClick: () => {} },
        ]}
      />

      <ShipmentWizard open={wizardOpen} onClose={() => setWizardOpen(false)} />
    </div>
  );
}
