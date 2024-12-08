import { getAllMobilizations } from "@/app/api/services";
import { useQuery } from "@tanstack/react-query";
import { DataTableSkeletonLoader } from "@/components/skeleton";
import { DataTable } from "@/components/ui/table/data-table";
import { columns } from "./column";
import { useProfile } from "@/hooks/useRole";

export default function InvestorMobilizations({ data, isPending }: any) {
  return (
    <div className="py-10">
      {isPending ? (
        <DataTableSkeletonLoader />
      ) : (
        <DataTable data={data} columns={columns} searchKey="beneficiaryName" />
      )}
    </div>
  );
}
