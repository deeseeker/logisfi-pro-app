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
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { showErrorAlert, showSuccessAlert } from "../alert";
import { resetPassword } from "@/app/api/services";

export const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const form = useForm<any>({});

  const onSubmit = async (data: any) => {
    const payload = {
      email: email,
      newPassword: data.newPassword,
      token: token,
    };

    setLoading(true);
    const res = await resetPassword(payload);

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
          className="w-full space-y-8"
        >
          <div className="w-full space-y-2 md:inline-block">
            {
              <>
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            }
          </div>
          <Button className="ml-auto w-full bg-customblue" type="submit">
            {" "}
            {loading ? "processing..." : " Reset Password"}
          </Button>
        </form>
      </Form>
    </>
  );
};
