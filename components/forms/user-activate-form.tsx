"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { activateAccount } from "@/app/api/services";
import { useRouter } from "next/navigation";
import { showErrorAlert, showSuccessAlert } from "../alert";

const formSchema = z.object({
  newPassword: z.string(),
});

export type ActivateFormValue = z.infer<typeof formSchema>;
export default function ActivateUserForm({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const form = useForm<ActivateFormValue>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: ActivateFormValue) => {
    console.log(data);
    // {
    //   "email": "string",
    //   "token": "string",
    //   "newPassword": "string"
    // }
    const formData = {
      ...data,
      email,
      token,
    };
    setLoading(true);
    const res = await activateAccount(formData);

    if (res.isSuccess) {
      setLoading(false);
      showSuccessAlert("Successful");
      route.push("/");
    } else {
      setLoading(false);
      showErrorAlert(res.responseMessage);
    }
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="ml-auto w-full bg-customblue" type="submit">
            {loading ? "loading..." : "Activate"}
          </Button>
        </form>
      </Form>
    </>
  );
}
