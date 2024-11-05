"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { addNewOrganization } from "@/app/api/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { organizationSchema, organizationUpdateSchema } from "@/types/admin";
import ShippersTable from "@/components/tables/admin-tables/shippers";
import CustomDialog from "@/components/dialog/custom-dialog";
import Link from "next/link";
import OrganizationForm from "@/components/forms/organization/organization-form";
import OrganizationTable from "@/components/tables/admin-tables/organizations";

export type EditOrganizationValue = z.infer<typeof organizationUpdateSchema>;
export type OrganizationFormValue = z.infer<typeof organizationSchema>;
export default function Organization() {
  const { toast } = useToast();
  const form = useForm<OrganizationFormValue>({
    resolver: zodResolver(organizationSchema),
  });
  const queryClient = useQueryClient();
  const [key, setKey] = useState(0);
  const mutation = useMutation({
    mutationFn: (data: any) => {
      return addNewOrganization(data);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["organization"],
      });
      toast({
        title: "Success!",
        description: "The organization lists has been updated successfully.",
      });

      form.reset(); // Reset the form
      setKey((prevKey) => prevKey + 1); // Force a rerender by updating the key
    },
  });

  const onSubmit = (data: OrganizationFormValue) => {
    const formData = {
      organizationName: data.organizationName,
      agreedInterestRate: Number(data.agreedInterestRate),
      referringOrganizationId: "",
      initialAdmin: {
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
        phoneNumber: data?.phoneNumber,
      },
      organizationType: "Investor",
    };
    mutation.mutate(formData);
  };
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Heading
          title="Organizations"
          description="Manage all your organizations"
        />
        <CustomDialog
          triggerText="Add Organization"
          title="Add Organization"
          description="Fill in the details to add a new organization and click submit when you are done."
          FormComponent={OrganizationForm}
          formKey={key}
          onSubmit={onSubmit}
          mutation={mutation}
          form={form}
        />
      </div>
      <Separator />

      <OrganizationTable />
    </div>
  );
}
