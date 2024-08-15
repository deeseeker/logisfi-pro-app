import { BarGraph } from '@/components/charts/bar-graph'
import AdminDashboard from '@/components/dashboards/admin-dashboard'
import BankDashboard from '@/components/dashboards/bank-dashboard'
import PageContainer from '@/components/layout/page-container'
import { RecentInvestments } from '@/components/recent-investments'
import RecentActivities from '@/components/tables/admin-tables/dashboard'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function page() {
  return (
    <PageContainer scrollable={true}>
      <div className='space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight text-customblue'>
            Hi, Welcome back 👋
          </h2>
          {/* <div className='hidden items-center space-x-2 md:flex'>
            <CalendarDateRangePicker />
            <Button>Download</Button>
          </div> */}
        </div>
        <AdminDashboard />
        {/* <BankDashboard /> */}
      </div>
    </PageContainer>
  )
}
