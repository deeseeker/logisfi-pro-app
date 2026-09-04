import type { Metadata } from "next";

import { AdminShell } from "@/components/admin/layout/admin-shell";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ibmPlexMono } from "@/lib/fonts";

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
