"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { schemaToDate } from "@/lib/utils";
import {
  ILoad,
  MobilizationStatusEnums,
  OrderStatusEnums,
} from "@/types/admin";
import { formatNaira } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, Eye } from "lucide-react";

const ActionCell = ({ row }: { row: any }) => {
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
          <DropdownMenuItem>
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "Mobilization Date",
    header: "Date Created",
    cell: ({ row }) => {
      return <span>{schemaToDate(row.original.createdAt)}</span>;
    },
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
  {
    accessorKey: "mobilizationStatus",
    header: "Mobilization Status",
    cell: ({ row }) => {
      return (
        <span>
          {MobilizationStatusEnums[Number(row.getValue("mobilizationStatus"))]}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      const valueNum = value.map(Number);
      return valueNum.includes(row.getValue(id));
    },
  },

  {
    id: "actions",
    cell: ActionCell,
  },
];
