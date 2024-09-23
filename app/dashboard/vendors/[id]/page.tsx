'use client'
import PriceForm from '@/components/forms/price-form'
import VendorPriceForm from '@/components/forms/vendor-price'
import PriceList from '@/components/tables/admin-tables/price-list'
import VendorPriceList from '@/components/tables/admin-tables/vendor-price-list'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Heading } from '@/components/ui/heading'
import { Plus } from 'lucide-react'
import { useParams } from 'next/navigation'

import React from 'react'

function VendorId() {
  const params = useParams()
  const { id } = params
  return (
    <div>
      <div className='flex justify-between'>
        <Heading title='Vendor Details' description='Manage vendor details' />
        <Dialog>
          <DialogTrigger asChild>
            <Button className='text-xs md:text-sm bg-customblue'>
              <Plus className='mr-2 h-4 w-4' /> Add New Price
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Create price</DialogTitle>
              <DialogDescription>
                Include a price to the list here. Click submit when you are
                done.
              </DialogDescription>
            </DialogHeader>
            <VendorPriceForm vendorId={id as string} />
          </DialogContent>
        </Dialog>
      </div>
      <VendorPriceList />
    </div>
  )
}

export default VendorId
