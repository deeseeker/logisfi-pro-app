"use client";
import AdminDashboard from "@/components/dashboards/admin-dashboard";
import BankDashboard from "@/components/dashboards/bank-dashboard";
import InvestorDashboard from "@/components/dashboards/investors/investor-dashboard";

import useRole from "@/hooks/useRole";

export default function Dashboard() {
  const role = useRole();

  const renderContent = () => {
    switch (role) {
      case "Admin":
        return <AdminDashboard />;
      case "bank":
        return <BankDashboard />;
      case "investor":
        return <InvestorDashboard />;
      default:
        break;
    }
  };
  return (
    <div>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <div className="hidden items-center space-x-2 md:flex">
            {/* <CalendarDateRangePicker /> */}
            {/* <Button className='bg-[#001475]'>Download Report</Button> */}
          </div>
        </div>
        {role ? renderContent() : <p>Loading...</p>}
      </div>
    </div>
  );
}
