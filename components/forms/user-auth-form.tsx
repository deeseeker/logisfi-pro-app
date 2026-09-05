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
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "@/app/api/services";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getPostLoginPath } from "@/lib/auth/roles";
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
  const { setUser, setRoles } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const route = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    const response = await signIn(data);

    if (response.isSuccess) {
      // OrderStatusEnums[Number(row.original.orderStatus)])
      const userType = response.responseData?.userType;
      const roles = response.responseData?.roles;
      const userLabel =
        typeof userType === "number"
          ? UserTypeEnum[userType as unknown as number]
          : userType;
      setUser(userType);
      setRoles(roles ?? null);
      localStorage.setItem("user", JSON.stringify(userLabel));
      localStorage.setItem("roles", JSON.stringify(roles));
      localStorage.setItem("token", response.responseData?.accessToken ?? "");
      localStorage.setItem(
        "refreshToken",
        response.responseData?.refreshToken ?? ""
      );
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      setLoading(false);
      showSuccessAlert(response.responseMessage);
      route.push(getPostLoginPath(roles));
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
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password..."
                      disabled={loading}
                      className="pr-10"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      disabled={loading}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground disabled:opacity-50"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
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
