"use client";

import AdminInvestments from "@/components/dashboards/investments/admin";
import InvestorsInvestments from "@/components/dashboards/investments/investor/data-table";
import InvestorTransactions from "@/components/dashboards/transactions/investor/data-table";
import { DataTableSkeletonLoader } from "@/components/skeleton";
import useRole from "@/hooks/useRole";

export default function Transactions() {
  const role = useRole();
  console.log(role);

  const renderContent = () => {
    switch (role) {
      case "Clearing":
        return <AdminInvestments />;
      case "Investor":
        return <InvestorTransactions />;
      default:
        break;
    }
  };
  return <div>{role ? renderContent() : <DataTableSkeletonLoader />}</div>;
}
