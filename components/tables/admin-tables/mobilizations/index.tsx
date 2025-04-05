import { DataTable } from "@/components/ui/data-table";
import { columns } from "./column";
import { getAllMobilizations, getAllShipments } from "@/app/api/services";
import { useQuery } from "@tanstack/react-query";
import { DataTableSkeletonLoader } from "@/components/skeleton";

export default function MobilizationsTable() {
  const { data, isPending } = useQuery({
    queryKey: ["mobilizations"],
    queryFn: () => getAllMobilizations(),
  });
  console.log(data);
  const dataSource = data?.responseData ?? [];

  return (
    <div className="py-10">
      {isPending ? (
        <DataTableSkeletonLoader />
      ) : (
        <DataTable
          searchKey="mobilizations"
          columns={columns}
          data={dataSource}
        />
      )}
    </div>
  );
}
