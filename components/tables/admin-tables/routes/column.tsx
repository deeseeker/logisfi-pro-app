'use client'

import { deleteRoute, updateRoute } from '@/app/api/services'
import { RouteFormValue, UpdateFormValue } from '@/app/dashboard/routes/page'

import RouteForm from '@/components/forms/route-form'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/use-toast'
import { formSchema, IRoutes } from '@/types/admin'
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
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (routeId: string) => {
      return deleteRoute(routeId)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['routes']
      })
      toast({
        title: 'Success!',
        description: 'The route lists has been removed successfully.'
      })
    }
  })
  const form = useForm<RouteFormValue>({
    resolver: zodResolver(formSchema)
  })

  const [key, setKey] = useState(0)
  const update = useMutation({
    mutationFn: (data: RouteFormValue) => {
      return updateRoute(data)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['routes']
      })

      form.reset() // Reset the form
      setKey((prevKey) => prevKey + 1) // Force a rerender by updating the key
    }
  })

  const onSubmit = async (data: UpdateFormValue) => {
    data.id = row.original.id
    console.log(data)
    update.mutate(data)
    if (update.isSuccess) {
      toast({
        title: 'Success!',
        description: 'The route lists has been updated successfully.'
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
          <DropdownMenuItem>View route</DropdownMenuItem>
          <DropdownMenuItem>Update route</DropdownMenuItem>

          <DropdownMenuItem
            className='text-red-600'
            onClick={() => setOpen(true)}
          >
            Delete route
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
          <RouteForm
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

export const columns: ColumnDef<IRoutes>[] = [
  {
    accessorKey: 'origin',
    header: 'Origin'
  },
  {
    accessorKey: 'destination',
    header: 'Destination'
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
