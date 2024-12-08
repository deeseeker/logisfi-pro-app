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
import { schemaToDate } from "@/lib/utils";
import { IInvestments, InvestmentStatusEnums } from "@/types/admin";
import { formatNaira } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<IInvestments>[] = [
  {
    accessorKey: "transactionDate",
    header: "Transaction Date",
    cell: ({ row }) => {
      return <span>{schemaToDate(row.getValue("transactionDate"))}</span>;
    },
  },
  {
    accessorKey: "transactionReference",
    header: "Transaction Reference",
  },
  {
    accessorKey: "narration",
    header: "Narration",
  },

  {
    accessorKey: "balanceBeforeTransaction",
    header: "Bal. Before Trans",
    cell: ({ row }) => {
      return (
        <span>
          {formatNaira(Number(row.getValue("balanceBeforeTransaction")))}
        </span>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Transaction Amount",
    cell: ({ row }) => {
      return <span>{formatNaira(Number(row.getValue("amount")))}</span>;
    },
  },
  {
    accessorKey: "balanceAfterTransaction",
    header: "Bal. After Trans",
    cell: ({ row }) => {
      return (
        <span>
          {formatNaira(Number(row.getValue("balanceAfterTransaction")))}
        </span>
      );
    },
  },

  // {
  //   accessorKey: "investmentStatus",
  //   header: "Investment Status",

  //   cell: ({ row }) => {
  //     return (
  //       <span>
  //         {formatEnumKey(
  //           InvestmentStatusEnums[Number(row.original.investmentStatus)]
  //         )}
  //       </span>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     const valueNum = value.map(Number);
  //     return valueNum.includes(row.getValue(id));
  //   },
  // },
];
