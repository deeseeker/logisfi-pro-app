"use client";
import OrderForm from "@/components/forms/order/order-form";
import PriceForm from "@/components/forms/create-price/shipper-price";
import OrdersTable from "@/components/tables/admin-tables/orders";
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
import React from "react";

function Order() {
  return (
    <div>
      <div className="flex justify-between">
        <Heading title="Order" description="Manage your orders" />

        <Dialog>
          <DialogTrigger asChild>
            <Button className="text-xs md:text-sm bg-customblue">
              <Plus className="mr-2 h-4 w-4" /> Create Order
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create order</DialogTitle>
              <DialogDescription>
                Include an order to the list here. Click submit when you are
                done.
              </DialogDescription>
            </DialogHeader>
            <OrderForm />
          </DialogContent>
        </Dialog>
      </div>
      <Separator />
      <OrdersTable />
    </div>
  );
}

export default Order;
