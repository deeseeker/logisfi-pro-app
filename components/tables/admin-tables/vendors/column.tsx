'use client'

import { deleteVendor, updateVendor } from '@/app/api/services'
import { VendorFormValue } from '@/app/dashboard/vendors/page'
import VendorForm from '@/components/forms/vendor-form'
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
import { IVendors, vendorSchema } from '@/types/admin'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { EllipsisVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const ActionCell = ({ row }: { row: any }) => {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const router = useRouter()
  const id = row.original.id
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (vendorId: string) => {
      return deleteVendor(vendorId)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['vendors']
      })
      toast({
        title: 'Success!',
        description: 'The vendor lists has been removed successfully.'
      })
    }
  })
  const form = useForm<VendorFormValue>({
    resolver: zodResolver(vendorSchema)
  })

  const [key, setKey] = useState(0)
  const update = useMutation({
    mutationFn: (data: VendorFormValue) => {
      return updateVendor(data)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['vendors']
      })
      toast({
        title: 'Success!',
        description: 'The vendor lists has been updated successfully.'
      })
      form.reset() // Reset the form
      setKey((prevKey) => prevKey + 1) // Force a rerender by updating the key
    }
  })

  const onSubmit = async (data: VendorFormValue) => {
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
          <DropdownMenuItem
            onClick={() => {
              router.push(`vendors/${id}`)
            }}
          >
            View vendor
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsUpdate(true)}>
            Update vendor
          </DropdownMenuItem>

          <DropdownMenuItem
            className='text-red-600'
            onClick={() => setOpen(true)}
          >
            Delete vendor
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isUpdate} onOpenChange={setIsUpdate}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Update Route</DialogTitle>
            <DialogDescription>
              Include a route to the list here. Click submit when you are done.
            </DialogDescription>
          </DialogHeader>
          <VendorForm
            key={key}
            onSubmit={onSubmit}
            mutation={update}
            form={form}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-red-500'>
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              the route and remove the details from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                mutation.mutate(row.original.id)
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

export const columns: ColumnDef<IVendors>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'state',
    header: 'State'
  },
  {
    accessorKey: 'phone',
    header: 'Phone'
  },
  {
    accessorKey: 'createdAt',
    header: 'Date Created'
  },
  {
    accessorKey: 'modifiedAt',
    header: 'Date Modified'
  },
  {
    id: 'actions',
    cell: ActionCell
  }
]