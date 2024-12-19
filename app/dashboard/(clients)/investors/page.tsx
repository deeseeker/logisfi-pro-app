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

export default function Organization() {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Heading title="Investors" description="Manage all your investors" />
        <CustomDialog
          triggerText="Add Investor"
          title="Add Investor"
          description="Fill in the details to add a new investor and click submit when you are done."
          FormComponent={OrganizationForm}
        />
      </div>
      <Separator />

      <OrganizationTable />
    </div>
  );
}
