"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { addNewOrganization } from "@/app/api/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { organizationSchema, organizationUpdateSchema } from "@/types/admin";
import ShippersTable from "@/components/tables/admin-tables/shippers";
import CustomDialog from "@/components/dialog/custom-dialog";
import Link from "next/link";
import OrganizationForm from "@/components/forms/organization/organization-form";
import OrganizationTable from "@/components/tables/admin-tables/organizations";
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

export default function Organization() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Heading title="Investors" description="Manage all your investors" />
        <Dialog modal={false} open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="text-xs md:text-sm bg-customblue">
              <Plus className="mr-2 h-4 w-4" /> Add Investor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Investor</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new investor and click submit when
                you are done.
              </DialogDescription>
            </DialogHeader>
            <OrganizationForm handleOpen={setIsOpen} />
          </DialogContent>
        </Dialog>
      </div>
      <Separator />

      <OrganizationTable />
    </div>
  );
}
