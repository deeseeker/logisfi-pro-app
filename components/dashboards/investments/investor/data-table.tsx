import { columns } from "./column";
import { getAllInvestments } from "@/app/api/services";
import { useQuery } from "@tanstack/react-query";
import { DataTableSkeletonLoader } from "@/components/skeleton";
import { DataTable } from "@/components/ui/table/data-table";
import { useProfile } from "@/hooks/useRole";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export default function InvestorsInvestments() {
  const { data: profile } = useProfile();
  const { data: investments, isPending } = useQuery({
    queryKey: ["investments"],
    queryFn: () => getAllInvestments(`${profile?.organizationId}`),
    enabled: !!profile?.organizationId,
  });
  const dataSource = investments?.responseData;

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Heading title="Loans" description="Manage all your loans" />
      </div>
      <Separator />

      <div className="py-10">
        {isPending ? (
          <DataTableSkeletonLoader />
        ) : (
          <DataTable
            searchKey="investments"
            columns={columns}
            data={dataSource}
            filter1="investmentStatus"
          />
        )}
      </div>
    </div>
  );
}
