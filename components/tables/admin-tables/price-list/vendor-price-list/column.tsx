"use client";
import { schemaToDate } from "@/lib/utils";
import { IPrice, priceSchema, priceUpdateSchema } from "@/types/admin";
import { ColumnDef } from "@tanstack/react-table";
import * as z from "zod";
import { VendorCellAction } from "./cell-action";
import { formatNaira } from "@/utils/helpers";

export type PriceFormValue = z.infer<typeof priceSchema>;
export type UpdatePriceValue = z.infer<typeof priceUpdateSchema>;

export const columns: ColumnDef<IPrice>[] = [
  {
    accessorKey: "vendor",
    header: "Vendor",
    cell: ({ row }) => {
      const origin = row.original.vendor?.name || "";
      return <span>{origin}</span>;
    },
  },
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
    cell: VendorCellAction,
  },
];
