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
import { schemaToDate } from "@/lib/utils";
import { ILoad, OrderStatusEnums } from "@/types/admin";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, Eye, SquarePen } from "lucide-react";
import { useState } from "react";
import MobilizeShipmentForm from "@/components/forms/mobilize-load-form";

const ActionCell = ({ row }: { row: any }) => {
  const [open, setOpen] = useState(false);
  const [isMobilize, setIsMobilize] = useState(false);

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
          <DropdownMenuItem>
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsMobilize(true)}>
            <SquarePen className="mr-2 h-4 w-4" /> Mobilize
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isMobilize} onOpenChange={setIsMobilize}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Mobilize Shipment</DialogTitle>
            <DialogDescription>
              Mobilize your shipment here. Click submit when you are done.
            </DialogDescription>
          </DialogHeader>
          <MobilizeShipmentForm data={row.original} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export const columns: ColumnDef<ILoad>[] = [
  {
    accessorKey: "shipmentDate",
    header: "Shipment Date",
    cell: ({ row }) => {
      return <span>{schemaToDate(row.original.shipmentDate)}</span>;
    },
  },
  {
    accessorKey: "shipmentNumber",
    header: "Shipment No.",
    cell: ({ row }) => {
      return <span>{row.original.shipmentNumber}</span>;
    },
  },
  {
    accessorKey: "vendor",
    header: "Vendor",
    cell: ({ row }) => {
      return <span>{row.original.vendor.name}</span>;
    },
  },
  {
    accessorKey: "vendorPrice",
    header: "Vendor Price",
    cell: ({ row }) => {
      return <span>{row.original.vendorPrice}</span>;
    },
  },
  {
    accessorKey: "shipper",
    header: "Shipper",
    cell: ({ row }) => {
      return <span>{row.original.shipper.name}</span>;
    },
  },
  {
    accessorKey: "shipperPrice",
    header: "Shipper Price",
    cell: ({ row }) => {
      return <span>{row.original.shipperPrice}</span>;
    },
  },

  {
    accessorKey: "truckNumber",
    header: "Truck No.",
    cell: ({ row }) => {
      return <span>{row.original.truckNumber}</span>;
    },
  },
  {
    header: "Shipment Status",
    cell: ({ row }) => {
      const statusKey = Number(row.original.shipmentStatus);

      return <span>{OrderStatusEnums[statusKey]}</span>;
    },
  },
  {
    id: "actions",
    cell: ActionCell,
  },
];
