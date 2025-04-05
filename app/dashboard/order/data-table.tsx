import { columns } from "./column";
import { getAllOrders } from "@/app/api/services";
import { useQuery } from "@tanstack/react-query";
import { DataTableSkeletonLoader } from "@/components/skeleton";
import { DataTable } from "@/components/ui/table/data-table";

export default function OrdersTable() {
  const { data, isPending } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });
  const dataSource = data?.responseData ?? [];

  return (
    <div className="py-10">
      {isPending ? (
        <DataTableSkeletonLoader />
      ) : (
        <DataTable
          columns={columns}
          data={dataSource}
          searchKey="shipper_name"
          filter1="orderStatus"
        />
      )}
    </div>
  );
}
