import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CoinsIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { ProfitGraph } from "@/components/charts/profit-graph";
import { Button } from "@/components/ui/button";
import { RecentInvestments } from "@/components/recent-investments";
import ActiveTransactions from "@/components/tables/bank-tables/dashboard";
import { useQuery } from "@tanstack/react-query";
import {
  getAllInvestments,
  getAllMobilizations,
  getWallet,
} from "@/app/api/services";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useRole";
import { formatNaira } from "@/utils/helpers";
import InvestmentShipments from "./data-table";
import InvestorShipments from "./data-table";

function InvestorDashboard() {
  const [isHidden, setIsHidden] = useState(false);
  const { roles } = useAuth();
  const { data: profile } = useProfile();
  console.log(roles, profile);

  const { data, isPending } = useQuery({
    queryKey: ["wallet-details"],
    queryFn: () => getWallet(`${profile?.organizationId}`),
    enabled: !!profile?.organizationId,
  });
  const { data: res } = useQuery({
    queryKey: ["investments"],
    queryFn: () => getAllInvestments(`${profile?.organizationId}`),
    enabled: !!profile?.organizationId,
  });

  const { data: mobilization, isPending: Loading } = useQuery({
    queryKey: ["mobilizations"],
    queryFn: () => getAllMobilizations(`${profile.organizationId}`),
    enabled: !!profile?.organizationId,
  });
  console.log(res);
  const dataSource = mobilization ? mobilization : [];
  const roi = res?.responseData[0]?.roi;
  return (
    <div>
      <Tabs defaultValue="overview" className="space-y-4 ">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics" disabled>
            Analytics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 text-customblue">
            <Card className="bg-[linear-gradient(99.61deg,_#205BBB_2.12%,_#0E3C88_100%)] text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Total Loan Amount
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="h-4 w-4 text-muted-customblue"
                >
                  <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                  <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
                </svg>
              </CardHeader>
              <CardContent className="flex gap-2">
                <div>
                  <div className="text-2xl font-bold">
                    {isHidden
                      ? "*****"
                      : `${
                          data?.availableLoanAmount
                            ? formatNaira(data?.availableLoanAmount)
                            : 0
                        }`}
                  </div>
                  {/* <p className="text-xs text-muted-customblue">123456789</p> */}
                </div>
                <button onClick={() => setIsHidden(!isHidden)}>
                  {isHidden ? (
                    <EyeOffIcon className="mr-2 h-4 w-4" />
                  ) : (
                    <EyeIcon className="mr-2 h-4 w-4" />
                  )}
                </button>
              </CardContent>
            </Card>
            {/* <Card className="relative bg-[linear-gradient(102.21deg,_#D6EEFD_0%,_#8FD3FE_99.28%)]">
              <Image
                src="/back-arrow.png"
                alt="back arrow"
                width={460}
                height={252}
                className="opacity-25 absolute h-[89px] w-[151px] -bottom-[9px] -right-1 mix-blend-screen"
              />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-customblue">
                <CardTitle className="text-sm font-medium">
                  Trucks Financed
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="h-4 w-4 text-muted-customblue"
                >
                  <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                  <path d="M15 18H9" />
                  <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                  <circle cx="17" cy="18" r="2" />
                  <circle cx="7" cy="18" r="2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
              </CardContent>
            </Card> */}
            <Card className="bg-[linear-gradient(98.55deg,_#DBF0D5_36.12%,_#A4FD8B_100%)]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Amount Disbursed
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="h-4 w-4 text-muted-customblue"
                >
                  <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data?.loanAmountInUse
                    ? formatNaira(data?.loanAmountInUse)
                    : 0}
                </div>
              </CardContent>
            </Card>
            <Card className="relative bg-[linear-gradient(100.09deg,_#FADDDE_29.03%,_#FFC0C2_93.76%)]">
              <Image
                src="/back-arrow.png"
                alt="back arrow"
                width={460}
                height={252}
                className="opacity-25 absolute h-[89px] w-[151px] -bottom-[9px] -right-1 mix-blend-screen"
              />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ROI</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="h-4 w-4 text-muted-customblue"
                >
                  <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z" />
                  <path d="M2 9v1c0 1.1.9 2 2 2h1" />
                  <path d="M16 11h.01" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {roi ? formatNaira(roi) : 0}
                </div>
              </CardContent>
            </Card>
          </div>
          {roles
            ? roles.find((word) => word === "Admin") && (
                <Button className="text-xs md:text-sm bg-customblue">
                  {" "}
                  <CoinsIcon className="mr-2 h-4 w-4" />
                  Withdraw
                </Button>
              )
            : null}

          {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
            <div className="col-span-4">
              <ProfitGraph />
            </div>
            <Card className="col-span-4 md:col-span-3">
              <CardHeader>
                <CardTitle>Recent Investments</CardTitle>
                <CardDescription>
                  You made 265 investments this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentInvestments />
              </CardContent>
            </Card>
          </div> */}
        </TabsContent>
      </Tabs>

      <InvestorShipments data={dataSource} isPending={Loading} />
    </div>
  );
}

export default InvestorDashboard;
