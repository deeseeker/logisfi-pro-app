"use client";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { schemaToDate } from "@/lib/utils";
import { formatNaira } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "Mobilization Date",
    header: "Mobilization Date",
    cell: ({ row }) => {
      return <span>{schemaToDate(row.original.createdAt)}</span>;
    },
  },
  {
    accessorKey: "shipment.shipmentNumber",
    header: "Shipment Number",
  },
  {
    accessorKey: "shipment.origin",
    header: "Origin",
  },
  {
    accessorKey: "shipment.destination",
    header: "Destination",
  },
  {
    accessorKey: "shipment.shipper.name",
    header: "Shipper",
  },
  {
    accessorKey: "beneficiaryName",
    header: "Beneficiary Name",
  },
  {
    accessorKey: "beneficiaryAccountNumber",
    header: "Beneficiary Account Number",
  },
  {
    accessorKey: "bankName",
    header: "Bank Name",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      return <span>{formatNaira(Number(row.getValue("amount")))}</span>;
    },
  },
  // {
  //   accessorKey: "mobilizationStatus",
  //   header: "Mobilization Status",
  //   cell: ({ row }) => {
  //     return (
  //       <span>
  //         {MobilizationStatusEnums[Number(row.getValue("mobilizationStatus"))]}
  //       </span>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     const valueNum = value.map(Number);
  //     return valueNum.includes(row.getValue(id));
  //   },
  // },

  // {
  //   id: "actions",
  //   cell: ActionCell,
  // },
];
