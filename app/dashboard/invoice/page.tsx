"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InvoiceForm from "@/components/forms/invoice";
import InvoiceTable from "./data-table";

export default function Invoice() {
  return (
    <div>
      <Card className="relative bg-[linear-gradient(100.09deg,_#FADDDE_29.03%,_#FFC0C2_93.76%)] w-1/2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Generate Invoice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <InvoiceForm />
        </CardContent>
      </Card>

      <InvoiceTable />
    </div>
  );
}
