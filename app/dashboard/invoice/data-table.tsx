import { columns } from "./column";
import { getInvoices } from "@/app/api/services";
import { useQuery } from "@tanstack/react-query";
import { DataTableSkeletonLoader } from "@/components/skeleton";
import { DataTable } from "@/components/ui/table/data-table";

export default function InvoiceTable() {
  const { data, isPending } = useQuery({
    queryKey: ["invoices"],
    queryFn: () => getInvoices(),
  });
  console.log(data);
  return (
    <div className="py-10">
      {isPending ? (
        <DataTableSkeletonLoader />
      ) : (
        <DataTable
          searchKey="shipper_name"
          columns={columns}
          data={data}
          filter1="invoiceStatus"
        />
      )}
    </div>
  );
}
