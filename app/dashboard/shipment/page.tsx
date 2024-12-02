"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import React from "react";
import Shipments from "./data-table";

function Shipment() {
  return (
    <div>
      <div className="flex justify-between">
        <Heading title="Shipment" description="Manage your Shipments" />
      </div>
      <Separator />
      <Shipments />
    </div>
  );
}

export default Shipment;
