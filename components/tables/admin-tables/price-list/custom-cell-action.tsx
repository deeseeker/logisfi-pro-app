import { successModal } from '@/components/custom-toast/success-toast'
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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  CheckIcon,
  EllipsisVertical,
  SquarePen,
  Trash,
  TriangleAlert
} from 'lucide-react'
import { ReactNode, useState } from 'react'
import * as z from 'zod'

interface ActionCellProps {
  row: any
  deleteFunction: (id: string) => Promise<void>
  FormComponent: ReactNode
  entityKey: string
}

export const ActionCell = ({
  row,
  deleteFunction,
  entityKey,
  FormComponent
}: ActionCellProps) => {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const id = row.original.id
  const [isUpdate, setIsUpdate] = useState(false)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (priceId: string) => {
      return deleteFunction('priceId')
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [entityKey]
      })
      successModal({
        title: 'Success',
        description: 'The item has been successfully deleted.'
      })
    },
    onError: (error: any) => {
      console.log(error)
      successModal({
        title: `Error ${error.responseCode}!`,
        description: `There was an error deleting the item: ${error?.responseMessage}`,
        iconClassName: 'fill-red-500 text-white',
        Icon: TriangleAlert
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
            <DialogTitle>Update Price</DialogTitle>
            <DialogDescription>
              Update price list here. Click submit when you are done.
            </DialogDescription>
          </DialogHeader>
          {FormComponent}
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
