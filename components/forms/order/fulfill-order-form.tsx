import React, { Dispatch, SetStateAction, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "../../ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fulfillOrder, getAllVendors, updateOrder } from "@/app/api/services";
import { ErrorModal } from "@/components/custom-toast/error-toast";
import { showErrorAlert, showSuccessAlert } from "@/components/alert";

const FormSchema = z.object({
  vendorId: z.string({
    required_error: "Please select a route.",
  }),
  driverName: z.string(),
  driverPhone: z.string(),
  truckNumber: z.string(),
});
const FulfillOrderForm = ({ data }: { data: any }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const results = useQuery({
    queryKey: ["vendors"],
    queryFn: getAllVendors,
  });
  const vendors = results?.data?.responseData;
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [key, setKey] = useState(0);
  const mutation = useMutation({
    mutationFn: (data: any) => {
      return fulfillOrder(data);
    },
    onSuccess: async (res: any) => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      showSuccessAlert(res.responseMessage);

      form.reset(); // Reset the form
      setKey((prevKey) => prevKey + 1); // Force a rerender by updating the key
    },
    onError: async (error: any) => {
      const errorMessage =
        error?.responseMessage || "An unexpected error occurred.";

      showErrorAlert(errorMessage);

      ErrorModal({
        description: errorMessage,
      });
    },
  });

  function onSubmit(dataSource: z.infer<typeof FormSchema>) {
    const formData = {
      orderId: data?.id,
      shipmentPayloads: [
        {
          vendorId: dataSource.vendorId,
          driverName: dataSource.driverName,
          driverPhone: dataSource.driverPhone,
          truckNumber: dataSource.truckNumber,
        },
      ],
    };
    mutation.mutate(formData);
  }
  return (
    <Form {...form} key={key}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="vendorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vendor</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select vendor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {vendors?.map((data: any) => (
                      <SelectItem key={data.id} value={data.id}>
                        {results.isPending ? (
                          "loading..."
                        ) : (
                          <span>{data.name}</span>
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="driverName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Driver Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="col-span-3"
                    disabled={mutation.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="driverPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Driver No.</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="col-span-3"
                    disabled={mutation.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="truckNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Truck No.</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="col-span-3"
                    disabled={mutation.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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

export default FulfillOrderForm;
