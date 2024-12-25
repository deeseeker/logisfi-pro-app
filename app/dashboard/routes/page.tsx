"use client";

import RoutesTable from "@/components/tables/admin-tables/routes";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ChevronDownIcon, Plus } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { addNewRoute } from "@/app/api/services";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import RouteForm from "@/components/forms/route-form";
import { formSchema, updateRouteSchema } from "@/types/admin";
import CustomDialog from "@/components/dialog/custom-dialog";
import { successModal } from "@/components/custom-toast/success-toast";

export type RouteFormValue = z.infer<typeof formSchema>;
export type UpdateFormValue = z.infer<typeof updateRouteSchema>;
export default function Routes() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Heading title="Routes" description="Manage all your routes" />
        <Dialog modal={false} open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="text-xs md:text-sm bg-customblue">
              <Plus className="mr-2 h-4 w-4" /> Add Route
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Route</DialogTitle>
              <DialogDescription>
                To include multiple routes to the list here. Click the link
                below.
              </DialogDescription>
            </DialogHeader>
            <RouteForm handleOpen={setIsOpen} />
          </DialogContent>
        </Dialog>
      </div>
      <Separator />

      <RoutesTable />
    </div>
  );
}
