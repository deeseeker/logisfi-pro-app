import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/utils/providers/ReactQueryProvider";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
import { inter } from "@/lib/fonts";

export const metadata: Metadata = {
  title: {
    default: "LogisfiPro",
    template: "%s · LogisfiPro",
  },
  description: "The Haulage Hub — freight financing and logistics platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <AuthProvider>
          <body className={inter.className} suppressHydrationWarning={true}>
            <main>{children}</main>
            <Toaster richColors expand={false} />
          </body>
        </AuthProvider>
      </ReactQueryProvider>
    </html>
  );
}
