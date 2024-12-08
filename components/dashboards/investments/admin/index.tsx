"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import CustomDialog from "@/components/dialog/custom-dialog";
import { ErrorModal } from "@/components/custom-toast/error-toast";
import { successModal } from "@/components/custom-toast/success-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { topupLoan } from "@/app/api/services";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import TopupForm from "@/components/forms/top-up-loan";
import InvestmentsTable from "@/app/dashboard/investment/data-table";

const FormSchema = z.object({
  amount: z.string(),
  organizationId: z.string(),
});
export type TopupFormValue = z.infer<typeof FormSchema>;
export default function AdminInvestments() {
  const form = useForm<TopupFormValue>({
    resolver: zodResolver(FormSchema),
  });
  const queryClient = useQueryClient();
  const [key, setKey] = useState(0);
  const mutation = useMutation({
    mutationFn: (data: any) => {
      return topupLoan(data);
    },
    onSuccess: async (res: any) => {
      queryClient.invalidateQueries({
        queryKey: ["organization"],
      });
      successModal({
        description:
          res.responseMessage ||
          "The organization data has been updated successfully.",
      });
      form.reset(); // Reset the form
      setKey((prevKey) => prevKey + 1); // Force a rerender by updating the key
    },
    onError: async (error: any) => {
      console.log(error);
      const errorMessage =
        error?.responseMessage || "An unexpected error occurred.";

      ErrorModal({
        description: errorMessage,
      });
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Heading title="Loans" description="Manage all your loans" />

        <CustomDialog
          triggerText="Top up"
          title="Top up"
          description="Top up loans for organizations."
          FormComponent={TopupForm}
          formKey={key}
          onSubmit={onSubmit}
          mutation={mutation}
          form={form}
        />
      </div>
      <Separator />

      <InvestmentsTable />
    </div>
  );
}
