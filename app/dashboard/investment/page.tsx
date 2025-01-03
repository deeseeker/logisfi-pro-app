"use client";

import AdminInvestments from "@/components/dashboards/investments/admin";
import InvestorsInvestments from "@/components/dashboards/investments/investor/data-table";
import { DataTableSkeletonLoader } from "@/components/skeleton";
import useRole from "@/hooks/useRole";

export default function Investments() {
  const role = useRole();
  console.log(role);

  const renderContent = () => {
    switch (role) {
      case "Clearing":
        return <AdminInvestments />;
      case "Investor":
        return <InvestorsInvestments />;
      default:
        break;
    }
  };
  return <div>{role ? renderContent() : <DataTableSkeletonLoader />}</div>;
}
