import { BarGraph } from '@/components/charts/bar-graph'
import { RecentInvestments } from '@/components/recent-investments'
import RecentActivities from '@/components/tables/admin-tables/dashboard'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

function AdminDashboard() {
  return (
    <div>
      <Tabs defaultValue='overview' className='space-y-4 '>
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='analytics' disabled>
            Analytics
          </TabsTrigger>
        </TabsList>
        <TabsContent value='overview' className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 text-customblue'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Total Investors
                </CardTitle>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  className='h-4 w-4 text-muted-customblue'
                >
                  <path d='M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2' />
                </svg>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>50</div>
                {/* <p className='text-xs text-muted-customblue'>
              +20.1% from last month
            </p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 text-customblue'>
                <CardTitle className='text-sm font-medium'>
                  Active Investors
                </CardTitle>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  className='h-4 w-4 text-muted-customblue'
                >
                  <path d='M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2' />
                </svg>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>5</div>
                {/* <p className='text-xs text-muted-customblue'>
              +180.1% from last month
            </p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Available Funds
                </CardTitle>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  className='h-4 w-4 text-muted-customblue'
                >
                  <path d='M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1' />
                  <path d='M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4' />
                </svg>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>&#8358;12,234</div>
                {/* <p className='text-xs text-muted-customblue'>
              +19% from last month
            </p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Invested Funds
                </CardTitle>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  className='h-4 w-4 text-muted-customblue'
                >
                  <path d='M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17' />
                  <path d='m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9' />
                  <path d='m2 16 6 6' />
                  <circle cx='16' cy='9' r='2.9' />
                  <circle cx='6' cy='5' r='3' />
                </svg>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>&#8358;14500000</div>
              </CardContent>
            </Card>
          </div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
            <div className='col-span-4'>
              <BarGraph />
            </div>
            <Card className='col-span-4 md:col-span-3'>
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
          </div>
        </TabsContent>
      </Tabs>
      <RecentActivities />
    </div>
  )
}

export default AdminDashboard
