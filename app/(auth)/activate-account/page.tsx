import NotFound from "@/app/not-found";
import ActivateUserForm from "@/components/forms/user-activate-form";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function ActivationPage({
  searchParams,
}: {
  searchParams: { token?: string; email?: string; name?: string };
}) {
  const { token, email, name } = searchParams;

  if (!token || !email || !name) {
    return <NotFound />;
  }

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
          <p className="text-sm text-black">Activate your account.</p>
        </div>
        <ActivateUserForm email={email as string} token={token as string} />
      </div>
    </div>
  );
}
