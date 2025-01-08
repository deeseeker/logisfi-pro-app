import React, { useEffect, useState } from "react";
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
import { availableLoanWallet, mobilizeShipment } from "@/app/api/services";
import { useToast } from "../ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useOrganization } from "@/hooks/useRole";

const TopupForm = ({ form, onSubmit, mutation, key }: any) => {
  const { data, isPending, isError } = useOrganization();
  const orgData = data?.responseData;
  return (
    <Form {...form} key={key}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="text" disabled={mutation.isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="organizationId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an organization" />
                  </SelectTrigger>
                  <SelectContent>
                    {isPending ? (
                      <SelectItem value="loading" disabled>
                        Loading...
                      </SelectItem>
                    ) : isError ? (
                      <SelectItem value="error" disabled>
                        Error fetching organizations
                      </SelectItem>
                    ) : (
                      orgData?.map((orgData: any) => (
                        <SelectItem key={orgData.id} value={orgData.id}>
                          {orgData.organizationName}
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
        <div className="text-end mt-4">
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

export default TopupForm;
