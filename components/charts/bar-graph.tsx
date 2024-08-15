'use client'

import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
const chartData = [
  { month: 'January', total: 186, active: 80 },
  { month: 'February', total: 305, active: 200 },
  { month: 'March', total: 237, active: 120 },
  { month: 'April', total: 73, active: 190 },
  { month: 'May', total: 209, active: 130 },
  { month: 'June', total: 214, active: 140 }
]

const chartConfig = {
  total: {
    label: 'Total Referred Customers',
    color: '#001475'
  },
  active: {
    label: 'Active Referred Customers',
    color: '#00A5E0'
  }
} satisfies ChartConfig

export function BarGraph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Referral Analysis</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey='total'
              stackId='a'
              fill='var(--color-total)'
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey='active'
              stackId='a'
              fill='var(--color-active)'
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 font-medium leading-none'>
          Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          Showing referral trend for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
