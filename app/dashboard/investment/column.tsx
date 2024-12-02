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
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

const ActionCell = ({ row }: { row: any }) => {
  const id = row.original.id;
  const router = useRouter();

  return (
    <>
      <DropdownMenu>
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
              router.push("#");
            }}
          >
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const columns: ColumnDef<IInvestments>[] = [
  {
    accessorKey: "organization.organizatioName",
    header: "Organization Name",
  },
  {
    accessorKey: "investedAmount",
    header: "Invested Amount",
  },
  {
    accessorKey: "investmentDate",
    header: "Investment Date",
    cell: ({ row }) => {
      return <span>{schemaToDate(row.original.investmentDate)}</span>;
    },
  },
  {
    accessorKey: "roi",
    header: "ROI",
  },
  {
    accessorKey: "maturityValue",
    header: "Maturity Value",
  },

  {
    accessorKey: "investmentStatus",
    header: "Investment Status",

    cell: ({ row }) => {
      return (
        <span>
          {formatEnumKey(
            InvestmentStatusEnums[Number(row.original.investmentStatus)]
          )}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      const valueNum = value.map(Number);
      return valueNum.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => {
      return <span>{schemaToDate(row.original.createdAt)}</span>;
    },
  },
];
