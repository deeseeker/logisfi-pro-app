"use client";

import { getAllWithdrawals } from "@/app/api/services";
import AdminInvestments from "@/components/dashboards/investments/admin";
import InvestorsInvestments from "@/components/dashboards/investments/investor/data-table";
import InvestorTransactions from "@/components/dashboards/transactions/investor/data-table";
import { DataTableSkeletonLoader } from "@/components/skeleton";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/table/data-table";
import useRole from "@/hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./column";

export default function Withdrawals() {
  const { data: withdrawals, isPending } = useQuery({
    queryKey: ["withdrawals"],
    queryFn: getAllWithdrawals,
  });
  console.log(withdrawals);
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Heading
          title="Withdrawals"
          description="Manage all your withdrawals"
        />
      </div>
      <Separator />

      <div className="py-10">
        {isPending ? (
          <DataTableSkeletonLoader />
        ) : (
          <DataTable searchKey="" columns={columns} data={withdrawals || []} />
        )}
      </div>
    </div>
  );
}
