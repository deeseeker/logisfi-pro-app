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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  VendorFormValue,
  VendorUpdateValue,
} from "@/app/dashboard/(clients)/vendor/page";
import { addNewShipper, updateShipper } from "@/app/api/services";
import { showErrorAlert, showSuccessAlert } from "../../alert";
import { vendorSchema } from "@/types/admin";

export const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name cannot exceed 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces",
    }),
  address: z
    .string()
    .min(1, { message: "Address is required" })
    .max(100, { message: "Address cannot exceed 100 characters" }),
  state: z
    .string()
    .min(1, { message: "State is required" })
    .max(50, { message: "State cannot exceed 50 characters" }),
  phone: z.string().regex(/^\+\d{1,4}\d{7,10}$/, {
    message:
      "Phone number must start with a valid country code (e.g., +234) followed by 7 to 10 digits",
  }),
  country: z
    .string()
    .min(1, { message: "Country is required" })
    .max(50, { message: "Country cannot exceed 50 characters" }),
  city: z
    .string()
    .min(1, { message: "City is required" })
    .max(50, { message: "City cannot exceed 50 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export type ShipperFormValue = z.infer<typeof formSchema>;

const EditShipperForm = ({ handleOpen, dataSource }: any) => {
  const form = useForm<ShipperFormValue>({
    defaultValues: {
      name: dataSource.name || "",
      address: dataSource.address || "",
      state: dataSource.state || "",
      phone: dataSource.phone || "",
      country: dataSource.country || "",
      city: dataSource.city || "",
      email: dataSource.email || "",
    },
    resolver: zodResolver(formSchema),
  });
  const queryClient = useQueryClient();
  const [key, setKey] = useState(0);
  const update = useMutation({
    mutationFn: (data: VendorUpdateValue) => {
      return updateShipper(data);
    },
    onSuccess: async (res: any) => {
      queryClient.invalidateQueries({
        queryKey: ["shippers"],
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

  const onSubmit = async (data: ShipperFormValue) => {
    console.log(data);
    const formData = {
      ...data,
      id: dataSource.id,
    };
    update.mutate(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-5 py-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter name..."
                    className="col-span-3"
                    disabled={update.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter address..."
                    className="col-span-3"
                    disabled={update.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter state..."
                    className="col-span-3"
                    disabled={update.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter phone..."
                    className="col-span-3"
                    disabled={update.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="col-span-3"
                    placeholder="Enter country..."
                    disabled={update.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="col-span-3"
                    placeholder="Enter city..."
                    disabled={update.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="col-span-3"
                    placeholder="Enter email..."
                    disabled={update.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="text-end">
          <Button
            type="submit"
            disabled={update.isPending}
            className="bg-customblue"
          >
            {update.isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditShipperForm;
