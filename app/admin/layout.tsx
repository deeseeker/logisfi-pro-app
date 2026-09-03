import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";

import { AdminShell } from "@/components/admin/layout/admin-shell";
import { TooltipProvider } from "@/components/ui/tooltip";

/** Financial figures across the console render in this face via `.font-figure`. */
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "Admin Back Office",
  description: "The Haulage Hub back office — operations and freight financing console",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={ibmPlexMono.variable}>
      <TooltipProvider delayDuration={200}>
        <AdminShell>{children}</AdminShell>
      </TooltipProvider>
    </div>
  );
}
