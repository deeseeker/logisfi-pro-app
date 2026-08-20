import { columns } from "./column";
import { DataTableSkeletonLoader } from "@/components/skeleton";
import { DataTable } from "@/components/ui/table/data-table";
import { useOrganization } from "@/hooks/useRole";

export default function OrganizationTable() {
  const { data, isPending } = useOrganization();
  const dataSource = data?.responseData ?? [];

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
