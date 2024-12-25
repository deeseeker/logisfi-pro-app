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
import { ErrorModal } from "@/components/custom-toast/error-toast";
import { successModal } from "@/components/custom-toast/success-toast";
import { useProfile } from "@/hooks/useRole";
import AccountTable from "./data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export type MemberFormValue = z.infer<typeof memberSchema>;
export default function Account() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: profile } = useProfile();
  const { data: organization, isPending } = useQuery({
    queryKey: ["organization"],
    queryFn: () => getOrganizationId(`${profile.organizationId}`),
  });

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Heading title="Account" description="Manage all your account" />
        <Dialog modal={false} open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="text-xs md:text-sm bg-customblue">
              <Plus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Member</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new member and click submit when
                you are done.
              </DialogDescription>
            </DialogHeader>
            <MemberForm handleOpen={setIsOpen} />
          </DialogContent>
        </Dialog>
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
                      {organization?.organizationName}
                    </CardDescription>
                  </div>
                  <div>
                    <h3>Date Created</h3>
                    <CardDescription>
                      {schemaToDate(organization?.createdAt)}
                    </CardDescription>
                  </div>
                  <div>
                    <h3>Agreed Interest Rate</h3>
                    <CardDescription>
                      {organization?.agreedInterestRate}%
                    </CardDescription>
                  </div>
                  <div>
                    <h3>Interest Earned</h3>
                    <CardDescription>
                      {organization?.wallet?.interestEarned}
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </Card>

            <AccountTable />
          </>
        )}
      </div>
    </div>
  );
}
