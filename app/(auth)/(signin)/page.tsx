import UserAuthForm from "@/components/forms/user-auth-form";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};
export default function AuthenticationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Image
        src="/login-bg.jpeg"
        alt="login bg"
        width={400}
        height={400}
        className="object-cover h-full w-full hidden lg:block"
        priority
      />

      <div className="mx-auto w-full px-12 sm:px-0 sm:w-[350px]">
        <div className="flex flex-col text-center">
          <div className="flex justify-center mb-2">
            <Image
              src="/logisfi-icon.svg"
              width={121}
              height={30}
              alt="logisfi pro icon"
            />
          </div>
          <p className="text-sm text-black">Login to your account.</p>
        </div>
        <UserAuthForm />
      </div>
    </div>
  );
}
