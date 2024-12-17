"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import ShippersTable from "@/components/tables/admin-tables/shippers";
import ShipperForm from "@/components/forms/shipper-form";
import CustomDialog from "@/components/dialog/custom-dialog";
import Link from "next/link";

export default function Shippers() {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Heading title="Shippers" description="Manage all your shippers" />

        <CustomDialog
          triggerText="Add Shipper"
          title="Add Shipper"
          description={
            <>
              <div>
                To include multiple shippers to the list here. Click the link
                below.
              </div>
              <Link href="#" className="text-customblue text-sm underline">
                Multiple shippers
              </Link>
            </>
          }
          FormComponent={ShipperForm}
        />
      </div>
      <Separator />

      <ShippersTable />
    </div>
  );
}
