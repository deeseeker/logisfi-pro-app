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
import { signIn } from "@/app/api/services";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserTypeEnum } from "@/types/admin";
import { useAuth } from "@/context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { showErrorAlert, showSuccessAlert } from "../alert";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type UserFormValue = z.infer<typeof formSchema>;
export default function UserAuthForm() {
  // setUser here
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    const response = await signIn(data);

    console.log("err", response);
    if (response.isSuccess) {
      // OrderStatusEnums[Number(row.original.orderStatus)])
      const userType = response.responseData.userType;
      const roles = response.responseData.roles;
      setUser(response.responseData.userType);
      console.log(response.responseData.roles);
      localStorage.setItem("user", JSON.stringify(UserTypeEnum[userType]));
      localStorage.setItem("roles", JSON.stringify(roles));
      localStorage.setItem("token", response.responseData.accessToken);
      localStorage.setItem("refreshToken", response.responseData.refreshToken);
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      setLoading(false);
      showSuccessAlert(response.responseMessage);
      route.push("/dashboard");
    } else {
      showErrorAlert(response.responseMessage);
      setLoading(false);
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
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
          <div className="text-end text-sm">
            <Link
              href="reset-password/forgot-password"
              className="text-primary"
            >
              Forgot Password?
            </Link>
          </div>
          <Button className="ml-auto w-full bg-customblue" type="submit">
            {loading ? "loading..." : "Login"}
          </Button>
        </form>
      </Form>
    </>
  );
}
