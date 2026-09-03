"use client";

import { useParams } from "next/navigation";

import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { getApiErrorMessage } from "@/lib/api/errors";
import {
  useCancelInvoice,
  useCloseInvoice,
  useDownloadInvoicePdf,
  useInvoice,
  useMarkInvoiceDue,
  useMarkInvoicePaid,
  useRefreshInvoice,
  useSubmitInvoice,
  useUpdateInvoice,
} from "@/lib/api/hooks/finances";
import { useInvoicePayments } from "@/lib/api/hooks/collections";
import { downloadBlob } from "@/lib/download";
import { schemaToDate } from "@/lib/utils";
import InvoiceIdTable from "./data-table";

export default function InvoiceId() {
  const params = useParams();
  const id = String(params.id ?? "");
  const invoice = useInvoice(id);
  const payments = useInvoicePayments(id);
  const data = invoice.data?.responseData;
  const paymentRows = payments.data?.responseData ?? [];

  const submit = useSubmitInvoice({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const markDue = useMarkInvoiceDue({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const close = useCloseInvoice({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const cancel = useCancelInvoice({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const paid = useMarkInvoicePaid({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const refresh = useRefreshInvoice({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const update = useUpdateInvoice({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const pdf = useDownloadInvoicePdf({
    onSuccess: (blob) => downloadBlob(blob, `invoice-${id}.pdf`),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });

  return (
    <div>
      <div className="flex flex-wrap justify-between gap-2 mb-4">
        <Heading title="Invoice Details" description="" />
        <div className="flex flex-wrap gap-2">
          <Button
            className="text-xs bg-customblue"
            onClick={() => submit.mutate({ id })}
          >
            Submit
          </Button>
          <Button
            variant="outline"
            className="text-xs"
            onClick={() => markDue.mutate({ id })}
          >
            Mark due
          </Button>
          <Button
            variant="outline"
            className="text-xs"
            onClick={() => paid.mutate({ body: { invoiceId: id } })}
          >
            Mark paid
          </Button>
          <Button
            variant="outline"
            className="text-xs"
            onClick={() => refresh.mutate({ body: { invoiceId: id } })}
          >
            Refresh items
          </Button>
          <Button
            variant="outline"
            className="text-xs"
            onClick={() => {
              const dueDate = window.prompt("Due date (YYYY-MM-DD)");
              if (!dueDate) {
                return;
              }
              update.mutate({
                id,
                body: {
                  invoiceId: id,
                  dueDate,
                  editReason: "Dashboard date correction",
                },
              });
            }}
          >
            Update dates
          </Button>
          <Button
            variant="outline"
            className="text-xs"
            onClick={() => pdf.mutate({ id })}
          >
            PDF
          </Button>
          <Button
            variant="outline"
            className="text-xs"
            onClick={() => close.mutate({ id })}
          >
            Close
          </Button>
          <Button
            variant="destructive"
            className="text-xs"
            onClick={() => cancel.mutate({ id })}
          >
            Cancel
          </Button>
        </div>
      </div>
      <Separator />
      {invoice.isPending ? (
        "loading..."
      ) : (
        <Card className="relative w-1/2 mt-6">
          <CardContent className="grid gap-4 pt-4">
            <p>
              <strong>Invoice Number: </strong> {data?.invoiceNumber}
            </p>
            <p>
              <strong>Shipper: </strong>
              {data?.shipper?.name}
            </p>
            <p>
              <strong>Date generated: </strong>
              {schemaToDate(data?.invoiceDate)}
            </p>
            <p>
              <strong>Status: </strong> {data?.invoiceStatus}
            </p>
            <p>
              <strong>Number of shipment: </strong>{" "}
              {data?.invoiceItems?.length ?? 0}
            </p>
            <p>
              <strong>Payments recorded: </strong> {paymentRows.length}
            </p>
          </CardContent>
        </Card>
      )}
      <InvoiceIdTable data={data} loading={invoice.isPending} />
    </div>
  );
}
