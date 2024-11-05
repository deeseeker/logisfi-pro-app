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

const FormSchema = z.object({
  neededAmount: z.string(),
  organizationId: z.string(),
});

interface Organization {
  id: string;
  organizationName: string;
}

interface LoanData {
  id: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  availableLoanAmount: number;
  loanAmountInUse: number;
  interestEarned: number;
  organization: Organization;
}
const MobilizeShipmentForm = ({ data }: { data: any }) => {
  console.log(data);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [key, setKey] = useState(0);
  const mutation = useMutation({
    mutationFn: (data: any) => {
      return mobilizeShipment(data);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["loads"],
      });
      toast({
        title: "Success!",
        description: "Load has been mobilized successfully.",
      });

      form.reset(); // Reset the form
      setKey((prevKey) => prevKey + 1); // Force a rerender by updating the key
    },
  });

  // State to hold the inputted Amount
  const inputtedAmount = form.watch("neededAmount");
  console.log(inputtedAmount);

  // Use React Query to fetch networks based on the selected country
  const {
    data: wallets,
    isLoading: loadingWallets,
    error: walletError,
    refetch: refetchAvailableLoan,
  } = useQuery({
    queryKey: ["available-loan-wallet", inputtedAmount],
    queryFn: () => {
      console.log(`Fetching: ${inputtedAmount}`);
      return availableLoanWallet({
        neededAmount: 0.01 * Number(inputtedAmount) * data.vendorPrice,
      });
    },
    enabled: !!inputtedAmount,
  });
  console.log(wallets);
  // Fetch networks when the selected country changes
  useEffect(() => {
    if (inputtedAmount) {
      refetchAvailableLoan();
    }
  }, [inputtedAmount, refetchAvailableLoan]);
  function onSubmit(dataSource: {
    neededAmount: string;
    organizationId: string;
  }) {
    const formData = {
      shipmentId: data.id,
      organizationId: dataSource.organizationId,
      percentToMobilize: Number(dataSource.neededAmount),
    };
    console.log(formData);
    mutation.mutate(formData);
  }
  return (
    <Form {...form} key={key}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="neededAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Percentage Amount</FormLabel>
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
              <FormLabel>Available Wallets</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a available wallets" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingWallets ? (
                      <SelectItem value="loading" disabled>
                        Loading...
                      </SelectItem>
                    ) : walletError ? (
                      <SelectItem value="error" disabled>
                        Error fetching wallets
                      </SelectItem>
                    ) : (
                      wallets?.map((wallet: LoanData) => (
                        <SelectItem
                          key={wallet.organization.id}
                          value={wallet.organization.id}
                        >
                          {wallet.organization.organizationName}
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

export default MobilizeShipmentForm;
