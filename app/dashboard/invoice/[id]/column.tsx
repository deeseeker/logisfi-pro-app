"use client";

import { schemaToDate } from "@/lib/utils";
import { InvoiceStatusEnums, ShipmentStatusEnums } from "@/types/admin";
import { formatNaira } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "truckNumber",
    header: "Truck Number",
  },

  {
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "shipmentDate",
    header: "Shipment Date",
    cell: ({ row }) => {
      return <span>{schemaToDate(row.original.shipmentDate)}</span>;
    },
  },
  {
    accessorKey: "shipperPrice",
    header: "Shipper Price",
    cell: ({ row }) => {
      return <span>{formatNaira(Number(row.getValue("shipperPrice")))}</span>;
    },
  },
  {
    accessorKey: "vendorPrice",
    header: "Vendor Price",
    cell: ({ row }) => {
      return <span>{formatNaira(Number(row.getValue("vendorPrice")))}</span>;
    },
  },
  {
    accessorKey: "shipmentStatus",
    header: "Shipment Status",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {ShipmentStatusEnums[Number(row.getValue("shipmentStatus"))]}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      console.log(row, value);
      const valueNum = value.map(Number);
      return valueNum.includes(row.getValue(id));
    },
  },
];
