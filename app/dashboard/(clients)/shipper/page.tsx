"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { addNewShipper } from "@/app/api/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { vendorSchema } from "@/types/admin";
import ShippersTable from "@/components/tables/admin-tables/shippers";
import { VendorFormValue } from "../vendor/page";
import ShipperForm from "@/components/forms/shipper-form";
import CustomDialog from "@/components/dialog/custom-dialog";
import Link from "next/link";

export default function Shippers() {
  const { toast } = useToast();
  const form = useForm<any>({
    // resolver: zodResolver(vendorSchema),
  });
  const queryClient = useQueryClient();
  const [key, setKey] = useState(0);
  const mutation = useMutation({
    mutationFn: (data: VendorFormValue) => {
      return addNewShipper(data);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["shippers"],
      });
      toast({
        title: "Success!",
        description: "The shipper lists has been updated successfully.",
      });

      form.reset(); // Reset the form
      setKey((prevKey) => prevKey + 1); // Force a rerender by updating the key
    },
  });

  const onSubmit = async (data: VendorFormValue) => {
    mutation.mutate(data);
  };
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Heading title="Shippers" description="Manage all your shippers" />
        <CustomDialog
          triggerText="Add Shipper"
          title="Add Shipper"
          description={
            <>
              <p>
                To include multiple shippers to the list here. Click the link
                below.
              </p>
              <Link href="#" className="text-customblue text-sm underline">
                Multiple shippers
              </Link>
            </>
          }
          FormComponent={ShipperForm}
          formKey={key}
          onSubmit={onSubmit}
          mutation={mutation}
          form={form}
        />
      </div>
      <Separator />

      <ShippersTable />
    </div>
  );
}
