"use client";
import { schemaToDate } from "@/lib/utils";
import { IPrice } from "@/types/admin";
import { ColumnDef } from "@tanstack/react-table";
import { ShipperCellAction } from "./cell-action";
import { formatNaira } from "@/utils/helpers";

export const columns: ColumnDef<IPrice>[] = [
  {
    accessorKey: "route",
    header: "Origin",
    cell: ({ row }) => {
      const origin = row.original.route.origin;
      return <span>{origin}</span>;
    },
  },
  {
    accessorKey: "destination",
    header: "Destination",
    cell: ({ row }) => {
      const destination = row.original.route.destination;
      return <span>{destination}</span>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return <span>{formatNaira(Number(row.getValue("price")))}</span>;
    },
  },
  {
    accessorKey: "truckSize",
    header: "Truck Size",
    cell: ({ row }) => {
      const destination = row.original.truckSize.size;
      return <span>{destination}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => {
      return <span>{schemaToDate(row.original.createdAt)}</span>;
    },
  },
  {
    accessorKey: "modifiedAt",
    header: "Date Modified",
    cell: ({ row }) => {
      return <span>{schemaToDate(row.original.modifiedAt)}</span>;
    },
  },
  {
    id: "actions",
    cell: ShipperCellAction,
  },
];
