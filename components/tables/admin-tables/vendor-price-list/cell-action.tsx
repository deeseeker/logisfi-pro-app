import { deleteVPrice, updatePrice } from '@/app/api/services'
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
  DialogDescription,
  Dialog,
  DialogContent,
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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EllipsisVertical, SquarePen, Trash } from 'lucide-react'
import { useState } from 'react'
import { PriceFormValue, UpdatePriceValue } from './column'
import { priceSchema } from '@/types/admin'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { UpdateVendorPrice } from '@/components/forms/update-vendor-price'

export const ActionCell = ({ row }: { row: any }) => {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const id = row.original.id
  const [isUpdate, setIsUpdate] = useState(false)
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (vendorPriceId: string) => {
      return deleteVPrice(vendorPriceId)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['vendor-price-list']
      })
      toast({
        title: 'Success!',
        description: 'The price has been removed successfully.'
      })
    }
  })
  const form = useForm<PriceFormValue>({
    resolver: zodResolver(priceSchema)
  })

  const [key, setKey] = useState(0)
  const update = useMutation({
    mutationFn: (data: UpdatePriceValue) => {
      return updatePrice(data)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['price-list']
      })

      form.reset() // Reset the form
      setKey((prevKey) => prevKey + 1) // Force a rerender by updating the key
    }
  })

  const onSubmit = async (data: UpdatePriceValue) => {
    data.shipperPriceId = row.original.id
    update.mutate(data)
    if (update.isSuccess) {
      toast({
        title: 'Success!',
        description: 'The price list has been updated successfully.'
      })
    }
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
          <DropdownMenuItem onClick={() => setIsUpdate(true)}>
            <SquarePen className='mr-2 h-4 w-4' /> Update
          </DropdownMenuItem>

          <DropdownMenuItem
            className='text-red-600'
            onClick={() => setOpen(true)}
          >
            <Trash className='mr-2 h-4 w-4' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isUpdate} onOpenChange={setIsUpdate}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Update price</DialogTitle>
            <DialogDescription>
              Include a route to the list here. Click submit when you are done.
            </DialogDescription>
          </DialogHeader>
          <UpdateVendorPrice vendorId={id} />
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
              the price and remove the details from our servers.
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
