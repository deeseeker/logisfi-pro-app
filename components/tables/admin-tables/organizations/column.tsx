"use client";

import {
  deleteOrganization,
  deleteShipper,
  updateOrganization,
} from "@/app/api/services";
import { EditOrganizationValue } from "@/app/dashboard/organization/page";
import EditOrganizationForm from "@/components/forms/organization/update-organization";
import { Icons } from "@/components/icons";
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
import { Iorganization, organizationUpdateSchema } from "@/types/admin";
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
    mutationFn: (organizationId: string) => {
      return deleteOrganization(organizationId);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["organizations"],
      });
      toast({
        title: "Success!",
        description: "The organization lists has been removed successfully.",
      });
    },
  });
  const form = useForm<EditOrganizationValue>({
    resolver: zodResolver(organizationUpdateSchema),
  });

  const [key, setKey] = useState(0);
  const update = useMutation({
    mutationFn: (data: {
      organizationId: string;
      agreedInterestRate: number;
    }) => {
      return updateOrganization(data);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["organizations"],
      });

      form.reset(); // Reset the form
      setKey((prevKey) => prevKey + 1); // Force a rerender by updating the key
    },
  });

  const onSubmit = async (data: EditOrganizationValue) => {
    const formData = {
      agreedInterestRate: Number(data.agreedInterestRate),
      organizationId: id,
    };

    update.mutate(formData);
    if (update.isSuccess) {
      toast({
        title: "Success!",
        description: "The organization lists has been updated successfully.",
      });
    }
  };

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
              router.push(`organizations/${id}`);
            }}
          >
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>
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
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Update Organization</DialogTitle>
            <DialogDescription>
              Update organization on the list here. Click submit when you are
              done.
            </DialogDescription>
          </DialogHeader>
          <EditOrganizationForm
            key={key}
            onSubmit={onSubmit}
            mutation={update}
            form={form}
          />
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
              organization and remove the details from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                mutation.mutate(id);
                if (mutation.isSuccess) setOpen(false);
              }}
            >
              {mutation.isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export const columns: ColumnDef<Iorganization>[] = [
  {
    accessorKey: "organizationName",
    header: "Organization Name",
  },
  {
    accessorKey: "agreedInterestRate",
    header: "Agreed Interest Rate",
  },
  // {
  //   accessorKey: "availableLoanAmount",
  //   header: "Available Loan",
  //   cell: ({ row }) => {
  //     return <span>{row?.original?.wallet?.availableLoanAmount}</span>;
  //   },
  // },
  // {
  //   accessorKey: "loanAmountInUse",
  //   header: "Outstanding balance",
  //   cell: ({ row }) => {
  //     return <span>{row?.original?.wallet?.loanAmountInUse}</span>;
  //   },
  // },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => {
      return <span>{schemaToDate(row?.original?.createdAt)}</span>;
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
