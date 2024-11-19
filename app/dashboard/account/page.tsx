"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { addNewMember, getOrganizationId } from "@/app/api/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { memberSchema } from "@/types/admin";
import CustomDialog from "@/components/dialog/custom-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

import { schemaToDate } from "@/lib/utils";
import MemberForm from "@/components/forms/organization/add-member";
import { AccountAndMembersShimmer } from "@/components/skeleton/account";
import { useAuth } from "@/context/AuthContext";
import { ErrorModal } from "@/components/custom-toast/error-toast";
import { error } from "console";
import { successModal } from "@/components/custom-toast/success-toast";

export type MemberFormValue = z.infer<typeof memberSchema>;
export default function Account() {
  const { profile } = useAuth();
  const { data, isPending } = useQuery({
    queryKey: ["organization"],
    queryFn: () => getOrganizationId(`${profile.organizationId}`),
  });
  const dataSource = data?.responseData;
  const { toast } = useToast();
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
      successModal({
        description:
          res.responseData ||
          "The organization data has been updated successfully.",
      });
      form.reset(); // Reset the form
      setKey((prevKey) => prevKey + 1); // Force a rerender by updating the key
    },
    onError: async (error: any) => {
      console.log(error);
      const errorMessage =
        error?.responseMessage || "An unexpected error occurred.";

      ErrorModal({
        description: errorMessage,
      });
    },
  });
  const labelMap: { [key: string]: string } = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    gender: "Gender",
    position: "Position",
    phoneNumber: "Phone Number",
    userType: "User Type",
  };

  const onSubmit = (data: any) => {
    console.log(profile.userType, data);
    const formData = {
      ...data,
      userType: profile.userType,
      organizationId: profile.organizationId,
    };
    console.log(formData);
    mutation.mutate(formData);
  };
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Heading title="Account" description="Manage all your account" />
        <CustomDialog
          triggerText="Add Member"
          title="Add Member"
          description="Fill in the details to add a new member and click submit when you are done."
          FormComponent={MemberForm}
          formKey={key}
          onSubmit={onSubmit}
          mutation={mutation}
          form={form}
        />
      </div>
      <Separator />
      <div className="space-y-4">
        {isPending ? (
          <AccountAndMembersShimmer />
        ) : (
          <>
            <Card>
              <CardHeader>
                <h2>Account details</h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-y-12 justify-between">
                  <div>
                    <h3>Account Name</h3>
                    <CardDescription>
                      {dataSource?.organizationName}
                    </CardDescription>
                  </div>
                  <div>
                    <h3>Date Created</h3>
                    <CardDescription>
                      {schemaToDate(dataSource?.createdAt)}
                    </CardDescription>
                  </div>
                  <div>
                    <h3>Agreed Interest Rate</h3>
                    <CardDescription>
                      {dataSource?.agreedInterestRate}%
                    </CardDescription>
                  </div>
                  <div>
                    <h3>Interest Earned</h3>
                    <CardDescription>
                      {dataSource?.wallet?.interestEarned}
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h2>Members</h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-y-12 justify-between">
                  {dataSource?.members?.map((member: any, index: any) => (
                    <div
                      key={index}
                      className="grid gap-y-12 pb-4 border-b border-gray-200"
                    >
                      {Object.entries(member).map(([key, value]) =>
                        // Only display fields that are defined in labelMap
                        labelMap[key] ? (
                          <div key={key}>
                            <h3>{labelMap[key]}</h3>
                            <CardDescription>
                              {value !== null && value !== undefined
                                ? String(value)
                                : "N/A"}
                            </CardDescription>
                          </div>
                        ) : null
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
