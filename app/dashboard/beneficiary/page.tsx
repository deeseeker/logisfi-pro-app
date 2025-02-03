"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
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
import BeneficiaryForm from "@/components/forms/beneficiary";
import BeneficiaryTable from "@/components/tables/admin-tables/beneficiary";

export default function Beneficiary() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Heading
          title="Beneficiary"
          description="Manage all your beneficiaries"
        />
        <Dialog modal={false} open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="text-xs md:text-sm bg-customblue">
              <Plus className="mr-2 h-4 w-4" /> Add Beneficiary
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Beneficiary</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new beneficiary and click submit
                when you are done.
              </DialogDescription>
            </DialogHeader>
            <BeneficiaryForm handleOpen={setIsOpen} />
          </DialogContent>
        </Dialog>
      </div>
      <Separator />

      <BeneficiaryTable />
    </div>
  );
}
