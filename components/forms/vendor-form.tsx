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
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewVendor, getAllBanks } from "@/app/api/services";
import { VendorFormValue } from "@/app/dashboard/(clients)/vendor/page";
import { showErrorAlert, showSuccessAlert } from "../alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { vendorSchema } from "@/types/admin";

const VendorForm = ({ handleOpen }: any) => {
  const { data, isPending, isLoading, isError } = useQuery({
    queryKey: ["banks"],
    queryFn: getAllBanks,
  });
  const form = useForm<VendorFormValue>({
    resolver: zodResolver(vendorSchema),
  });

  const queryClient = useQueryClient();
  const [key, setKey] = useState(0);
  const mutation = useMutation({
    mutationFn: (data: any) => {
      return addNewVendor(data);
    },
    onSuccess: async (res: any) => {
      queryClient.invalidateQueries({
        queryKey: ["vendors"],
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

  const onSubmit = async (data: VendorFormValue) => {
    const formData = {
      name: data.name,
      address: data.address,
      city: data.city,
      state: data.state,
      country: data.country,
      phone: data.phone,
      email: data.email,
      vendorBankDetail: {
        accountNumber: data.accountNumber,
        accountName: data.accountName,
        bankCode: data.bankCode,
      },
    };
    mutation.mutate(formData);
  };
  return (
    <Form {...form} key={key}>
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
                    placeholder=""
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder=""
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
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder=""
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder=""
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
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="col-span-3"
                    placeholder=""
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
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="col-span-3"
                    placeholder=""
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="col-span-3"
                    placeholder=""
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
            name="accountName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="col-span-3"
                    placeholder=""
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
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="col-span-3"
                    placeholder=""
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
            name="bankCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banks</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoading ? (
                        <SelectItem value="loading" disabled>
                          Loading...
                        </SelectItem>
                      ) : isError ? (
                        <SelectItem value="error" disabled>
                          Error fetching routes
                        </SelectItem>
                      ) : (
                        data?.map((bank: any) => (
                          <SelectItem key={bank.code} value={bank.code}>
                            {bank.name}
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
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="col-span-3"
                    placeholder=""
                    disabled={mutation.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>

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

export default VendorForm;
