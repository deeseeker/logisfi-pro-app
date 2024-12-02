"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { ChevronDownIcon } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { vendorSchema, vendorUpdateSchema } from "@/types/admin";
import VendorForm from "@/components/forms/vendor-form";
import VendorsTable from "@/components/tables/admin-tables/vendors";
import { addNewVendor } from "@/app/api/services";
import { Separator } from "@/components/ui/separator";
import CustomDialog from "@/components/dialog/custom-dialog";
import Link from "next/link";

export type VendorFormValue = z.infer<typeof vendorSchema>;
export type VendorUpdateValue = z.infer<typeof vendorUpdateSchema>;
export default function Vendors() {
  const { toast } = useToast();
  const form = useForm<VendorFormValue>({
    resolver: zodResolver(vendorSchema),
  });
  const queryClient = useQueryClient();
  const [key, setKey] = useState(0);
  const mutation = useMutation({
    mutationFn: (data: any) => {
      return addNewVendor(data);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["vendors"],
      });
      toast({
        title: "Success!",
        description: "The vendor lists has been updated successfully.",
      });

      form.reset(); // Reset the form
      setKey((prevKey) => prevKey + 1); // Force a rerender by updating the key
    },
  });

  const onSubmit = async (data: VendorFormValue) => {
    const formData = {
      name: data.name,
      address: data.address,
      city: data.city,
      state: data.state,
      country: data.country,
      phone: data.phone,
      email: data.email,
      vendorBankDetail: {
        accountNumber: data.accountNumber,
        accountName: data.accountName,
        bankName: data.bankName,
      },
    };
    mutation.mutate(formData);
  };
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Heading title="Vendors" description="Manage all your vendors" />
        <CustomDialog
          triggerText="Add Vendor"
          title="Add Vendor"
          description={
            <>
              <p>
                To include multiple vendors to the list here. Click the link
                below.
              </p>
              <Link href="#" className="text-customblue text-sm underline">
                Multiple vendors
              </Link>
            </>
          }
          FormComponent={VendorForm}
          formKey={key}
          onSubmit={onSubmit}
          mutation={mutation}
          form={form}
        />
      </div>
      <Separator />
      <VendorsTable />
    </div>
  );
}
