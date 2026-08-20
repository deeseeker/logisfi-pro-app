import { columns } from "./column";
import { DataTableSkeletonLoader } from "@/components/skeleton";
import { DataTable } from "@/components/ui/table/data-table";
import { useShippers } from "@/hooks/useRole";

export default function ShippersTable() {
  const { data, isPending } = useShippers();

  return (
    <div className="py-10">
      {isPending ? (
        <DataTableSkeletonLoader />
      ) : (
        <DataTable searchKey="name" columns={columns} data={data ?? []} />
      )}
    </div>
  );
}
