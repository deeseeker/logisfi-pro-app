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
import { getAllRoutes } from "@/app/api/services";
import { UpdatePriceSchema } from "@/types/admin";
import { showErrorAlert, showSuccessAlert } from "@/components/alert";

interface PriceFormProps {
  dataSource: any;
  mutationFn: (data: any) => Promise<any>;
  queryKey: string;
  keyTitle: string;
  onOpen: any;
}

const UpdatePriceForm: React.FC<PriceFormProps> = ({
  dataSource,
  mutationFn,
  queryKey,
  keyTitle,
  onOpen,
}) => {
  const form = useForm<z.infer<typeof UpdatePriceSchema>>({
    defaultValues: {
      newPrice: dataSource.price || "",
    },
    resolver: zodResolver(UpdatePriceSchema),
  });

  const { data, isPending } = useQuery({
    queryKey: ["routes"],
    queryFn: getAllRoutes,
  });

  const queryClient = useQueryClient();

  const [key, setKey] = useState(0);

  const mutation = useMutation({
    mutationFn: mutationFn,
    onSuccess: async (res: any) => {
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
      onOpen(false);
      showSuccessAlert(res.responseMessage);
      form.reset(); // Reset the form
      setKey((prevKey) => prevKey + 1); // Force a rerender by updating the key
    },
    onError: async (error: any) => {
      onOpen(false);
      showErrorAlert(error.responseMessage);
    },
  });

  const onSubmit = async (data: any) => {
    data[`${keyTitle}`] = dataSource.id;
    mutation.mutate(data);
  };

  return (
    <Form {...form} key={key}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="newPrice"
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

export default UpdatePriceForm;
