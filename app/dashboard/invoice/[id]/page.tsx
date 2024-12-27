"use client";
import { generateInvoiceId } from "@/app/api/services";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { schemaToDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import InvoiceIdTable from "./data-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export default function InvoiceId() {
  const params = useParams();
  const { id } = params;
  const [open, setOpen] = useState(false);
  const { data, isPending } = useQuery({
    queryKey: ["invoice-id"],
    queryFn: () => generateInvoiceId(id as string),
  });
  console.log(data?.invoiceItems.length);
  return (
    <div>
      <div className="flex justify-between mb-4">
        <Heading title="Invoice" description="" />
        <Button
          onClick={() => setOpen(true)}
          className="text-xs md:text-sm bg-customblue"
        >
          Pay Invoice
        </Button>

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-500">
                Are you absolutely sure {data?.shipper?.name} has paid?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently settle
                related investments.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  //   mutation.mutate(id);
                  setOpen(false);
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Separator />
      {isPending ? (
        "loading..."
      ) : (
        <Card className="relative w-1/2 mt-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
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
              {schemaToDate(data.invoiceDate)}
            </p>
            <p>
              <strong>Number of shipment: </strong> {data.invoiceItems.length}
            </p>
          </CardContent>
        </Card>
      )}
      <InvoiceIdTable data={data} loading={isPending} />
    </div>
  );
}
