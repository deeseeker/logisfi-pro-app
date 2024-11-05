import { DataTable } from "@/components/ui/data-table";
import { columns } from "./column";
import { getAllTransactions } from "@/app/api/services";
import { useQuery } from "@tanstack/react-query";
import { DataTableSkeletonLoader } from "@/components/skeleton";

export default function TransactionsTable() {
  const { data, isPending } = useQuery({
    queryKey: ["transactions"],
    queryFn: getAllTransactions,
  });
  const dataSource = data?.responseData;

  return (
    <div className="py-10">
      {isPending ? (
        <DataTableSkeletonLoader />
      ) : (
        <DataTable
          searchKey="transactions"
          columns={columns}
          data={dataSource}
        />
      )}
    </div>
  );
}
