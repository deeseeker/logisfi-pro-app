"use client";
import VendorPriceForm from "@/components/forms/create-price/vendor-price";
import VendorPriceList from "@/components/tables/admin-tables/price-list/vendor-price-list";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";

import React from "react";

function VendorPrice() {
  const params = useParams();
  const { id } = params;
  return (
    <div>
      <div className="flex justify-between">
        <Heading title="Vendor Price" description="Manage vendor price" />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="text-xs md:text-sm bg-customblue">
              <Plus className="mr-2 h-4 w-4" /> Add Price
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create price</DialogTitle>
              <DialogDescription>
                Include a price to the list here. Click submit when you are
                done.
              </DialogDescription>
            </DialogHeader>
            <VendorPriceForm vendorId={id as string} />
          </DialogContent>
        </Dialog>
      </div>
      <Separator />
      <VendorPriceList />
    </div>
  );
}

export default VendorPrice;
