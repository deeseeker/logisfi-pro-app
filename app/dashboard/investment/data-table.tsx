import { columns } from "./column";
import { getAllInvestments } from "@/app/api/services";
import { useQuery } from "@tanstack/react-query";
import { DataTableSkeletonLoader } from "@/components/skeleton";
import { DataTable } from "@/components/ui/table/data-table";

export default function InvestmentsTable() {
  const { data, isPending } = useQuery({
    queryKey: ["investments"],
    queryFn: () => getAllInvestments(""),
  });
  const dataSource = data?.responseData;

  return (
    <div className="py-10">
      {isPending ? (
        <DataTableSkeletonLoader />
      ) : (
        <DataTable
          searchKey="organizatioName"
          columns={columns}
          data={dataSource}
          filter1="investmentStatus"
        />
      )}
    </div>
  );
}
