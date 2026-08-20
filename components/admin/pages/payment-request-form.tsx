"use client";

import * as React from "react";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Gauge,
  Send,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";

import { AdminButton } from "@/components/admin/ui/admin-button";
import { AdminSelect, Field } from "@/components/admin/ui/form-field";
import { Modal } from "@/components/admin/ui/modal";
import { Panel, PanelHeader } from "@/components/admin/ui/panel";
import { ProgressBar } from "@/components/admin/ui/progress-bar";
import { INVESTORS, SHIPMENTS } from "@/constants/admin/mock-data";
import { cn } from "@/lib/utils";
import { formatNaira, formatNairaCompact } from "@/utils/helpers";

/** Only waybill-confirmed and delivered shipments can be financed. */
const ELIGIBLE = SHIPMENTS.filter((s) =>
  ["Waybill Confirmed", "Delivered"].includes(s.status)
);

/** Pre-existing request PRQ-4402 already covers this waybill — see mock-data. */
const DUPLICATE_ID = "SHM-2631";

export function PaymentRequestForm({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [shipmentId, setShipmentId] = React.useState(ELIGIBLE[0].id);
  const [investorId, setInvestorId] = React.useState(INVESTORS[0].id);
  const [confirm, setConfirm] = React.useState(false);

  const shipment = SHIPMENTS.find((s) => s.id === shipmentId) ?? SHIPMENTS[0];
  const investor = INVESTORS.find((i) => i.id === investorId) ?? INVESTORS[0];

  const requestAmt = Math.round(shipment.value * 0.85);
  const exposurePct = Math.round(
    ((investor.exposureUsed + requestAmt) / investor.exposureLimit) * 100
  );
  const maxAvailable = Math.max(0, investor.exposureLimit - investor.exposureUsed);

  const duplicateFlag = shipment.id === DUPLICATE_ID;
  const exposureBreach = exposurePct > 100;
  const walletInsufficient = requestAmt > investor.wallet;
  const blocked = duplicateFlag || exposureBreach || walletInsufficient;

  const close = () => {
    onClose();
    setConfirm(false);
  };

  return (
    <Modal
      open={open}
      onClose={close}
      size="xl"
      title="Request Freight Financing Disbursement"
      footer={
        <>
          <AdminButton variant="secondary" onClick={close}>
            Cancel
          </AdminButton>
          <AdminButton
            variant="primary"
            icon={Send}
            disabled={!confirm || blocked}
            onClick={() => {
              close();
              toast.success(
                `Financing request submitted for ${formatNaira(requestAmt)} via ${investor.name}`
              );
            }}
          >
            Submit Request
          </AdminButton>
        </>
      }
    >
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Field
          label="Shipment / Waybill"
          required
          hint="Only waybill-confirmed shipments are eligible"
        >
          <AdminSelect
            value={shipmentId}
            onChange={(e) => setShipmentId(e.target.value)}
          >
            {ELIGIBLE.map((s) => (
              <option key={s.id} value={s.id}>
                {s.id} — {s.waybill}
              </option>
            ))}
          </AdminSelect>
        </Field>
        <Field label="Select Investor / Bank" required>
          <AdminSelect
            value={investorId}
            onChange={(e) => setInvestorId(e.target.value)}
          >
            {INVESTORS.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </AdminSelect>
        </Field>
      </div>

      {duplicateFlag && (
        <div className="rounded-xl bg-red-600 p-4 flex items-start gap-3 mb-4 animate-fadein shadow-lg shadow-red-600/20">
          <AlertOctagon className="w-5 h-5 text-white shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-white uppercase tracking-wide">
              Red Alert · Duplicate Waybill Detected
            </p>
            <p className="text-xs text-red-50 mt-1">
              This shipment has already been financed. Waybill {shipment.waybill} matches
              a request submitted 2 days ago (PRQ-4402) on identical route, tonnage and
              shipper details.
            </p>
            <p className="text-xs font-bold text-white mt-1.5">Transaction blocked.</p>
            <button
              type="button"
              className="text-xs font-semibold text-white underline mt-1.5"
            >
              Review flagged duplicate →
            </button>
          </div>
        </div>
      )}

      {!duplicateFlag && exposureBreach && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 flex items-start gap-3 mb-4 animate-fadein">
          <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-800">
              Investor exposure limit exceeded
            </p>
            <p className="text-xs text-red-600 mt-1">
              {investor.name} cannot fund this request. Maximum available:{" "}
              <b>{formatNaira(maxAvailable)}</b>
            </p>
          </div>
        </div>
      )}

      {!duplicateFlag && !exposureBreach && walletInsufficient && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3 mb-4 animate-fadein">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-800">
              Insufficient investor wallet balance
            </p>
            <p className="text-xs text-amber-700 mt-1">
              {investor.name} wallet balance ({formatNaira(investor.wallet)}) is below the
              requested amount ({formatNaira(requestAmt)}). Top-up required before
              disbursement.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 mb-4">
        <Panel className="p-4 bg-slate-50">
          <p className="text-[11px] text-slate-400 uppercase mb-1">Waybill Validation</p>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
            <CheckCircle2 className="w-4 h-4" /> Verified
          </p>
        </Panel>
        <Panel className="p-4 bg-slate-50">
          <p className="text-[11px] text-slate-400 uppercase mb-1">Shipment Validation</p>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
            <CheckCircle2 className="w-4 h-4" /> Confirmed
          </p>
        </Panel>
        <Panel className="p-4 bg-slate-50">
          <p className="text-[11px] text-slate-400 uppercase mb-1">Fraud Screening</p>
          <p
            className={cn(
              "flex items-center gap-1.5 text-sm font-semibold",
              duplicateFlag ? "text-red-700" : "text-emerald-700"
            )}
          >
            {duplicateFlag ? (
              <>
                <ShieldAlert className="w-4 h-4" /> Flagged
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" /> Clear
              </>
            )}
          </p>
        </Panel>
      </div>

      <Panel className="bg-blue-50/60 border-blue-100 mb-4">
        <PanelHeader icon={Gauge} title="Funding Calculator & Exposure Check" />
        <div className="grid grid-cols-4 gap-4 text-center mb-4">
          <div>
            <p className="text-[11px] text-slate-500 uppercase">Waybill Value</p>
            <p className="text-base font-bold text-slate-900 font-figure">
              {formatNairaCompact(shipment.value)}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-slate-500 uppercase">Advance Rate</p>
            <p className="text-base font-bold text-slate-900">85%</p>
          </div>
          <div>
            <p className="text-[11px] text-slate-500 uppercase">Requested Amount</p>
            <p className="text-base font-bold text-blue-900 font-figure">
              {formatNairaCompact(requestAmt)}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-slate-500 uppercase">Investor Rate</p>
            <p className="text-base font-bold text-slate-900">
              {investor.interestRate}% / mo
            </p>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-500">
              {investor.name} exposure utilisation
            </span>
            <span
              className={cn(
                "font-semibold",
                exposurePct > 90
                  ? "text-red-600"
                  : exposurePct > 75
                    ? "text-amber-600"
                    : "text-emerald-600"
              )}
            >
              {exposurePct}% of limit
            </span>
          </div>
          <ProgressBar
            value={exposurePct}
            height="h-2"
            tone={exposurePct > 90 ? "red" : exposurePct > 75 ? "amber" : "emerald"}
          />
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
            <span>Wallet balance: {formatNairaCompact(investor.wallet)}</span>
            <span>Limit: {formatNairaCompact(investor.exposureLimit)}</span>
          </div>
        </div>
      </Panel>

      <label className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
        <input
          type="checkbox"
          checked={confirm}
          onChange={(e) => setConfirm(e.target.checked)}
          className="mt-0.5 rounded border-slate-300 text-blue-800 focus:ring-blue-800/30"
        />
        <span className="text-xs text-slate-600">
          I confirm the waybill and shipment details have been independently verified and
          are free of duplication, and that this request may be submitted to{" "}
          <b>{investor.name}</b> for funding approval.
        </span>
      </label>
    </Modal>
  );
}
