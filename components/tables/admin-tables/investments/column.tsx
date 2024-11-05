"use client";

import {
  deleteRoute,
  deleteShipper,
  updateRoute,
  updateShipper,
} from "@/app/api/services";
import { RouteFormValue } from "@/app/dashboard/routes/page";
import {
  VendorFormValue,
  VendorUpdateValue,
} from "@/app/dashboard/vendors/page";
import { formatEnumKey } from "@/components/forms/order/update-order-form";

import RouteForm from "@/components/forms/route-form";
import ShipperForm from "@/components/forms/shipper-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { schemaToDate } from "@/lib/utils";
import {
  formSchema,
  IInvestments,
  InvestmentStatusEnums,
  IVendors,
  vendorSchema,
} from "@/types/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, Eye, SquarePen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
    accessorKey: "organizationName",
    header: "Organization Name",
    cell: ({ row }) => {
      return <span>{row.original?.organization?.organizationName}</span>;
    },
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
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => {
      return <span>{schemaToDate(row.original.createdAt)}</span>;
    },
  },
  {
    id: "actions",
    cell: ActionCell,
  },
];
