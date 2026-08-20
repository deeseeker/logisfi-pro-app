"use client";

import * as React from "react";
import { Check, ChevronLeft, CircleDollarSign, Info, Route as RouteIcon } from "lucide-react";
import { toast } from "sonner";

import { AdminButton } from "@/components/admin/ui/admin-button";
import {
  AdminInput,
  AdminSelect,
  AdminTextarea,
  Field,
} from "@/components/admin/ui/form-field";
import { Modal } from "@/components/admin/ui/modal";
import { Panel, PanelHeader } from "@/components/admin/ui/panel";
import {
  CARRIERS,
  PRODUCTS,
  ROUTES,
  SHIPPERS,
  TRUCK_SIZES,
} from "@/constants/admin/mock-data";
import { cn } from "@/lib/utils";
import { formatNairaCompact } from "@/utils/helpers";

const STEPS = [
  "Shipper & Product",
  "Route & Truck",
  "Carrier & Pricing",
  "Review & Submit",
];

const routeLabel = (r: (typeof ROUTES)[number]) => `${r.origin} → ${r.destination}`;

export function ShipmentWizard({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState({
    shipper: SHIPPERS[0].name,
    product: PRODUCTS[0].name,
    route: routeLabel(ROUTES[0]),
    truck: TRUCK_SIZES[2].capacity,
    carrier: CARRIERS[0].name,
    qty: 500,
  });
  const estValue = 18400000 + step * 120000;
  const route = ROUTES.find((r) => routeLabel(r) === form.route);

  const close = () => {
    onClose();
    setStep(0);
  };

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
            <AdminButton variant="primary" onClick={() => setStep((s) => s + 1)}>
              Continue
            </AdminButton>
          )}
          {step === STEPS.length - 1 && (
            <AdminButton
              variant="accent"
              icon={Check}
              onClick={() => {
                close();
                toast.success(
                  "Shipment SHM-2665 created and submitted for confirmation"
                );
              }}
            >
              Submit Shipment
            </AdminButton>
          )}
        </>
      }
    >
      <div className="flex items-center gap-2 mb-6">
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
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
                {s}
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
        <div className="grid grid-cols-2 gap-4">
          <Field label="Shipper" required>
            <AdminSelect
              value={form.shipper}
              onChange={(e) => setForm({ ...form, shipper: e.target.value })}
            >
              {SHIPPERS.map((s) => (
                <option key={s.id}>{s.name}</option>
              ))}
            </AdminSelect>
          </Field>
          <Field label="Product" required>
            <AdminSelect
              value={form.product}
              onChange={(e) => setForm({ ...form, product: e.target.value })}
            >
              {PRODUCTS.map((p) => (
                <option key={p.id}>{p.name}</option>
              ))}
            </AdminSelect>
          </Field>
          <Field label="Quantity" required hint="Number of units for selected product">
            <AdminInput
              type="number"
              value={form.qty}
              onChange={(e) => setForm({ ...form, qty: Number(e.target.value) })}
            />
          </Field>
          <Field label="Pickup Date" required>
            <AdminInput type="date" defaultValue="2026-08-06" />
          </Field>
          <Field
            label="Purchase Order Reference"
            hint="Optional — links to shipper's internal PO"
          >
            <AdminInput placeholder="PO-2026-004471" />
          </Field>
          <Field label="Special Handling Notes">
            <AdminTextarea placeholder="e.g. Fragile, temperature-sensitive…" />
          </Field>
        </div>
      )}

      {step === 1 && (
        <div className="grid grid-cols-2 gap-4">
          <Field label="Route" required>
            <AdminSelect
              value={form.route}
              onChange={(e) => setForm({ ...form, route: e.target.value })}
            >
              {ROUTES.map((r) => (
                <option key={r.id}>{routeLabel(r)}</option>
              ))}
            </AdminSelect>
          </Field>
          <Field label="Truck Size" required>
            <AdminSelect
              value={form.truck}
              onChange={(e) => setForm({ ...form, truck: e.target.value })}
            >
              {TRUCK_SIZES.map((t) => (
                <option key={t.id}>{t.capacity}</option>
              ))}
            </AdminSelect>
          </Field>
          <Field label="Pickup Address" required>
            <AdminInput placeholder="Warehouse 4, Apapa Industrial Estate" />
          </Field>
          <Field label="Delivery Address" required>
            <AdminInput placeholder="Central Depot, Kano" />
          </Field>
          <div className="col-span-2 rounded-xl bg-slate-50 border border-slate-100 p-4 flex items-center gap-4">
            <RouteIcon className="w-5 h-5 text-blue-800 shrink-0" />
            <div className="text-xs text-slate-600">
              Route <b>{form.route}</b> — estimated distance{" "}
              <b>{route?.distanceKm ?? 1140} km</b>, transit time{" "}
              <b>~{route?.avgTransitHrs ?? 22} hrs</b>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Assign Carrier" required>
              <AdminSelect
                value={form.carrier}
                onChange={(e) => setForm({ ...form, carrier: e.target.value })}
              >
                {CARRIERS.map((c) => (
                  <option key={c.id}>{c.name}</option>
                ))}
              </AdminSelect>
            </Field>
            <Field label="Rate Card Applied">
              <AdminInput
                disabled
                value="Standard — Shipper Tier Pricing"
                className="bg-slate-50 text-slate-500"
              />
            </Field>
          </div>
          <Panel className="bg-blue-50/60 border-blue-100">
            <PanelHeader
              icon={CircleDollarSign}
              title="Pricing Preview"
              subtitle="Auto-calculated from route distance × truck rate card"
            />
            <div className="grid grid-cols-4 gap-4 text-center">
              {[
                { label: "Base Freight", value: estValue * 0.86 },
                { label: "Fuel Surcharge", value: estValue * 0.08 },
                { label: "Toll & Levies", value: estValue * 0.06 },
              ].map((x) => (
                <div key={x.label}>
                  <p className="text-[11px] text-slate-500 uppercase">{x.label}</p>
                  <p className="text-lg font-bold text-slate-900 font-figure">
                    {formatNairaCompact(x.value)}
                  </p>
                </div>
              ))}
              <div>
                <p className="text-[11px] text-slate-500 uppercase">Total Value</p>
                <p className="text-lg font-bold text-blue-900 font-figure">
                  {formatNairaCompact(estValue)}
                </p>
              </div>
            </div>
          </Panel>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm mb-5">
            {[
              { label: "Shipper", value: form.shipper },
              { label: "Product", value: form.product },
              { label: "Route", value: form.route },
              { label: "Truck", value: form.truck },
              { label: "Carrier", value: form.carrier },
            ].map((x) => (
              <div key={x.label}>
                <p className="text-[11px] text-slate-400 uppercase">{x.label}</p>
                <p className="font-medium">{x.value}</p>
              </div>
            ))}
            <div>
              <p className="text-[11px] text-slate-400 uppercase">Estimated Value</p>
              <p className="font-semibold text-blue-900 font-figure">
                {formatNairaCompact(estValue)}
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-amber-50 border border-amber-100 p-3 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-800">
              Submitting will notify the assigned carrier and generate a draft waybill
              pending fulfilment confirmation.
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}
