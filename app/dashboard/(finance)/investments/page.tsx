"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import InvestmentsTable from "@/components/tables/admin-tables/investments";

export default function Investments() {
  // const renderContent = () => {
  //   switch (role) {
  //     case "Admin":
  //       return <AdminDashboard />;
  //     case "bank":
  //       return <BankDashboard />;
  //     case "investor":
  //       return <InvestorDashboard />;
  //     default:
  //       break;
  //   }
  // };
  return (
    <div className="space-y-2">
      <div>
        <Heading
          title="Investments"
          description="Manage all your investments"
        />
      </div>
      <Separator />

      <InvestmentsTable />
    </div>
  );
}
