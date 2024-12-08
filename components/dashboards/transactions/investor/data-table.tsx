import { columns } from "./column";
import { getAllTransactions } from "@/app/api/services";
import { useQuery } from "@tanstack/react-query";
import { DataTableSkeletonLoader } from "@/components/skeleton";
import { DataTable } from "@/components/ui/table/data-table";
import { useProfile } from "@/hooks/useRole";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export default function InvestorTransactions() {
  const { data: profile } = useProfile();
  const { data: transactions, isPending } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getAllTransactions(`${profile?.organizationId}`),
    enabled: !!profile?.organizationId,
  });
  const dataSource = transactions?.responseData;

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Heading
          title="Transactions"
          description="Manage all your transactions"
        />
      </div>
      <Separator />

      <div className="py-10">
        {isPending ? (
          <DataTableSkeletonLoader />
        ) : (
          <DataTable
            searchKey="transaction"
            columns={columns}
            data={dataSource}
          />
        )}
      </div>
    </div>
  );
}
