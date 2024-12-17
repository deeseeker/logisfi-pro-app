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
  // {
  //   accessorKey: "organization.organizatioName",
  //   header: "Organization Name",
  // },
  {
    accessorKey: "investedAmount",
    header: "Disbursed Amount",
    cell: ({ row }) => {
      return <span>{formatNaira(Number(row.getValue("investedAmount")))}</span>;
    },
  },
  {
    accessorKey: "investmentDate",
    header: "Disbursement Date",
    cell: ({ row }) => {
      return <span>{schemaToDate(row.original.investmentDate)}</span>;
    },
  },
  {
    accessorKey: "roi",
    header: "ROI",
    cell: ({ row }) => {
      return <span>{formatNaira(Number(row.getValue("roi")))}</span>;
    },
  },
  {
    accessorKey: "maturityValue",
    header: "Maturity Value",
    cell: ({ row }) => {
      return <span>{formatNaira(Number(row.getValue("maturityValue")))}</span>;
    },
  },

  {
    accessorKey: "investmentStatus",
    header: "Loan Status",

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
  // {
  //   accessorKey: "createdAt",
  //   header: "Date Created",
  //   cell: ({ row }) => {
  //     return <span>{schemaToDate(row.original.createdAt)}</span>;
  //   },
  // },
];
