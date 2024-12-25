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
import { RouteFormValue } from "@/app/dashboard/routes/page";
import { formSchema } from "@/types/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewRoute } from "@/app/api/services";
import { showErrorAlert, showSuccessAlert } from "../alert";

const RouteForm = ({ handleOpen, data }: { handleOpen: any; data?: any }) => {
  const form = useForm<RouteFormValue>({
    defaultValues: {
      origin: data?.origin || "",
      destination: data?.destination || "",
    },
    resolver: zodResolver(formSchema),
  });
  const queryClient = useQueryClient();
  const [key, setKey] = useState(0);
  const mutation = useMutation({
    mutationFn: (data: RouteFormValue) => {
      return addNewRoute(data);
    },
    onSuccess: async (res: any) => {
      queryClient.invalidateQueries({
        queryKey: ["routes"],
      });
      handleOpen(false);
      showSuccessAlert(res.responseMessage);

      form.reset(); // Reset the form
      setKey((prevKey) => prevKey + 1); // Force a rerender by updating the key
    },
    onError: async (error: any) => {
      handleOpen(false);
      showErrorAlert(error.responseMessage);
    },
  });

  const onSubmit = async (data: RouteFormValue) => {
    mutation.mutate(data);
  };
  return (
    <Form {...form} key={key}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="origin"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Origin</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  // placeholder="Enter origin..."
                  className="col-span-3"
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
          name="destination"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Destination</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="col-span-3"
                  placeholder="Enter destination..."
                  disabled={mutation.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-end">
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="bg-customblue"
          >
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

export default RouteForm;
