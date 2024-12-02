import { getAllMobilizations } from "@/app/api/services";
import { useQuery } from "@tanstack/react-query";
import { DataTableSkeletonLoader } from "@/components/skeleton";
import { DataTable } from "@/components/ui/table/data-table";
import { columns } from "./column";

export default function MobilizationTable() {
  const { data, isPending } = useQuery({
    queryKey: ["mobilizations"],
    queryFn: getAllMobilizations,
  });
  console.log(data);
  const dataSource = data?.responseData;

  return (
    <div className="py-10">
      {isPending ? (
        <DataTableSkeletonLoader />
      ) : (
        <DataTable
          data={dataSource}
          columns={columns}
          searchKey="beneficiaryName"
          filter2="mobilizationStatus"
        />
      )}
    </div>
  );
}
