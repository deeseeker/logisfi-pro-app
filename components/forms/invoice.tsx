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
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPrice, generateInvoice, getAllRoutes } from "@/app/api/services";
import { useShippers } from "@/hooks/useRole";
import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const FormSchema = z.object({
  shipperId: z.string({
    required_error: "Please select a shipper.",
  }),
});

const InvoiceForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { data: Shippers, isPending: loading } = useShippers();
  const queryClient = useQueryClient();
  const [key, setKey] = useState(0);
  const mutation = useMutation({
    mutationFn: (data: any) => {
      return generateInvoice(data);
    },
    onSuccess: async (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ["invoices"],
      });

      showSuccessAlert(data.responseMessage);

      form.reset(); // Reset the form
      setKey((prevKey) => prevKey + 1); // Force a rerender by updating the key
    },
    onError: async (error: any) => {
      showErrorAlert(error.responseMessage);
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = {
      shipperId: data.shipperId,
    };

    mutation.mutate(formData);
  }
  return (
    <Form {...form} key={key}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="shipperId"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel>Shipper</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a shipper to generate invoice" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Shippers?.map((data: any) => (
                    <SelectItem key={data.id} value={data.id}>
                      {loading ? "loading..." : <span>{data.name}</span>}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-end">
          <Button type="submit" className="bg-customblue">
            {mutation.isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Generate
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InvoiceForm;
