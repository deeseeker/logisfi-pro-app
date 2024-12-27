"use client";
import { formatEnumKey } from "@/components/forms/order/update-order-form";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { schemaToDate } from "@/lib/utils";
import { InvoiceStatusEnums } from "@/types/admin";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

const ActionCell = ({ row }: { row: any }) => {
  const id = row.original.id;
  const router = useRouter();

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              router.push(`invoice/${id}`);
            }}
          >
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "invoiceDate",
    header: "Invoice Date",
    cell: ({ row }) => {
      return <span>{schemaToDate(row.original.invoiceDate)}</span>;
    },
  },

  {
    accessorKey: "invoiceNumber",
    header: "Invoice Number",
    cell: ({ row }) => {
      return <span>{row.original.invoiceNumber}</span>;
    },
  },
  {
    accessorKey: "shipper.name",
    header: "Shipper",
  },
  {
    accessorKey: "invoiceStatus",
    header: "Invoice Status",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {InvoiceStatusEnums[Number(row.getValue("invoiceStatus"))]}
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
  {
    id: "actions",
    cell: ActionCell,
  },
];
