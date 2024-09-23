'use client'
import LoadTable from '@/components/tables/admin-tables/load'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import React from 'react'

function Load() {
  return (
    <div>
      <div className='flex justify-between'>
        <Heading title='Load' description='Manage your Loads' />
      </div>
      <Separator />
      <LoadTable />
    </div>
  )
}

export default Load
