"use client";

import { deleteRoute, updateRoute } from "@/app/api/services";
import { RouteFormValue, UpdateFormValue } from "@/app/dashboard/routes/page";
import { successModal } from "@/components/custom-toast/success-toast";

import RouteForm from "@/components/forms/route-form";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { schemaToDate } from "@/lib/utils";
import { formSchema, IRoutes } from "@/types/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import {
  EllipsisVertical,
  SquarePen,
  Trash,
  TriangleAlert,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ActionCell = ({ row }: { row: any }) => {
  const [open, setOpen] = useState(false);

  const [isUpdate, setIsUpdate] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (routeId: string) => {
      return deleteRoute(routeId);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["routes"],
      });
      successModal({
        title: "Success",
        description: "The item has been successfully deleted.",
      });
    },
    onError: (error: any) => {
      successModal({
        title: `Error ${error.responseCode}!`,
        description: `There was an error deleting the item: ${error?.responseMessage}`,
        iconClassName: "fill-red-500 text-white",
        Icon: TriangleAlert,
      });
    },
  });
  const form = useForm<UpdateFormValue>({
    resolver: zodResolver(formSchema),
  });

  const [key, setKey] = useState(0);
  const update = useMutation({
    mutationFn: (data: UpdateFormValue) => {
      return updateRoute(data);
    },
    onSuccess: async (data) => {
      queryClient.invalidateQueries({
        queryKey: ["routes"],
      });
      successModal({
        title: "Success",
        description: "The route details has been updated successfully",
      });
      form.reset(); // Reset the form
      setKey((prevKey) => prevKey + 1); // Force a rerender by updating the key
    },
    onError: (error: any) => {
      console.log(error);
      successModal({
        title: `Error ${error.responseCode}!`,
        description: `There was an error updating the route details: ${error?.responseMessage}`,
        iconClassName: "fill-red-500 text-white",
        Icon: TriangleAlert,
      });
    },
  });

  const onSubmit = async (data: UpdateFormValue) => {
    data.id = row.original.id;
    update.mutate(data);
  };

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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Route</DialogTitle>
            <DialogDescription>
              Include a route to the list here. Click submit when you are done.
            </DialogDescription>
          </DialogHeader>
          <RouteForm
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
              the route and remove the details from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                mutation.mutate(row.original.id);
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

export const columns: ColumnDef<IRoutes>[] = [
  {
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "destination",
    header: "Destination",
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
