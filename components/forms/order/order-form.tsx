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
  createOrder,
  createPrice,
  getAllRoutes,
  getAllShippers,
} from "@/app/api/services";
import { showErrorAlert, showSuccessAlert } from "@/components/alert";

const FormSchema = z.object({
  routeId: z.string({
    required_error: "Please select a route.",
  }),
  shipperId: z.string({
    required_error: "Please select a route.",
  }),
});
const OrderForm = ({ handleOpen }: any) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const { data, isPending, isLoading, isError } = useQuery({
    queryKey: ["routes"],
    queryFn: getAllRoutes,
  });
  const {
    data: shippers,
    isPending: loading,
    isError: error,
  } = useQuery({
    queryKey: ["shippers"],
    queryFn: getAllShippers,
  });

  const queryClient = useQueryClient();
  const dataSource = data?.responseData ?? [];

  const [key, setKey] = useState(0);
  const mutation = useMutation({
    mutationFn: (data: any) => {
      return createOrder(data);
    },
    onSuccess: async (res: any) => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      handleOpen(false);
      showSuccessAlert(res.responseMessage);

      form.reset(); // Reset the form
      setKey((prevKey) => prevKey + 1); // Force a rerender by updating the key
    },
    onError: async (error: any) => {
      console.log(error);
      handleOpen(false);
      showErrorAlert(error.responseMessage);
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    const formData = {
      routeId: data.routeId,
      shipperId: data.shipperId,
      numberOfTrucks: "1",
    };
    mutation.mutate(formData);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="routeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Route</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a route" />
                    </SelectTrigger>
                    <SelectContent>
                      {isPending ? (
                        <SelectItem value="loading" disabled>
                          Loading...
                        </SelectItem>
                      ) : isError ? (
                        <SelectItem value="error" disabled>
                          Error fetching routes
                        </SelectItem>
                      ) : (
                        dataSource?.map((data: any) => (
                          <SelectItem key={data.id} value={data.id}>
                            {data.origin} - {data.destination}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="routeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Route</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a route" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {dataSource
                      ? dataSource?.map((data: any) => (
                          <SelectItem key={data.id} value={data.id}>
                            <span>
                              {data.origin} - {data.destination}
                            </span>
                          </SelectItem>
                        ))
                      : "loading..."}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="shipperId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shipper</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a shipper" />
                    </SelectTrigger>
                    <SelectContent>
                      {loading ? (
                        <SelectItem value="loading" disabled>
                          Loading...
                        </SelectItem>
                      ) : error ? (
                        <SelectItem value="error" disabled>
                          Error fetching shippers
                        </SelectItem>
                      ) : (
                        shippers?.map((data: any) => (
                          <SelectItem key={data.id} value={data.id}>
                            {data.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="shipperId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shipper</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a shipper" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isPending ? (
                      <SelectItem disabled value="loading">
                        <p>Loading...</p>
                      </SelectItem>
                    ) : (
                      shippers?.map((data: any) => (
                        <SelectItem key={data.id} value={data.id}>
                          <span>{data.name}</span>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          /> */}
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

export default OrderForm;
