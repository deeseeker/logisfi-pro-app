'use client'

import { ColumnDef } from '@/components/ui/table/table-features'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TransactionType = {
  id: string
  transactionId: string
  status: 'pending' | 'processing' | 'success' | 'failed'
  amount: number
  date: string
  name: string
}

export const columns: ColumnDef<TransactionType>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'transactionId',
    header: 'Transaction Details'
  },
  {
    accessorKey: 'amount',
    header: 'Amount'
  },
  {
    accessorKey: 'date',
    header: 'Date'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  }
]
