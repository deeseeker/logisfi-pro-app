import { DataTable } from "@/components/ui/data-table";
import { columns } from "./column";
import { getAllPrice, getAllVPrice } from "@/app/api/services";
import { useQuery } from "@tanstack/react-query";
import { DataTableSkeletonLoader } from "@/components/skeleton";

export default function VendorPriceList() {
  const { data, isPending } = useQuery({
    queryKey: ["vendor-price-list"],
    queryFn: getAllVPrice,
  });
  const dataSource = data?.responseData ?? [];

  return (
    <div className="py-10">
      {isPending ? (
        <DataTableSkeletonLoader />
      ) : (
        <DataTable
          searchKey="vendor-price"
          columns={columns}
          data={dataSource}
        />
      )}
    </div>
  );
}
