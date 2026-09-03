"use client";

import * as React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Gauge,
  Send,
  ShieldAlert,
} from "lucide-react";

import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import { AdminButton } from "@/components/admin/ui/admin-button";
import { AdminInput, AdminSelect, Field } from "@/components/admin/ui/form-field";
import { Modal } from "@/components/admin/ui/modal";
import { Panel, PanelHeader } from "@/components/admin/ui/panel";
import { ProgressBar } from "@/components/admin/ui/progress-bar";
import { getApiErrorMessage } from "@/lib/api/errors";
import {
  useFinancingConfiguration,
  useFinancingRequests,
  useInvestorSummary,
  useSubmitFinancingRequest,
} from "@/lib/api/hooks/financing";
import { useOrganizations } from "@/lib/api/hooks/organizations";
import { useShipments } from "@/lib/api/hooks/shipments";
import { useCreateWaybillConfirmation } from "@/lib/api/hooks/waybills";
import { cn } from "@/lib/utils";
import { formatNaira, formatNairaCompact } from "@/utils/helpers";

export function PaymentRequestForm({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [shipmentId, setShipmentId] = React.useState("");
  const [investorId, setInvestorId] = React.useState("");
  const [fundingPercent, setFundingPercent] = React.useState(85);
  const [confirm, setConfirm] = React.useState(false);

  const shipments = useShipments({ PageSize: 100 }, { enabled: open });
  const organizations = useOrganizations({ PageSize: 100 }, { enabled: open });
  const requests = useFinancingRequests({ PageSize: 100 }, { enabled: open });
  const summaryQuery = useInvestorSummary(investorId);
  const configQuery = useFinancingConfiguration(investorId);
  const waybill = useCreateWaybillConfirmation();
  const submit = useSubmitFinancingRequest({
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });

  const shipmentRows = shipments.data?.responseData ?? [];
  const investors = organizations.data?.responseData ?? [];
  const shipment = shipmentRows.find((row) => row.id === shipmentId);
  const investor = investors.find((row) => row.id === investorId);
  const summary = summaryQuery.data?.responseData;
  const config = configQuery.data?.responseData;

  React.useEffect(() => {
    if (!shipmentId && shipmentRows[0]?.id) {
      setShipmentId(shipmentRows[0].id);
    }
  }, [shipmentId, shipmentRows]);

  React.useEffect(() => {
    if (!investorId && investors[0]?.id) {
      setInvestorId(investors[0].id);
    }
  }, [investorId, investors]);

  React.useEffect(() => {
    if (config?.maxFundingPercent) {
      setFundingPercent(config.maxFundingPercent);
    }
  }, [config?.maxFundingPercent]);

  const waybillValue = shipment?.shipperPrice ?? 0;
  const requestAmt = Math.round((waybillValue * fundingPercent) / 100);
  const exposureLimit = summary?.exposureLimit ?? config?.exposureLimit ?? 0;
  const exposureUsed = summary?.currentExposure ?? 0;
  const wallet = summary?.availableLoanAmount ?? investor?.wallet?.availableLoanAmount ?? 0;
  const exposurePct = exposureLimit
    ? Math.round(((exposureUsed + requestAmt) / exposureLimit) * 100)
    : 0;
  const maxAvailable = Math.max(0, exposureLimit - exposureUsed);
  const duplicateFlag = Boolean(
    shipmentId &&
      requests.data?.responseData?.some(
        (row) =>
          row.shipmentId === shipmentId &&
          row.status !== "Rejected" &&
          row.status !== "Failed"
      )
  );
  const exposureBreach = exposureLimit > 0 && exposurePct > 100;
  const walletInsufficient = requestAmt > wallet;
  const blocked = duplicateFlag || exposureBreach || walletInsufficient || !shipmentId || !investorId;
  const pending = waybill.isPending || submit.isPending;

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
            disabled={!confirm || blocked || pending}
            onClick={async () => {
              if (!shipmentId || !investorId || !shipment) {
                return;
              }
              try {
                const created = await waybill.mutateAsync({
                  body: {
                    shipmentId,
                    waybillNumber: shipment.shipmentNumber,
                  },
                });
                const waybillId = created.responseData?.id;
                if (!waybillId) {
                  showErrorAlert("Waybill was created without an id");
                  return;
                }
                const response = await submit.mutateAsync({
                  body: {
                    waybillId,
                    investorOrganizationId: investorId,
                    fundingPercent,
                  },
                });
                showSuccessAlert(
                  response.responseMessage ??
                    `Financing request submitted for ${formatNaira(requestAmt)}`
                );
                close();
              } catch (error) {
                showErrorAlert(getApiErrorMessage(error));
              }
            }}
          >
            {pending ? "Submitting…" : "Submit Request"}
          </AdminButton>
        </>
      }
    >
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Field
          label="Shipment"
          required
          hint="A waybill is created for this shipment, then financing is submitted"
        >
          <AdminSelect
            value={shipmentId}
            onChange={(event) => setShipmentId(event.target.value)}
          >
            {shipmentRows.length === 0 && <option value="">No shipments</option>}
            {shipmentRows.map((row) => (
              <option key={row.id} value={row.id}>
                {row.shipmentNumber ?? row.id} — {row.origin} → {row.destination}
              </option>
            ))}
          </AdminSelect>
        </Field>
        <Field label="Investor" required>
          <AdminSelect
            value={investorId}
            onChange={(event) => setInvestorId(event.target.value)}
          >
            {investors.length === 0 && <option value="">No investors</option>}
            {investors.map((row) => (
              <option key={row.id} value={row.id}>
                {row.organizationName}
              </option>
            ))}
          </AdminSelect>
        </Field>
        <Field label="Funding percent" required>
          <AdminInput
            type="number"
            min={1}
            max={config?.maxFundingPercent ?? 100}
            value={fundingPercent}
            onChange={(event) => setFundingPercent(Number(event.target.value))}
          />
        </Field>
      </div>

      {duplicateFlag && (
        <div className="rounded-xl bg-red-600 p-4 flex items-start gap-3 mb-4">
          <ShieldAlert className="w-5 h-5 text-white shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-white uppercase tracking-wide">
              Duplicate financing request
            </p>
            <p className="text-xs text-red-50 mt-1">
              This shipment already has an open financing request.
            </p>
          </div>
        </div>
      )}

      {!duplicateFlag && exposureBreach && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 flex items-start gap-3 mb-4">
          <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-800">
              Investor exposure limit exceeded
            </p>
            <p className="text-xs text-red-600 mt-1">
              Maximum available: <b>{formatNaira(maxAvailable)}</b>
            </p>
          </div>
        </div>
      )}

      {!duplicateFlag && !exposureBreach && walletInsufficient && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-800">
              Insufficient investor wallet balance
            </p>
            <p className="text-xs text-amber-700 mt-1">
              Wallet ({formatNaira(wallet)}) is below the requested amount (
              {formatNaira(requestAmt)}).
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 mb-4">
        <Panel className="p-4 bg-slate-50">
          <p className="text-[11px] text-slate-400 uppercase mb-1">Shipment</p>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
            <CheckCircle2 className="w-4 h-4" /> {shipment?.shipmentStatus ?? "—"}
          </p>
        </Panel>
        <Panel className="p-4 bg-slate-50">
          <p className="text-[11px] text-slate-400 uppercase mb-1">Investor book</p>
          <p className="text-sm font-semibold text-slate-800 font-figure">
            {formatNairaCompact(wallet)}
          </p>
        </Panel>
        <Panel className="p-4 bg-slate-50">
          <p className="text-[11px] text-slate-400 uppercase mb-1">Model</p>
          <p className="text-sm font-semibold text-slate-800">
            {config?.model ?? "—"}
          </p>
        </Panel>
      </div>

      <Panel className="bg-blue-50/60 border-blue-100 mb-4">
        <PanelHeader icon={Gauge} title="Funding calculator & exposure check" />
        <div className="grid grid-cols-4 gap-4 text-center mb-4">
          <div>
            <p className="text-[11px] text-slate-500 uppercase">Waybill value</p>
            <p className="text-base font-bold text-slate-900 font-figure">
              {formatNairaCompact(waybillValue)}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-slate-500 uppercase">Advance rate</p>
            <p className="text-base font-bold text-slate-900">{fundingPercent}%</p>
          </div>
          <div>
            <p className="text-[11px] text-slate-500 uppercase">Requested amount</p>
            <p className="text-base font-bold text-blue-900 font-figure">
              {formatNairaCompact(requestAmt)}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-slate-500 uppercase">Investor rate</p>
            <p className="text-base font-bold text-slate-900">
              {config?.interestRate ?? investor?.agreedInterestRate ?? 0}%
            </p>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-500">
              {investor?.organizationName ?? "Investor"} exposure utilisation
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
            <span>Wallet: {formatNairaCompact(wallet)}</span>
            <span>Limit: {formatNairaCompact(exposureLimit)}</span>
          </div>
        </div>
      </Panel>

      <label className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
        <input
          type="checkbox"
          checked={confirm}
          onChange={(event) => setConfirm(event.target.checked)}
          className="mt-0.5 rounded border-slate-300 text-blue-800 focus:ring-blue-800/30"
        />
        <span className="text-xs text-slate-600">
          I confirm this shipment can be financed and submitted to{" "}
          <b>{investor?.organizationName ?? "the selected investor"}</b>.
        </span>
      </label>
    </Modal>
  );
}
