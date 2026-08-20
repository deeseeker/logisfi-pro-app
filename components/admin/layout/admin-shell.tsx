"use client";

import * as React from "react";

import { PaymentRequestForm } from "@/components/admin/pages/payment-request-form";
import { ShipmentWizard } from "@/components/admin/pages/shipment-wizard";
import { Sidebar } from "./sidebar";
import { TickerStrip } from "./ticker-strip";
import { Topbar } from "./topbar";

type GlobalWizard = "shipment" | "payment" | null;

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [role, setRole] = React.useState("super");
  const [globalWizard, setGlobalWizard] = React.useState<GlobalWizard>(null);

  return (
    <div className="flex bg-slate-50 min-h-screen w-full text-slate-800">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />

      <div className="flex-1 min-w-0 flex flex-col">
        <TickerStrip />
        <Topbar role={role} onRoleChange={setRole} onQuickAction={setGlobalWizard} />
        <main className="flex-1 p-6 max-w-[1600px] w-full mx-auto">{children}</main>
        <footer className="px-6 py-4 text-center text-[11px] text-slate-400 border-t border-slate-100">
          LogisfiPro Admin Back Office — The Haulage Hub · High-fidelity interactive
          prototype · All data shown is illustrative
        </footer>
      </div>

      <ShipmentWizard
        open={globalWizard === "shipment"}
        onClose={() => setGlobalWizard(null)}
      />
      <PaymentRequestForm
        open={globalWizard === "payment"}
        onClose={() => setGlobalWizard(null)}
      />
    </div>
  );
}
