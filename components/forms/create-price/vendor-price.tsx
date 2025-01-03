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
import {
  createPrice,
  createVendorPrice,
  getAllRoutes,
} from "@/app/api/services";
import { useVendors } from "@/hooks/useRole";
import { showErrorAlert, showSuccessAlert } from "@/components/alert";

interface VendorPriceFormProps {
  vendorId: string;
  handleOpen: any;
}

const FormSchema = z.object({
  routeId: z.string({
    required_error: "Please select a route.",
  }),
  vendorId: z.string({
    required_error: "Please select a vendor.",
  }),
  price: z.string(),
});

const VendorPriceForm: React.FC<VendorPriceFormProps> = ({
  vendorId,
  handleOpen,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const { data, isPending } = useQuery({
    queryKey: ["routes"],
    queryFn: getAllRoutes,
  });
  const { data: Vendors, isPending: loading } = useVendors();
  const queryClient = useQueryClient();
  const dataSource = data?.responseData;
  const [key, setKey] = useState(0);
  const mutation = useMutation({
    mutationFn: (data: any) => {
      return createVendorPrice(data);
    },
    onSuccess: async (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ["vendor-price-list"],
      });

      showSuccessAlert(data.responseData);
      handleOpen(false);

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
      vendorId: data.vendorId,
      vendorPrices: [
        {
          routeId: data.routeId,
          price: data.price,
        },
      ],
    };
    console.log(formData);
    mutation.mutate(formData);
  }

  return (
    <Form {...form} key={key}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="vendorId"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel>Vendor</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a vendor to add price" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Vendors?.map((data: any) => (
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
        <FormField
          control={form.control}
          name="routeId"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel>Route</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a route to add price" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {dataSource?.map((data: any) => (
                    <SelectItem key={data.id} value={data.id}>
                      {isPending ? (
                        "loading..."
                      ) : (
                        <span>
                          {data.origin} - {data.destination}
                        </span>
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
          name="price"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel>New Price</FormLabel>
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

export default VendorPriceForm;
