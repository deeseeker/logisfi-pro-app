"use client";

import * as React from "react";
import { CheckCircle2, FileText, Package, Receipt, Send, Truck } from "lucide-react";

import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import { AdminButton } from "@/components/admin/ui/admin-button";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { Drawer } from "@/components/admin/ui/drawer";
import { AdminInput, AdminSelect, Field } from "@/components/admin/ui/form-field";
import { PageHeader } from "@/components/admin/ui/page-header";
import { SectionTabs } from "@/components/admin/ui/section-tabs";
import { StatCard } from "@/components/admin/ui/stat-card";
import { StatusBadge } from "@/components/admin/ui/status-badge";
import { getApiErrorMessage } from "@/lib/api/errors";
import {
  useConfirmDelivery,
  useConfirmOffloading,
  useDelivery,
  useRequestFinalPayment,
} from "@/lib/api/hooks/deliveries";
import { useGenerateInvoiceFromSelection } from "@/lib/api/hooks/finances";
import { useShipment, useShipments, useUpdateShipment } from "@/lib/api/hooks/shipments";
import { useCreateWaybillConfirmation } from "@/lib/api/hooks/waybills";
import { ShipmentStatus } from "@/lib/api/types/enums";
import type { ShipmentModel } from "@/lib/api/types/models";
import { formatDateShort, formatNairaCompact } from "@/utils/helpers";

const COLUMNS: DataTableColumn<ShipmentModel>[] = [
  {
    key: "shipmentNumber",
    header: "Shipment",
    sortable: true,
    render: (row) => (
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-800 font-figure">
          {row.shipmentNumber ?? "—"}
        </p>
        <p className="text-[11px] text-slate-400 font-figure">{row.id}</p>
      </div>
    ),
  },
  {
    key: "origin",
    header: "Corridor",
    render: (row) => (
      <span className="text-xs text-slate-600">
        {row.origin ?? "—"} → {row.destination ?? "—"}
      </span>
    ),
  },
  {
    key: "shipper",
    header: "Shipper",
    render: (row) => (
      <span className="text-xs font-medium text-slate-700">
        {row.shipper?.name ?? "—"}
      </span>
    ),
  },
  {
    key: "vendor",
    header: "Carrier",
    render: (row) => (
      <span className="text-xs text-slate-600">{row.vendor?.name ?? "—"}</span>
    ),
  },
  {
    key: "shipperPrice",
    header: "Shipper value",
    render: (row) => (
      <span className="tabular-nums font-figure font-semibold text-slate-800">
        {formatNairaCompact(row.shipperPrice ?? 0)}
      </span>
    ),
  },
  {
    key: "shipmentStatus",
    header: "Status",
    sortable: true,
    render: (row) => <StatusBadge status={row.shipmentStatus ?? "—"} />,
  },
  {
    key: "mobilizationStatus",
    header: "Mobilization",
    render: (row) => <StatusBadge status={row.mobilizationStatus ?? "—"} />,
  },
  {
    key: "shipmentDate",
    header: "Date",
    render: (row) => (
      <span className="text-xs text-slate-500 font-figure">
        {row.shipmentDate ? formatDateShort(row.shipmentDate) : "—"}
      </span>
    ),
  },
];

