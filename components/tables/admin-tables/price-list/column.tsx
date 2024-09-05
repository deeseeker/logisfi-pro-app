'use client'

import { deletePrice, updatePrice, updateShipper } from '@/app/api/services'

import RouteForm from '@/components/forms/route-form'
import UPriceForm from '@/components/forms/uprice-form'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/use-toast'
import { schemaToDate } from '@/lib/utils'
import { IPrice, priceSchema, priceUpdateSchema } from '@/types/admin'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { EllipsisVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export type PriceFormValue = z.infer<typeof priceSchema>
export type UpdatePriceValue = z.infer<typeof priceUpdateSchema>
const ActionCell = ({ row }: { row: any }) => {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const id = row.original.id

  const [isUpdate, setIsUpdate] = useState(false)
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (shipperPriceId: string) => {
      return deletePrice(shipperPriceId)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['price-list']
      })
      toast({
        title: 'Success!',
        description: 'The price has been removed successfully.'
      })
    }
  })

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <EllipsisVertical className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setIsUpdate(true)}>
            Update price
          </DropdownMenuItem>

          <DropdownMenuItem
            className='text-red-600'
            onClick={() => setOpen(true)}
          >
            Delete price
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isUpdate} onOpenChange={setIsUpdate}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Update price</DialogTitle>
            <DialogDescription>
              Update price list here. Click submit when you are done.
            </DialogDescription>
          </DialogHeader>
          <UPriceForm shipperId={id} />
        </DialogContent>
      </Dialog>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-red-500'>
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              price and remove the details from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                mutation.mutate(id)
                setOpen(false)
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export const columns: ColumnDef<IPrice>[] = [
  {
    accessorKey: 'route',
    header: 'Origin',
    cell: ({ row }) => {
      const origin = row.original.route.origin
      return <span>{origin}</span>
    }
  },
  {
    accessorKey: 'destination',
    header: 'Destination',
    cell: ({ row }) => {
      const destination = row.original.route.destination
      return <span>{destination}</span>
    }
  },
  {
    accessorKey: 'price',
    header: 'Price'
  },
  {
    accessorKey: 'createdAt',
    header: 'Date Created',
    cell: ({ row }) => {
      return <span>{schemaToDate(row.original.createdAt)}</span>
    }
  },
  {
    accessorKey: 'modifiedAt',
    header: 'Date Modified',
    cell: ({ row }) => {
      return <span>{schemaToDate(row.original.modifiedAt)}</span>
    }
  },
  {
    id: 'actions',
    cell: ActionCell
  }
]