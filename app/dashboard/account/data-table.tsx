import { columns } from "./column";
import { useQuery } from "@tanstack/react-query";
import { DataTableSkeletonLoader } from "@/components/skeleton";
import { DataTable } from "@/components/ui/table/data-table";
import { getOrganizationId } from "@/app/api/services";
import { useProfile } from "@/hooks/useRole";

export default function AccountTable() {
  const { data: profile } = useProfile();
  const { data: organization, isPending } = useQuery({
    queryKey: ["organization"],
    queryFn: () => getOrganizationId(`${profile.organizationId}`),
  });

  return (
    <div className="py-10">
      {isPending ? (
        <DataTableSkeletonLoader />
      ) : (
        <DataTable
          searchKey="position"
          columns={columns}
          data={organization?.members}
        />
      )}
    </div>
  );
}
