"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import React from "react";
import MobilizationTable from "./data-table";

function Mobilizations() {
  return (
    <div>
      <div className="flex justify-between">
        <Heading title="Mobilizations" description="View your mobilizations" />
      </div>
      <Separator />
      <MobilizationTable />
    </div>
  );
}

export default Mobilizations;