export function ShipmentsPage() {
  const [tab, setTab] = React.useState("all");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const { data, isPending } = useShipments({ PageSize: 100 });
  const rows = data?.responseData ?? [];
  const confirmDelivery = useConfirmDelivery({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const confirmOffload = useConfirmOffloading({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const waybill = useCreateWaybillConfirmation({
    onSuccess: (response) =>
      showSuccessAlert(
        [response.responseMessage, response.responseData?.id]
          .filter(Boolean)
          .join(" · ")
      ),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const finalPayment = useRequestFinalPayment({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const invoiceFromSelection = useGenerateInvoiceFromSelection({
    onSuccess: (response) =>
      showSuccessAlert(response.responseMessage ?? "Invoice generated"),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });

  const filtered = React.useMemo(() => {
    if (tab === "transit") {
      return rows.filter((row) => row.shipmentStatus === "InTransit");
    }
    if (tab === "delivered") {
      return rows.filter((row) => row.shipmentStatus === "Delivered");
    }
    return rows;
  }, [rows, tab]);

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Commercial", "Shipment Management"]}
        eyebrow="Commercial"
        title="Shipment Management"
        subtitle="Live consignments with delivery confirmation, waybills and final payment."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Shipments" value={rows.length} icon={Package} />
        <StatCard
          label="In transit"
          value={
            rows.filter((row) => row.shipmentStatus === "InTransit").length
          }
          icon={Truck}
          tone="info"
        />
        <StatCard
          label="Delivered"
          value={
            rows.filter((row) => row.shipmentStatus === "Delivered").length
          }
          icon={CheckCircle2}
          tone="success"
        />
        <StatCard label="Loaded" value={isPending ? "…" : rows.length} icon={Package} />
      </div>

      <SectionTabs
        tabs={[
          { key: "all", label: "All", count: rows.length },
          {
            key: "transit",
            label: "In transit",
            count: rows.filter((row) => row.shipmentStatus === "InTransit")
              .length,
          },
          {
            key: "delivered",
            label: "Delivered",
            count: rows.filter((row) => row.shipmentStatus === "Delivered")
              .length,
          },
        ]}
        active={tab}
        onChange={setTab}
      />

      <DataTable
        key={tab}
        title="Shipments"
        subtitle={isPending ? "Loading…" : `${filtered.length} records`}
        columns={COLUMNS}
        data={filtered}
        rowKey="id"
        searchKeys={["shipmentNumber", "origin", "destination", "truckNumber"]}
        filterOptions={[
          {
            key: "shipmentStatus",
            label: "Status",
            options: Object.values(ShipmentStatus),
          },
        ]}
        onRowClick={(row) => row.id && setSelectedId(row.id)}
        bulkActions={[
          {
            label: "Invoice selected (max 5)",
            icon: Receipt,
            onClick: (ids) => {
              const selected = rows.filter(
                (row) => row.id && ids.includes(row.id)
              );
              const shipperId = selected[0]?.shipper?.id;
              if (!shipperId) {
                showErrorAlert("Selected shipments need a shipper");
                return;
              }
              if (ids.length > 5) {
                showErrorAlert("Select at most 5 shipments");
                return;
              }
              invoiceFromSelection.mutate({
                body: { shipperId, shipmentIds: ids },
              });
            },
          },
        ]}
        rowActions={[
          {
            label: "Confirm delivery",
            icon: CheckCircle2,
            onClick: (row) => {
              if (row.id) {
                confirmDelivery.mutate({ body: { shipmentId: row.id } });
              }
            },
          },
          {
            label: "Confirm offload",
            icon: Truck,
            onClick: (row) => {
              if (row.id) {
                confirmOffload.mutate({ body: { shipmentId: row.id } });
              }
            },
          },
          {
            label: "Send waybill",
            icon: FileText,
            onClick: (row) => {
              if (row.id) {
                waybill.mutate({
                  body: {
                    shipmentId: row.id,
                    waybillNumber: row.shipmentNumber ?? row.id,
                  },
                });
              }
            },
          },
          {
            label: "Request final payment",
            icon: Send,
            onClick: (row) => {
              if (row.id) {
                finalPayment.mutate({ body: { shipmentId: row.id } });
              }
            },
          },
        ]}
      />

      <ShipmentDetailDrawer
        shipmentId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}

function ShipmentDetailDrawer({
  shipmentId,
  onClose,
}: {
  shipmentId: string | null;
  onClose: () => void;
}) {
  const shipment = useShipment(shipmentId ?? "", {
    enabled: Boolean(shipmentId),
  });
  const delivery = useDelivery(shipmentId ?? "", {
    enabled: Boolean(shipmentId),
  });
  const detail = shipment.data?.responseData;
  const confirmation = delivery.data?.responseData;
  const [driverName, setDriverName] = React.useState("");
  const [driverPhone, setDriverPhone] = React.useState("");
  const [truckNumber, setTruckNumber] = React.useState("");
  const [status, setStatus] = React.useState<ShipmentStatus>("Pending");

  React.useEffect(() => {
    setDriverName(detail?.driverName ?? "");
    setDriverPhone(detail?.driverPhone ?? "");
    setTruckNumber(detail?.truckNumber ?? "");
    setStatus(detail?.shipmentStatus ?? "Pending");
  }, [detail]);

  const update = useUpdateShipment({
    onSuccess: (response) =>
      showSuccessAlert(response.responseMessage ?? "Shipment updated"),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });

  return (
    <Drawer
      open={Boolean(shipmentId)}
      onClose={onClose}
      title={detail?.shipmentNumber ?? "Shipment"}
      subtitle={detail?.id}
      footer={
        <AdminButton
          variant="primary"
          disabled={!shipmentId || update.isPending}
          onClick={() => {
            if (!shipmentId) {
              return;
            }
            update.mutate({
              shipmentId,
              body: {
                id: shipmentId,
                shipmentStatus: status,
                driverName,
                driverPhone,
                truckNumber,
              },
            });
          }}
        >
          {update.isPending ? "Saving…" : "Save changes"}
        </AdminButton>
      }
    >
      {shipment.isPending ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-[11px] text-slate-400 uppercase">Shipper</p>
              <p className="font-medium">{detail?.shipper?.name ?? "—"}</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 uppercase">Carrier</p>
              <p className="font-medium">{detail?.vendor?.name ?? "—"}</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 uppercase">Delivery</p>
              <p className="font-medium">
                {confirmation?.deliveryStatus ?? "Not confirmed"}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 uppercase">Offloaded</p>
              <p className="font-medium">
                {confirmation?.offloadedAt
                  ? formatDateShort(confirmation.offloadedAt)
                  : "—"}
              </p>
            </div>
          </div>
          <Field label="Status">
            <AdminSelect
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as ShipmentStatus)
              }
            >
              {Object.values(ShipmentStatus).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </AdminSelect>
          </Field>
          <Field label="Driver name">
            <AdminInput
              value={driverName}
              onChange={(event) => setDriverName(event.target.value)}
            />
          </Field>
          <Field label="Driver phone">
            <AdminInput
              value={driverPhone}
              onChange={(event) => setDriverPhone(event.target.value)}
            />
          </Field>
          <Field label="Truck number">
            <AdminInput
              value={truckNumber}
              onChange={(event) => setTruckNumber(event.target.value)}
            />
          </Field>
        </div>
      )}
    </Drawer>
  );
}
