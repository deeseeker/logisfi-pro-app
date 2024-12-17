"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
});

export type UserFormValue = z.infer<typeof formSchema>;

export default function ForgotPasswordForm() {
  const defaultValues = {
    email: "",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <>
      <Form {...form}>
        <form className="w-full space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="ml-auto w-full bg-customblue" type="submit">
            {false ? "processing..." : "Reset Password"}
          </Button>
        </form>
      </Form>
    </>
  );
}
