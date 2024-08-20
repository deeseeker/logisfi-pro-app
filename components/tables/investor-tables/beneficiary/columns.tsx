'use client'

import { EditBeneficiary } from '@/components/forms/edit-beneficiary'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { ColumnDef } from '@tanstack/react-table'
import { Pencil, Trash2 } from 'lucide-react'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface InvTransactionType {
  name: string
  bankName: string
  accountNumber: string
  percentage: string
}

export const columns: ColumnDef<InvTransactionType>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'bankName',
    header: 'Bank Name'
  },
  {
    accessorKey: 'accountNumber',
    header: 'Account Number'
  },
  {
    accessorKey: 'percentage',
    header: 'Percentage'
  },
  {
    id: 'action',
    header: 'Action',
    cell: ({ row }) => {
      return (
        <div className='flex gap-2'>
          <Popover>
            <PopoverTrigger asChild>
              <button>
                <Trash2 className='mr-2 h-4 w-4 text-red-500' />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align='start'
              side='left'
              sideOffset={30}
              className='w-80'
            >
              <div className='grid gap-4'>
                <div className='space-y-2'>
                  <h4 className='font-medium leading-none'>
                    Delete Beneficiary
                  </h4>
                  <p className='text-sm text-muted-foreground'>
                    Are you sure you want to delete this beneficiary from your
                    List.
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <button>
                <Pencil className='h-4 w-4' />
              </button>
            </PopoverTrigger>
            <PopoverContent sideOffset={100} className='w-auto'>
              <EditBeneficiary />
            </PopoverContent>
          </Popover>
        </div>
      )
    }
  }
]
