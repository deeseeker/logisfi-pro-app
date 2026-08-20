import { columns } from "./column";
import { DataTableSkeletonLoader } from "@/components/skeleton";
import { DataTable } from "@/components/ui/table/data-table";
import { useOrganization } from "@/hooks/useRole";

export default function BeneficiaryTable() {
  const { isPending } = useOrganization();
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
