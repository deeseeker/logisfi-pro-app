import { deletePrice } from "@/app/api/services";
import { ActionCell } from "../custom-cell-action";
import { UpdateShipperPrice } from "@/components/forms/update-price/update-shipper-price";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, SquarePen, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showErrorAlert, showSuccessAlert } from "@/components/alert";

export const ShipperCellAction = ({ row }: { row: any }) => {
  const [open, setOpen] = useState(false);
  const id = row.original.id;
  const [isUpdate, setIsUpdate] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (priceId: string) => {
      return deletePrice("priceId");
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ["shipper-price-list"],
      });
      setIsUpdate(false);
      showSuccessAlert(data.responseMessage);
    },
    onError: (error: any) => {
      console.log(error);
      setIsUpdate(false);
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
            <DialogTitle>Update Price</DialogTitle>
            <DialogDescription>
              Update price list here. Click submit when you are done.
            </DialogDescription>
          </DialogHeader>
          <UpdateShipperPrice handleOpen={setIsUpdate} data={row.original} />
        </DialogContent>
      </Dialog>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-500">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              price and remove the details from our servers.
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
  // <ActionCell
  //   row={row}
  //   entityKey="shipper-price-list"
  //   deleteFunction={deletePrice}
  //   FormComponent={<UpdateShipperPrice data={row.original} />}
  // />
};
