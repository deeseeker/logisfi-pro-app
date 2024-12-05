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
import {
  ILoad,
  MobilizationStatusEnums,
  ShipmentStatusEnums,
} from "@/types/admin";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, Eye, SquarePen } from "lucide-react";
import { useState } from "react";
import MobilizeShipmentForm from "@/components/forms/mobilize-load-form";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { showErrorAlert } from "@/components/alert";
import { splitCamelCase } from "@/utils/helpers";
export interface IShipment {
  id: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  shipmentNumber: string;
  origin: string;
  destination: string;
  vendorId: string;
  vendor: Vendor;
  shipper: Shipper;
  shipperPrice: number;
  vendorPrice: number;
  percentMobilized: number;
  percentRemainingToMobilize: number;
  shipmentDate: string;
  shipmentStatus: string;
  mobilizationStatus: string;
  driverName: string;
  driverPhone: string;
  truckNumber: string;
  mobilizations: Mobilization[];
  invoiceItem: InvoiceItem;
}

export interface Vendor {
  id: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  vendorBankDetail: VendorBankDetail;
}

export interface VendorBankDetail {
  id: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  bankCode: string;
}

export interface Shipper {
  id: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
}

export interface Mobilization {
  id: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  beneficiaryAccountNumber: string;
  beneficiaryName: string;
  bankName: string;
  bankCode: string;
  amount: number;
  mobilizationStatus: string;
  shipment: string;
  organizationId: string;
  organization: Organization;
  investment: Investment;
}
export interface Organization {
  id: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  organizationName: string;
  agreedInterestRate: number;
  wallet: Wallet;
  members: Member[];
  referredOrganizations: string[];
}

export interface Wallet {
  id: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  availableLoanAmount: number;
  loanAmountInUse: number;
  interestEarned: number;
  organization: Organization;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  position: string;
  phoneNumber: string;
  userType: string;
  organizationId: string;
}

export interface Investment {
  id: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  investedAmount: number;
  investmentDate: string;
  roi: number;
  maturityValue: number;
  maturityDate: string;
  investmentStatus: string;
  mobilization: string;
  organization: Organization;
}
export interface InvoiceItem {
  id: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  shipmentId: string;
  shipment: Shipment;
}

export interface Shipment {
  id: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  shipmentNumber: string;
  origin: string;
  destination: string;
  vendorId: string;
  vendor: Vendor;
  shipperPrice: number;
  vendorPrice: number;
  percentMobilized: number;
  percentRemainingToMobilize: number;
  shipmentDate: string;
  shipmentStatus: string;
  mobilizationStatus: string;
  driverName: string;
  driverPhone: string;
  truckNumber: string;
  mobilizations: Mobilization[];
}
const ActionCell = ({ row }: { row: any }) => {
  const [open, setOpen] = useState(false);
  const [isMobilize, setIsMobilize] = useState(false);
  const status = MobilizationStatusEnums[row.original.mobilizationStatus];

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
          {status !== "Mobilized" && (
            <DropdownMenuItem
              onClick={() => {
                setIsMobilize(true);
              }}
            >
              <SquarePen className="mr-2 h-4 w-4" />{" "}
              {status !== "PartlyMobilized" ? "Mobilize" : "Balance"}
            </DropdownMenuItem>
          )}
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

export const columns: ColumnDef<IShipment>[] = [
  {
    accessorKey: "shipmentDate",
    header: "Shipment Date",
    cell: ({ row }) => {
      return <span>{schemaToDate(row.original.shipmentDate)}</span>;
    },
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
    accessorKey: "driverName",
    header: "Driver Name",
  },
  {
    accessorKey: "vendor.name",
    header: "Vendor",
  },
  {
    accessorKey: "vendorPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vendor Price" />
    ),
  },
  {
    accessorKey: "shipper.name",
    header: "Shipper",
  },
  {
    accessorKey: "shipperPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shipper Price" />
    ),
  },

  {
    accessorKey: "truckNumber",
    header: "Truck No.",
  },
  {
    accessorKey: "shipmentStatus",
    header: "Shipment Status",
    cell: ({ row }) => {
      const statusKey = Number(row.original.shipmentStatus);
      console.log("debu", Number(row.getValue("shipmentStatus")));
      return (
        <span>
          {ShipmentStatusEnums[Number(row.getValue("shipmentStatus"))]}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      const valueNum = value.map(Number);
      return valueNum.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "percentMobilized",
    header: "Percent Mobilized",
  },

  {
    accessorKey: "mobilizationStatus",
    header: "Mobilization Status",
    cell: ({ row }) => {
      return (
        <span>
          {splitCamelCase(
            MobilizationStatusEnums[Number(row.getValue("mobilizationStatus"))]
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
    id: "actions",
    cell: ActionCell,
  },
];
