'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface ActiveTransactionType {
  key: number
  transactionId: string
  shipper: string
  origin: string
  destination: string
  truckSize: string
  disbursement: string
}

export const columns: ColumnDef<ActiveTransactionType>[] = [
  {
    accessorKey: 'transactionId',
    header: 'Transaction Id'
  },
  {
    accessorKey: 'shipper',
    header: 'Shipper'
  },
  {
    accessorKey: 'origin',
    header: 'Origin'
  },
  {
    accessorKey: 'destination',
    header: 'Destination'
  },
  {
    accessorKey: 'truckSize',
    header: 'Truck Size'
  },
  {
    accessorKey: 'disbursement',
    header: 'Disbursement'
  },
  {
    id: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const id = row.original.transactionId

      return (
        <Link
          href={`/dashboard/history/${id}`}
          className='text-muted-foreground '
        >
          View details
        </Link>
      )
    }
  }
]
