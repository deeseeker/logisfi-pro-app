import UpdateOrderForm, {
  formatEnumKey,
} from "@/components/forms/order/update-order-form";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { schemaToDate } from "@/lib/utils";
import { formSchema, OrderStatusEnums } from "@/types/admin";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  EllipsisVertical,
  Eye,
  Signature,
  SquarePen,
} from "lucide-react";
import { UpdateFormValue } from "../routes/page";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fulfillOrder, updateRoute } from "@/app/api/services";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FulfillOrderForm from "@/components/forms/order/fulfill-order-form";
import { showErrorAlert } from "@/components/alert";

export type Order = {
  id: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  numberOfTrucks: number;
  orderStatus: string;
  user: User;
  shipper: Shipper;
  route: Route;
};
export interface User {
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

export interface Route {
  id: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  origin: string;
  destination: string;
}

const ActionCell = ({ row }: { row: any }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const [isUpdate, setIsUpdate] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: any) => {
      return fulfillOrder(data);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      toast({
        title: "Success!",
        description: "The order has been fulfilled successfully.",
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
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["routes"],
      });
      toast({
        title: "Success!",
        description: "The route  lists has been updated successfully.",
      });

      form.reset(); // Reset the form
      setKey((prevKey) => prevKey + 1); // Force a rerender by updating the key
    },
  });

  const onSubmit = async (data: UpdateFormValue) => {
    data.id = row.original.id;
    console.log(data);
    update.mutate(data);
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
          <DropdownMenuItem>
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              const status = OrderStatusEnums[row.original.orderStatus];

              if (status === "CompletelyFulfilled") {
                showErrorAlert("This order has been fulfilled");
              } else if (status === "Cancelled") {
                showErrorAlert("This order has been cancelled");
              } else {
                setIsUpdate(true);
              }
            }}
          >
            <SquarePen className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              const status = OrderStatusEnums[row.original.orderStatus];

              if (status === "CompletelyFulfilled") {
                showErrorAlert("This order has been fulfilled");
              } else if (status === "Cancelled") {
                showErrorAlert("This order has been cancelled");
              } else {
                setOpen(true);
              }
            }}
          >
            <Signature className="mr-2 h-4 w-4" /> Fulfill
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isUpdate} onOpenChange={setIsUpdate}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Order</DialogTitle>
            <DialogDescription>
              Edit your order information here. Click submit when you are done.
            </DialogDescription>
          </DialogHeader>
          <UpdateOrderForm data={row.original} />
        </DialogContent>
      </Dialog>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Fulfill Order</DialogTitle>
            <DialogDescription>
              Fulfill your order information here. Click submit when you are
              done.
            </DialogDescription>
          </DialogHeader>
          <FulfillOrderForm data={row.original} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            console.log("clicked");
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Date Requested
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span>{schemaToDate(row.original.createdAt)}</span>;
    },
  },
  {
    accessorKey: "route.origin",
    // header: "Origin",
    // cell: ({ row }) => row.original.route.origin,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Origin" />
    ),
    // cell: ({ row }) => (
    //   <div className="w-[150px] capitalize">{row.original.route.origin}</div>
    // ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "shipper.name",
    header: "Shipper",

    filterFn: (row, id, value) => {
      const serviceName = `${row.original.shipper.name}`;
      return serviceName.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
    cell: ({ row }) =>
      row.original?.user?.firstName + " " + row.original?.user?.lastName,
  },
  {
    accessorKey: "orderStatus",
    // header: "Order Status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {formatEnumKey(
              OrderStatusEnums[Number(row.getValue("orderStatus"))]
            )}
          </span>
        </div>
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
