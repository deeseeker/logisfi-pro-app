import React from "react";
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
import { UseFormReturn } from "react-hook-form";

interface OrganizationFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  mutation: { isPending: boolean };
  key?: number;
}

const EditOrganizationForm = ({
  form,
  onSubmit,
  mutation,
  key,
}: OrganizationFormProps) => {
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

export default EditOrganizationForm;
