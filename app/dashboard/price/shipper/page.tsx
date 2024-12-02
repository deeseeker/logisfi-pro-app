"use client";
import PriceForm from "@/components/forms/create-price/shipper-price";
import PriceList from "@/components/tables/admin-tables/price-list/shipper-price-list";
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

function ShipperPrice() {
  const params = useParams();
  const { id } = params;
  return (
    <div>
      <div className="flex justify-between mb-2">
        <Heading title="Shipper Price" description="Manage shipper price" />
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
            <PriceForm shipperId={id as string} />
          </DialogContent>
        </Dialog>
      </div>
      <Separator />
      <PriceList />
    </div>
  );
}

export default ShipperPrice;
