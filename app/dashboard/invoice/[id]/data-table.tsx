import { columns } from "./column";
import { getInvoices } from "@/app/api/services";
import { useQuery } from "@tanstack/react-query";
import { DataTableSkeletonLoader } from "@/components/skeleton";
import { DataTable } from "@/components/ui/table/data-table";

export default function InvoiceIdTable({
  data,
  loading,
}: {
  data: any;
  loading: any;
}) {
  const shipment = data
    ? data?.invoiceItems.map((data: any) => data.shipment)
    : [];

  return (
    <div className="py-10">
      {loading ? (
        <DataTableSkeletonLoader />
      ) : (
        <DataTable
          searchKey="origin"
          columns={columns}
          data={shipment}
          filter1="shipmentStatus"
        />
      )}
    </div>
  );
}
