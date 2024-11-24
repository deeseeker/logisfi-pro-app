"use client";
import AdminDashboard from "@/components/dashboards/admin-dashboard";
import BankDashboard from "@/components/dashboards/bank-dashboard";
import InvestorDashboard from "@/components/dashboards/investors/investor-dashboard";
import ShimmerTabs from "@/components/skeleton/dashboard/investor";
import { useQuery } from "@tanstack/react-query";
import { getAllOrganizations, getProfile } from "../api/services";
import useRole from "@/hooks/useRole";

export const useProfile = () =>
  useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

export const useOrganization = () =>
  useQuery({
    queryKey: ["organization"],
    queryFn: getAllOrganizations,
  });
export default function Dashboard() {
  const role = useRole();
  console.log(role);

  const renderContent = () => {
    switch (role) {
      case "Clearing":
        console.log("here");
        return <AdminDashboard />;
      // case "bank":
      //   return <BankDashboard />;
      case "Investor":
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
        {role ? renderContent() : <ShimmerTabs />}
      </div>
    </div>
  );
}
