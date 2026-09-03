"use client";

import { useParams } from "next/navigation";
import Image from "next/image";

import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/lib/api/errors";
import {
  useConfirmation,
  useConfirmWaybill,
} from "@/lib/api/hooks/confirmations";
import { formatDateShort } from "@/utils/helpers";

export default function ConfirmWaybillPage() {
  const params = useParams();
  const token = String(params.token ?? "");
  const confirmation = useConfirmation(token);
  const summary = confirmation.data?.responseData;
  const confirm = useConfirmWaybill({
    onSuccess: (response) =>
      showSuccessAlert(response.responseMessage ?? "Waybill confirmed"),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });

  return (
    <div className="min-h-screen flex items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Image
        src="/login-bg.jpeg"
        alt=""
        width={400}
        height={400}
        className="object-cover h-full w-full hidden lg:block"
        priority
      />
      <div className="mx-auto w-full px-12 sm:px-0 sm:w-[380px] py-12">
        <div className="flex justify-center mb-4">
          <Image
            src="/logisfi-icon.svg"
            width={121}
            height={30}
            alt="Logisfi Pro"
          />
        </div>
        <h1 className="text-xl font-semibold text-center text-slate-900 mb-1">
          Confirm waybill
        </h1>
        <p className="text-sm text-center text-slate-500 mb-6">
          Review the consignment details, then confirm receipt.
        </p>

        {confirmation.isPending ? (
          <p className="text-sm text-center text-slate-500">Loading…</p>
        ) : confirmation.isError ? (
          <p className="text-sm text-center text-red-600">
            {getApiErrorMessage(confirmation.error)}
          </p>
        ) : (
          <div className="space-y-3 rounded-xl border border-slate-200 p-4 mb-6">
            {[
              { label: "Waybill", value: summary?.waybillNumber },
              { label: "Shipper", value: summary?.shipperName },
              { label: "Route", value: `${summary?.origin ?? "—"} → ${summary?.destination ?? "—"}` },
              { label: "Product", value: summary?.productTypeName },
              { label: "Truck", value: summary?.truckNumber },
              { label: "Driver", value: summary?.driverName },
              {
                label: "Expires",
                value: summary?.expiresAt
                  ? formatDateShort(summary.expiresAt)
                  : "—",
              },
            ].map((row) => (
              <div key={row.label} className="flex justify-between gap-4 text-sm">
                <span className="text-slate-500">{row.label}</span>
                <span className="font-medium text-slate-800 text-right">
                  {row.value ?? "—"}
                </span>
              </div>
            ))}
          </div>
        )}

        <Button
          className="w-full bg-customblue"
          disabled={!token || confirm.isPending || confirmation.isError}
          onClick={() => confirm.mutate({ token })}
        >
          {confirm.isPending ? "Confirming…" : "Confirm waybill"}
        </Button>
      </div>
    </div>
  );
}
