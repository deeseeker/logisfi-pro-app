import { DataTable } from "@/components/ui/data-table";
import { columns } from "./column";
import { getAllInvestment, getAllInvestments } from "@/app/api/services";
import { useQuery } from "@tanstack/react-query";
import { DataTableSkeletonLoader } from "@/components/skeleton";

export default function InvestmentsTable() {
  const { data, isPending } = useQuery({
    queryKey: ["investments"],
    queryFn: () => getAllInvestment(),
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
