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
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { showErrorAlert, showSuccessAlert } from "../alert";
import { resetPassword } from "@/app/api/services";

export const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const searchParams = useSearchParams();

  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Get token and email from the URL
    let tokenFromUrl = searchParams.get("token");
    let emailFromUrl = searchParams.get("email");

    // Decode the URL components
    if (tokenFromUrl) {
      tokenFromUrl = tokenFromUrl.replace(/%20/g, "+").replace(/%2F/g, "/");
    }

    setToken(tokenFromUrl);
    setEmail(emailFromUrl);
  }, [searchParams]);

  const form = useForm<any>({});

  const onSubmit = async (data: any) => {
    if (!token || !email) {
      showErrorAlert("Invalid or missing token/email.");
      return;
    }

    const payload = {
      email: email,
      newPassword: data.newPassword,
      token: token, // You can pass token here if needed in the resetPassword function
    };

    setLoading(true);
    const res = await resetPassword(payload);

    setLoading(false);

    if (res.isSuccess) {
      showSuccessAlert(res.responseData);
      route.push("/");
    } else {
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
          </div>
          <Button className="ml-auto w-full bg-customblue" type="submit">
            {loading ? "Processing..." : "Reset Password"}
          </Button>
        </form>
      </Form>
    </>
  );
};
