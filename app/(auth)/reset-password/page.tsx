import { ResetPasswordForm } from "@/components/forms/reset-password-form";
import Image from "next/image";
import { Suspense } from "react";

export default function ResetPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Image
        src="/login-bg.jpeg"
        alt="login bg"
        width={400}
        height={400}
        className="object-cover h-full w-full"
        priority
      />
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-[#205BBB]">
              Set New Password
            </h1>
            <p className="text-sm text-muted-foreground">
              Must be at least 6 characters.
            </p>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
