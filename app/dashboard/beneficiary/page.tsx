'use client'

import BeneficiaryTable from '@/components/tables/investor-tables/beneficiary'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Beneficiary', link: '/dashboard/beneficiary' }
]
export default function Beneficiary() {
  return (
    <div className='space-y-2'>
      <Breadcrumbs items={breadcrumbItems} />
      <div className='flex justify-between'>
        <Heading
          title='Beneficiary'
          description='Manage all your beneficiaries'
        />
        <div className='flex gap-2'>
          <Select>
            <SelectTrigger className='w-[150px]'>
              <SelectValue placeholder='ROI Allocation' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='amount'>Amount</SelectItem>
              <SelectItem value='perentage'>Perentage</SelectItem>
            </SelectContent>
          </Select>

          <Button className='text-xs md:text-sm bg-customblue'>
            <Plus className='mr-2 h-4 w-4' /> Add New
          </Button>
        </div>
      </div>
      <Separator />

      <BeneficiaryTable />
    </div>
  )
}
