import { columns } from "./column";
import { getAllOrganizations } from "@/app/api/services";
import { useQuery } from "@tanstack/react-query";
import { DataTableSkeletonLoader } from "@/components/skeleton";
import { DataTable } from "@/components/ui/table/data-table";

export default function OrganizationTable() {
  const { data, isPending } = useQuery({
    queryKey: ["organization"],
    queryFn: getAllOrganizations,
  });
  const dataSource = data?.responseData;

  return (
    <div className="py-10">
      {isPending ? (
        <DataTableSkeletonLoader />
      ) : (
        <DataTable
          searchKey="organizationName"
          columns={columns}
          data={dataSource}
        />
      )}
    </div>
  );
}
