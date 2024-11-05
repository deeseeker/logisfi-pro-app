"use client";
import MobilizationsTable from "@/components/tables/admin-tables/mobilizations";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import React from "react";

function Load() {
  return (
    <div>
      <div className="flex justify-between">
        <Heading title="Mobilizations" description="View your mobilizations" />
      </div>
      <Separator />
      <MobilizationsTable />
    </div>
  );
}

export default Load;
