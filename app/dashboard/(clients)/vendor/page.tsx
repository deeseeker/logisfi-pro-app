"use client";
import { Heading } from "@/components/ui/heading";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { vendorSchema, vendorUpdateSchema } from "@/types/admin";
import VendorForm from "@/components/forms/vendor-form";
import VendorsTable from "@/components/tables/admin-tables/vendors";
import { addNewVendor, getAllBanks } from "@/app/api/services";
import { Separator } from "@/components/ui/separator";
import CustomDialog from "@/components/dialog/custom-dialog";
import Link from "next/link";
import { showErrorAlert, showSuccessAlert } from "@/components/alert";
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

export type VendorFormValue = z.infer<typeof vendorSchema>;
export type VendorUpdateValue = z.infer<typeof vendorUpdateSchema>;
export default function Vendors({ handleOpen }: any) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Heading title="Vendors" description="Manage all your vendors" />
        <Dialog modal={false} open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="text-xs md:text-sm bg-customblue">
              <Plus className="mr-2 h-4 w-4" /> Add Vendor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Vendor</DialogTitle>
              <DialogDescription>
                Include an order to the list here. Click submit when you are
                done.
              </DialogDescription>
            </DialogHeader>
            <VendorForm handleOpen={setIsOpen} />
          </DialogContent>
        </Dialog>
      </div>
      <Separator />
      <VendorsTable />
    </div>
  );
}
