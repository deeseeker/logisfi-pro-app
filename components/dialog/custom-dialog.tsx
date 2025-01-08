"use client";
import { ReactNode, useState } from "react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface IDialog {
  triggerText: string;
  title: string;
  description: ReactNode;
  FormComponent: any;
  formKey?: number;
  onSubmit?: (data: any) => void;
  mutation?: any;
  form?: any;
}
const CustomDialog = ({
  triggerText,
  title,
  description,
  FormComponent,
  formKey,
  onSubmit,
  mutation,
  form,
}: IDialog) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-customblue hover:bg-blue-500">
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`${
          triggerText === "Add Route" || triggerText === "Top up"
            ? "sm:max-w-[500px]"
            : "sm:max-w-[600px]"
        }`}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <FormComponent
          // key={formKey}
          handleOpen={setIsOpen}
          onSubmit={onSubmit}
          mutation={mutation}
          form={form}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
