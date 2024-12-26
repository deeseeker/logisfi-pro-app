"use client";

import {
  deleteRoute,
  deleteShipper,
  updateRoute,
  updateShipper,
} from "@/app/api/services";
import {
  VendorFormValue,
  VendorUpdateValue,
} from "@/app/dashboard/(clients)/vendor/page";
import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import ShipperForm from "@/components/forms/shipper/shipper-form";
import EditShipperForm from "@/components/forms/shipper/update-shipper";
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
import { useToast } from "@/components/ui/use-toast";
import { schemaToDate } from "@/lib/utils";
import { formSchema, IVendors, vendorSchema } from "@/types/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, Eye, SquarePen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ActionCell = ({ row }: { row: any }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const id = row.original.id;
  const router = useRouter();
  const [isUpdate, setIsUpdate] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (shipperId: string) => {
      return deleteShipper(shipperId);
    },
    onSuccess: async (res: any) => {
      queryClient.invalidateQueries({
        queryKey: ["shippers"],
      });
      showSuccessAlert(res.responseMessage);
    },
    onError: async (error: any) => {
      showErrorAlert(error.responseMessage);
    },
  });

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
          {/* <DropdownMenuItem
            onClick={() => {
              router.push(`shippers/${id}`);
            }}
          >
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem> */}
          <DropdownMenuItem onClick={() => setIsUpdate(true)}>
            <SquarePen className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-red-600"
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isUpdate} onOpenChange={setIsUpdate}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Update Shipper</DialogTitle>
            <DialogDescription>
              Update shipper on the list here. Click submit when you are done.
            </DialogDescription>
          </DialogHeader>
          <EditShipperForm handleOpen={setIsUpdate} dataSource={row.original} />
        </DialogContent>
      </Dialog>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-500">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              shipper and remove the details from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                mutation.mutate(id);
                setOpen(false);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export const columns: ColumnDef<IVendors>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "phone",
    header: "Phone",
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
    cell: ActionCell,
  },
];
