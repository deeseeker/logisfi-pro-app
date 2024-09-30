"use client";

import RoutesTable from "@/components/tables/admin-tables/routes";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ChevronDownIcon } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { addNewRoute } from "@/app/api/services";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import RouteForm from "@/components/forms/route-form";
import { formSchema, updateRouteSchema } from "@/types/admin";
import CustomDialog from "@/components/dialog/custom-dialog";
import { successModal } from "@/components/custom-toast/success-toast";

export type RouteFormValue = z.infer<typeof formSchema>;
export type UpdateFormValue = z.infer<typeof updateRouteSchema>;
export default function Routes() {
  const form = useForm<RouteFormValue>({
    resolver: zodResolver(formSchema),
  });
  const queryClient = useQueryClient();
  const [key, setKey] = useState(0);
  const mutation = useMutation({
    mutationFn: (data: RouteFormValue) => {
      return addNewRoute(data);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["routes"],
      });
      successModal({
        title: "Success",
        description: "The route details has been included successfully",
      });

      form.reset(); // Reset the form
      setKey((prevKey) => prevKey + 1); // Force a rerender by updating the key
    },
  });

  const onSubmit = async (data: RouteFormValue) => {
    mutation.mutate(data);
  };
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Heading title="Routes" description="Manage all your routes" />
        <CustomDialog
          triggerText="Add Route"
          title="Add Route"
          description={
            <>
              <p>
                To include multiple routes to the list here. Click the link
                below.
              </p>
              <Link href="#" className="text-customblue text-sm underline">
                Multiple routes
              </Link>
            </>
          }
          FormComponent={RouteForm}
          formKey={key}
          onSubmit={onSubmit}
          mutation={mutation}
          form={form}
        />
      </div>
      <Separator />

      <RoutesTable />
    </div>
  );
}
