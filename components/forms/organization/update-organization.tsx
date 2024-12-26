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
import { EditOrganizationValue } from "./organization-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { organizationUpdateSchema } from "@/types/admin";
import { updateOrganization } from "@/app/api/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showErrorAlert, showSuccessAlert } from "@/components/alert";

interface OrganizationFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  mutation: { isPending: boolean };
  key?: number;
}

const EditOrganizationForm = ({
  dataSource,
  handleOpen,
}: {
  dataSource: any;
  handleOpen: any;
}) => {
  const form = useForm<EditOrganizationValue>({
    defaultValues: {
      agreedInterestRate: dataSource.agreedInterestRate || "",
    },
    resolver: zodResolver(organizationUpdateSchema),
  });
  const queryClient = useQueryClient();

  const [key, setKey] = useState(0);
  const update = useMutation({
    mutationFn: (data: {
      organizationId: string;
      agreedInterestRate: number;
    }) => {
      return updateOrganization(data);
    },
    onSuccess: async (res: any) => {
      queryClient.invalidateQueries({
        queryKey: ["organization"],
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

  const onSubmit = async (data: EditOrganizationValue) => {
    const formData = {
      agreedInterestRate: Number(data.agreedInterestRate),
      organizationId: dataSource.id,
    };

    update.mutate(formData);
  };

  return (
    <Form {...form} key={key}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="pr-4 w-full mb-4">
          <FormField
            control={form.control}
            name="agreedInterestRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agreed Interest Rate</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="20"
                    className="col-span-3"
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

export default EditOrganizationForm;
