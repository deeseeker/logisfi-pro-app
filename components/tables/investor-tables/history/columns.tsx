'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

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
  }
]
