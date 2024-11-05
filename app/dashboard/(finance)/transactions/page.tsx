"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import InvestmentsTable from "@/components/tables/admin-tables/investments";
import TransactionsTable from "@/components/tables/admin-tables/transactions";

export default function Investments() {
  return (
    <div className="space-y-2">
      <div>
        <Heading
          title="Transactions"
          description="View all your transactions"
        />
      </div>
      <Separator />

      <TransactionsTable />
    </div>
  );
}
