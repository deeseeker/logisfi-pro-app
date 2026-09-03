"use client";

import * as React from "react";
import { Check, ChevronLeft, CircleDollarSign, Info } from "lucide-react";

import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import { AdminButton } from "@/components/admin/ui/admin-button";
import {
  AdminInput,
  AdminSelect,
  Field,
} from "@/components/admin/ui/form-field";
import { Modal } from "@/components/admin/ui/modal";
import { Panel, PanelHeader } from "@/components/admin/ui/panel";
import { getApiErrorMessage } from "@/lib/api/errors";
import { useFulfillOrder, useOrders } from "@/lib/api/hooks/orders";
import { useProductTypes } from "@/lib/api/hooks/shared";
import { useVendors } from "@/lib/api/hooks/vendors";
import type { OrderModel } from "@/lib/api/types/models";
import { cn } from "@/lib/utils";

const STEPS = ["Select order", "Carrier & load", "Review & submit"];

function orderLabel(order: OrderModel): string {
  const shipper = order.shipper?.name ?? "Shipper";
  const route = order.route
    ? `${order.route.origin} → ${order.route.destination}`
    : "No route";
  return `${shipper} · ${route}`;
}

export function ShipmentWizard({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = React.useState(0);
  const [orderId, setOrderId] = React.useState("");
  const [form, setForm] = React.useState({
    vendorId: "",
    productTypeId: "",
    driverName: "",
    driverPhone: "",
    truckNumber: "",
  });

  const close = () => {
    onClose();
    setStep(0);
    setForm((current) => ({
      ...current,
      driverName: "",
      driverPhone: "",
      truckNumber: "",
    }));
  };

  const orders = useOrders({ PageSize: 100 }, { enabled: open });
  const vendors = useVendors({ PageSize: 100 }, { enabled: open });
  const products = useProductTypes({ enabled: open });
  const fulfill = useFulfillOrder({
    onSuccess: (response) => {
      showSuccessAlert(response.responseMessage ?? "Shipment created");
      close();
    },
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });

  const orderRows = (orders.data?.responseData ?? []).filter(
    (order) => order.orderStatus !== "CompletelyFulfilled" && order.orderStatus !== "Cancelled"
  );
  const vendorRows = vendors.data?.responseData ?? [];
  const productRows = products.data?.responseData ?? [];
  const selectedOrder = orderRows.find((order) => order.id === orderId);

  React.useEffect(() => {
    if (!orderId && orderRows[0]?.id) {
      setOrderId(orderRows[0].id);
    }
  }, [orderId, orderRows]);

  React.useEffect(() => {
    if (!form.vendorId && vendorRows[0]?.id) {
      setForm((current) => ({ ...current, vendorId: vendorRows[0].id ?? "" }));
    }
  }, [form.vendorId, vendorRows]);

  React.useEffect(() => {
    if (!form.productTypeId && productRows[0]?.id) {
      setForm((current) => ({
        ...current,
        productTypeId: productRows[0].id ?? "",
      }));
    }
  }, [form.productTypeId, productRows]);

  const canContinue =
    step === 0
      ? Boolean(orderId)
      : Boolean(form.vendorId && form.productTypeId && form.truckNumber);

  return (
    <Modal
      open={open}
      onClose={close}
      size="xl"
      title="Create Shipment"
      footer={
        <>
          <AdminButton variant="secondary" onClick={close}>
            Cancel
          </AdminButton>
          {step > 0 && (
            <AdminButton
              variant="secondary"
              icon={ChevronLeft}
              onClick={() => setStep((s) => s - 1)}
            >
              Back
            </AdminButton>
          )}
          {step < STEPS.length - 1 && (
            <AdminButton
              variant="primary"
              disabled={!canContinue}
              onClick={() => setStep((s) => s + 1)}
            >
              Continue
            </AdminButton>
          )}
          {step === STEPS.length - 1 && (
            <AdminButton
              variant="accent"
              icon={Check}
              disabled={!orderId || fulfill.isPending}
              onClick={() => {
                if (!orderId) {
                  return;
                }
                fulfill.mutate({
                  body: {
                    orderId,
                    shipmentPayloads: [
                      {
                        vendorId: form.vendorId,
                        productTypeId: form.productTypeId,
                        driverName: form.driverName,
                        driverPhone: form.driverPhone,
                        truckNumber: form.truckNumber,
                      },
                    ],
                  },
                });
              }}
            >
              {fulfill.isPending ? "Submitting…" : "Submit shipment"}
            </AdminButton>
          )}
        </>
      }
    >
      <div className="flex items-center gap-2 mb-6">
        {STEPS.map((label, i) => (
          <React.Fragment key={label}>
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0",
                  i < step
                    ? "bg-emerald-500 text-white"
                    : i === step
                      ? "bg-blue-900 text-white"
                      : "bg-slate-100 text-slate-400"
                )}
              >
                {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span
                className={cn(
                  "text-xs font-medium whitespace-nowrap",
                  i <= step ? "text-slate-800" : "text-slate-400"
                )}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn("flex-1 h-px", i < step ? "bg-emerald-400" : "bg-slate-200")}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {step === 0 && (
        <div className="space-y-4">
          <Field label="Open order" required hint="Shipments are created by fulfilling an existing order">
            <AdminSelect
              value={orderId}
              onChange={(event) => setOrderId(event.target.value)}
            >
              {orderRows.length === 0 && (
                <option value="">No open orders</option>
              )}
              {orderRows.map((order) => (
                <option key={order.id} value={order.id}>
                  {orderLabel(order)} · {order.orderStatus ?? "Pending"}
                </option>
              ))}
            </AdminSelect>
          </Field>
          {selectedOrder && (
            <Panel className="bg-slate-50">
              <PanelHeader
                icon={CircleDollarSign}
                title="Order summary"
                subtitle={`${selectedOrder.numberOfTrucks ?? 0} truck(s)`}
              />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-[11px] text-slate-400 uppercase">Shipper</p>
                  <p className="font-medium">{selectedOrder.shipper?.name ?? "—"}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 uppercase">Route</p>
                  <p className="font-medium">
                    {selectedOrder.route
                      ? `${selectedOrder.route.origin} → ${selectedOrder.route.destination}`
                      : "—"}
                  </p>
                </div>
              </div>
            </Panel>
          )}
        </div>
      )}

      {step === 1 && (
        <div className="grid grid-cols-2 gap-4">
          <Field label="Carrier" required>
            <AdminSelect
              value={form.vendorId}
              onChange={(event) =>
                setForm({ ...form, vendorId: event.target.value })
              }
            >
              {vendorRows.map((vendor) => (
                <option key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </option>
              ))}
            </AdminSelect>
          </Field>
          <Field label="Product" required>
            <AdminSelect
              value={form.productTypeId}
              onChange={(event) =>
                setForm({ ...form, productTypeId: event.target.value })
              }
            >
              {productRows.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </AdminSelect>
          </Field>
          <Field label="Driver name">
            <AdminInput
              value={form.driverName}
              onChange={(event) =>
                setForm({ ...form, driverName: event.target.value })
              }
            />
          </Field>
          <Field label="Driver phone">
            <AdminInput
              value={form.driverPhone}
              onChange={(event) =>
                setForm({ ...form, driverPhone: event.target.value })
              }
            />
          </Field>
          <Field label="Truck number" required className="col-span-2">
            <AdminInput
              value={form.truckNumber}
              onChange={(event) =>
                setForm({ ...form, truckNumber: event.target.value })
              }
            />
          </Field>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm mb-5">
            {[
              { label: "Shipper", value: selectedOrder?.shipper?.name },
              {
                label: "Route",
                value: selectedOrder?.route
                  ? `${selectedOrder.route.origin} → ${selectedOrder.route.destination}`
                  : "—",
              },
              {
                label: "Carrier",
                value: vendorRows.find((vendor) => vendor.id === form.vendorId)?.name,
              },
              {
                label: "Product",
                value: productRows.find((product) => product.id === form.productTypeId)
                  ?.name,
              },
              { label: "Driver", value: form.driverName || "—" },
              { label: "Truck", value: form.truckNumber || "—" },
            ].map((row) => (
              <div key={row.label}>
                <p className="text-[11px] text-slate-400 uppercase">{row.label}</p>
                <p className="font-medium">{row.value ?? "—"}</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg bg-amber-50 border border-amber-100 p-3 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-800">
              Submitting fulfils the selected order and creates a live shipment on
              the API.
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}
