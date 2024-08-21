'use client'

import { EditBeneficiary } from '@/components/forms/edit-beneficiary'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
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
          <Dialog>
            <DialogTrigger asChild>
              <button className='text-gray-500'>
                <Trash2 className='mr-2 h-4 w-4 text-red-500' />
              </button>
            </DialogTrigger>
            <DialogContent className='w-[350px]'>
              <DialogHeader className='flex flex-col justify-center items-center'>
                <DialogTitle>Delete Beneficiary</DialogTitle>
                <DialogDescription className='text-center'>
                  Are you sure you want to delete this beneficiary from your
                  list?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button size='sm' variant='destructive' type='submit'>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <button className='text-gray-500'>
                <Pencil className='h-4 w-4' />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Beneficiary</DialogTitle>
              </DialogHeader>
              <EditBeneficiary />
            </DialogContent>
          </Dialog>
          {/* <Popover>
            <PopoverTrigger asChild>
              <button className='text-gray-500'>
                <Pencil className='h-4 w-4' />
              </button>
            </PopoverTrigger>
            <PopoverContent sideOffset={100} className='w-auto'>
              <EditBeneficiary />
            </PopoverContent>
          </Popover> */}
        </div>
      )
    }
  }
]
