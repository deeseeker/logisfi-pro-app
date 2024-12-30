import React, { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useForm, UseFormReturn } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPrice, getAllRoutes, withdrawFunds } from "@/app/api/services";
import { useShippers } from "@/hooks/useRole";
import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import Withdrawals from "@/app/dashboard/withdrawal/page";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const FormSchema = z.object({
  amount: z.string(),
  withdrawalType: z.string(),
  narration: z.string(),
});

const Withdraw = ({ handleOpen }: { handleOpen: any }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const queryClient = useQueryClient();
  const [key, setKey] = useState(0);
  const mutation = useMutation({
    mutationFn: (data: any) => {
      return withdrawFunds(data);
    },
    onSuccess: async (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ["withdraw"],
      });
      handleOpen(false);
      showSuccessAlert(data.responseData);

      form.reset(); // Reset the form
      setKey((prevKey) => prevKey + 1); // Force a rerender by updating the key
    },
    onError: async (error: any) => {
      handleOpen(false);
      showErrorAlert(error.responseMessage);
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    const formData = {
      ...data,
      amount: Number(data.amount),
    };

    mutation.mutate(formData);
  }
  return (
    <Form {...form} key={key}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="col-span-3"
                  placeholder="Enter new price..."
                  disabled={mutation.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="withdrawalType"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel>Withdrawal Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select withdrawal type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="interest">Interest</SelectItem>
                  <SelectItem value="loanLiquidation">
                    Loan Liquidation
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="narration"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel>Narration</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="col-span-3"
                  placeholder="Enter new price..."
                  disabled={mutation.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-end">
          <Button type="submit" className="bg-customblue">
            {mutation.isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Withdraw;
