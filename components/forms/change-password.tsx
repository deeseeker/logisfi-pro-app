"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getApiErrorMessage } from "@/lib/api/errors";
import { useChangePassword } from "@/lib/api/hooks/auth";

const FormSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Use at least 8 characters"),
    confirmNewPassword: z.string().min(1, "Confirm the new password"),
  })
  .refine((values) => values.newPassword === values.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

type ChangePasswordFormValues = z.infer<typeof FormSchema>;

export function ChangePasswordForm() {
  const [key, setKey] = useState(0);
  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const mutation = useChangePassword({
    onSuccess: (response) => {
      showSuccessAlert(response.responseMessage ?? "Password updated");
      form.reset();
      setKey((prev) => prev + 1);
    },
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });

  return (
    <Form {...form} key={key}>
      <form
        onSubmit={form.handleSubmit((values) =>
          mutation.mutate({
            body: {
              currentPassword: values.currentPassword,
              newPassword: values.newPassword,
              confirmNewPassword: values.confirmNewPassword,
            },
          })
        )}
        className="grid gap-4"
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current password</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="current-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="new-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm new password</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="new-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-end">
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="bg-customblue"
          >
            {mutation.isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Update password
          </Button>
        </div>
      </form>
    </Form>
  );
}
