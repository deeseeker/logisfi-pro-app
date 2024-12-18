"use client";
import { forgotPassword } from "@/app/api/services";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { showErrorAlert, showSuccessAlert } from "../alert";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
});

export type UserFormValue = z.infer<typeof formSchema>;

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const defaultValues = {
    email: "",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValue) => {
    console.log(data);

    setLoading(true);
    const res = await forgotPassword(data);

    if (res.isSuccess) {
      setLoading(false);

      showSuccessAlert(res.responseData);
      route.push("/");
    } else {
      setLoading(false);

      console.log(res);
      showErrorAlert(res.responseMessage);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-3"
        >
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
            {false ? "processing..." : "Send"}
          </Button>
        </form>
      </Form>
    </>
  );
}
