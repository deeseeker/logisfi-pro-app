import { DataTable } from "@/components/ui/data-table";
import { columns } from "./column";
import { getAllInvestments } from "@/app/api/services";
import { useQuery } from "@tanstack/react-query";
import { DataTableSkeletonLoader } from "@/components/skeleton";

export default function InvestmentsTable() {
  const { data, isPending } = useQuery({
    queryKey: ["investments"],
    queryFn: () => getAllInvestments("5ca80894-e5d4-4b21-99e5-1ff1b2463e3b"),
  });
  const dataSource = data?.responseData;

  return (
    <div className="py-10">
      {isPending ? (
        <DataTableSkeletonLoader />
      ) : (
        <DataTable
          searchKey="investments"
          columns={columns}
          data={dataSource}
        />
      )}
    </div>
  );
}
