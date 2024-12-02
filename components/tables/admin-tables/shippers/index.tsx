import { columns } from "./column";
import { getAllShippers } from "@/app/api/services";
import { useQuery } from "@tanstack/react-query";
import { DataTableSkeletonLoader } from "@/components/skeleton";
import { DataTable } from "@/components/ui/table/data-table";

export default function ShippersTable() {
  const { data, isPending } = useQuery({
    queryKey: ["shippers"],
    queryFn: getAllShippers,
  });
  const dataSource = data?.responseData;

  return (
    <div className="py-10">
      {isPending ? (
        <DataTableSkeletonLoader />
      ) : (
        <DataTable searchKey="name" columns={columns} data={dataSource} />
      )}
    </div>
  );
}
