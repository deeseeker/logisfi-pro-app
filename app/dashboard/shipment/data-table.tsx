import { columns } from "./column";
import { getAllShipments } from "@/app/api/services";
import { useQuery } from "@tanstack/react-query";
import { DataTableSkeletonLoader } from "@/components/skeleton";
import { DataTable } from "@/components/ui/table/data-table";

export default function Shipments() {
  const { data, isPending } = useQuery({
    queryKey: ["shipments"],
    queryFn: getAllShipments,
  });
  const dataSource = data?.responseData;
  return (
    <div className="py-10">
      {isPending ? (
        <DataTableSkeletonLoader />
      ) : (
        <DataTable
          columns={columns}
          data={dataSource}
          searchKey="truckNumber"
          filter1="shipmentStatus"
          filter2="mobilizationStatus"
        />
        // <DataTable searchKey='origin' columns={columns} data={dataSource} />
      )}
    </div>
  );
}
