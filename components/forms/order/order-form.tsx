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

const FormSchema = z.object({
  routeId: z.string({
    required_error: "Please select a route.",
  }),
  shipperId: z.string({
    required_error: "Please select a route.",
  }),
});
const OrderForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const { data, isPending } = useQuery({
    queryKey: ["routes"],
    queryFn: getAllRoutes,
  });
  const results = useQuery({
    queryKey: ["shippers"],
    queryFn: getAllShippers,
  });
  const shippers = results?.data?.responseData;
  const queryClient = useQueryClient();
  const dataSource = data?.responseData;
  const { toast } = useToast();
  const [key, setKey] = useState(0);
  const mutation = useMutation({
    mutationFn: (data: any) => {
      return createOrder(data);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      toast({
        title: "Success!",
        description: "Order has been created successfully.",
      });

      form.reset(); // Reset the form
      setKey((prevKey) => prevKey + 1); // Force a rerender by updating the key
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
    <Form {...form} key={key}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
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
                    {shippers?.map((data: any) => (
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
        </div>
        {/* <FormField
          control={form.control}
          name='numberOfTrucks'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Trucks</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='col-span-3'
                  disabled={mutation.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
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
