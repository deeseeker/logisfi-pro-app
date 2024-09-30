'use client'

import { fulfillOrder, updateRoute } from '@/app/api/services'
import { UpdateFormValue } from '@/app/dashboard/routes/page'
import FulfillOrderForm from '@/components/forms/order/fulfill-order-form'
import UpdateOrderForm, {
  formatEnumKey
} from '@/components/forms/order/update-order-form'
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
import { formSchema, IOrders, OrderStatusEnums } from '@/types/admin'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { EllipsisVertical, Eye, Signature, SquarePen } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const ActionCell = ({ row }: { row: any }) => {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)

  const [isUpdate, setIsUpdate] = useState(false)
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (data: any) => {
      return fulfillOrder(data)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['orders']
      })
      toast({
        title: 'Success!',
        description: 'The order has been fulfilled successfully.'
      })
    }
  })
  const form = useForm<UpdateFormValue>({
    resolver: zodResolver(formSchema)
  })

  const [key, setKey] = useState(0)
  const update = useMutation({
    mutationFn: (data: UpdateFormValue) => {
      return updateRoute(data)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['routes']
      })
      toast({
        title: 'Success!',
        description: 'The route lists has been updated successfully.'
      })

      form.reset() // Reset the form
      setKey((prevKey) => prevKey + 1) // Force a rerender by updating the key
    }
  })

  const onSubmit = async (data: UpdateFormValue) => {
    data.id = row.original.id
    console.log(data)
    update.mutate(data)
  }

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
          <DropdownMenuItem>
            <Eye className='mr-2 h-4 w-4' /> View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsUpdate(true)}>
            <SquarePen className='mr-2 h-4 w-4' /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Signature className='mr-2 h-4 w-4' /> Fulfill
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isUpdate} onOpenChange={setIsUpdate}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Update Order</DialogTitle>
            <DialogDescription>
              Edit your order information here. Click submit when you are done.
            </DialogDescription>
          </DialogHeader>
          <UpdateOrderForm data={row.original} />
        </DialogContent>
      </Dialog>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[600px]'>
          <DialogHeader>
            <DialogTitle>Fulfill Order</DialogTitle>
            <DialogDescription>
              Fulfill your order information here. Click submit when you are
              done.
            </DialogDescription>
          </DialogHeader>
          <FulfillOrderForm data={row.original} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export const columns: ColumnDef<IOrders>[] = [
  {
    accessorKey: 'origin',
    header: 'Origin',
    cell: ({ row }) => {
      return <span>{row.original.route.origin}</span>
    }
  },
  {
    accessorKey: 'destination',
    header: 'Destination',
    cell: ({ row }) => {
      return <span>{row.original.route.destination}</span>
    }
  },
  {
    accessorKey: 'numberOfTrucks',
    header: 'Truck Quantity',
    cell: ({ row }) => {
      return <span>{row.original.numberOfTrucks}</span>
    }
  },
  {
    accessorKey: 'name',
    header: 'Shipper',
    cell: ({ row }) => {
      return <span>{row.original.shipper.name}</span>
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Order Date',
    cell: ({ row }) => {
      return <span>{schemaToDate(row.original.createdAt)}</span>
    }
  },
  {
    accessorKey: 'orderStatus',
    header: 'Order Status',
    cell: ({ row }) => {
      return (
        <span>
          {formatEnumKey(OrderStatusEnums[Number(row.original.orderStatus)])}
        </span>
      )
    }
  },

  {
    id: 'actions',
    cell: ActionCell
  }
]
