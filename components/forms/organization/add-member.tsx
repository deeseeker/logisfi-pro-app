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
} from "@/components/ui/select";
import { memberSchema, RoleEnum } from "@/types/admin";
import { useProfile } from "@/hooks/useRole";
import { MemberFormValue } from "@/app/dashboard/account/page";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewMember } from "@/app/api/services";
import { showErrorAlert, showSuccessAlert } from "@/components/alert";

const MemberForm = ({ handleOpen }: { handleOpen: any }) => {
  const { data: profile } = useProfile();
  const form = useForm<MemberFormValue>({
    resolver: zodResolver(memberSchema),
  });
  const queryClient = useQueryClient();
  const [key, setKey] = useState(0);
  const mutation = useMutation({
    mutationFn: (data: any) => {
      return addNewMember(data);
    },
    onSuccess: async (res: any) => {
      queryClient.invalidateQueries({
        queryKey: ["organization"],
      });
      console.log(res);
      handleOpen(false);
      showSuccessAlert(res.responseData);

      form.reset(); // Reset the form
      setKey((prevKey) => prevKey + 1); // Force a rerender by updating the key
    },
    onError: async (error: any) => {
      console.log(error);
      const errorMessage =
        error?.responseMessage || "An unexpected error occurred.";
      handleOpen(false);
      showErrorAlert(error.responseMessage);
    },
  });
  const onSubmit = (data: any) => {
    const formData = {
      ...data,
      userType: profile.userType,
      organizationId: profile.organizationId,
    };
    console.log(formData);
    mutation.mutate(formData);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-5 py-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter first name..."
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
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter last name..."
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
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter phone number..."
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
            name="userRole"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role for your member" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* Map through the RoleEnum to create options */}
                    {Object.entries(RoleEnum)
                      .filter(([key]) => isNaN(Number(key))) // Exclude reverse-mapped numeric keys
                      .map(([key, value]) => (
                        <SelectItem key={value} value={value.toString()}>
                          {key}
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter email..."
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
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter gender..."
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
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter position..."
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

export default MemberForm;
