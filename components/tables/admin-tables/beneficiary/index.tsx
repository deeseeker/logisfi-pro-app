import { columns } from "./column";
import { getAllOrganizations } from "@/app/api/services";
import { useQuery } from "@tanstack/react-query";
import { DataTableSkeletonLoader } from "@/components/skeleton";
import { DataTable } from "@/components/ui/table/data-table";

export default function BeneficiaryTable() {
  const { data, isPending } = useQuery({
    queryKey: ["organization"],
    queryFn: getAllOrganizations,
  });
  const dataSource: any = [];

  return (
    <div className="py-10">
      {isPending ? (
        <DataTableSkeletonLoader />
      ) : (
        <DataTable searchKey="" columns={columns} data={dataSource} />
      )}
    </div>
  );
}
