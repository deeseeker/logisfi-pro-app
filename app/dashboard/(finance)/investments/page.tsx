"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import InvestmentsTable from "@/components/tables/admin-tables/investments";

export default function Investments() {
  return (
    <div className="space-y-2">
      <div>
        <Heading
          title="Investments"
          description="Manage all your investments"
        />
      </div>
      <Separator />

      <InvestmentsTable />
    </div>
  );
}
