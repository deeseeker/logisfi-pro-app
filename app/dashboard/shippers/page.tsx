'use client'

import RoutesTable from '@/components/tables/admin-tables/routes'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Heading } from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ChevronDownIcon } from 'lucide-react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { addNewRoute } from '@/app/api/services'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'
import RouteForm from '@/components/forms/route-form'
import { formSchema } from '@/types/admin'

export type RouteFormValue = z.infer<typeof formSchema>
export default function Routes() {
  const { toast } = useToast()
  const form = useForm<RouteFormValue>({
    resolver: zodResolver(formSchema)
  })
  const queryClient = useQueryClient()
  const [key, setKey] = useState(0)
  const mutation = useMutation({
    mutationFn: (data: RouteFormValue) => {
      return addNewRoute(data)
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

  const onSubmit = async (data: RouteFormValue) => {
    mutation.mutate(data)
  }
  return (
    <div className='space-y-2'>
      <div className='flex justify-between'>
        <Heading title='Shippers' description='Manage all your shippers' />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Add New <ChevronDownIcon className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className='grid gap-2'>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className='bg-transparent text-black text-xs md:text-sm overflow-hidden rounded-md py-2 font-normal hover:bg-accent hover:text-accent-foreground'>
                    Single Shipper
                  </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                  <DialogHeader>
                    <DialogTitle>Add New Shipper</DialogTitle>
                    <DialogDescription>
                      Include a route to the list here. Click submit when you
                      are done.
                    </DialogDescription>
                  </DialogHeader>
                  <RouteForm
                    key={key}
                    onSubmit={onSubmit}
                    mutation={mutation}
                    form={form}
                  />
                </DialogContent>
              </Dialog>
              <Link
                href='/'
                className='md:text-sm flex items-center justify-center gap-2 text-center overflow-hidden rounded-md py-2 text-sm font-normal hover:bg-accent hover:text-accent-foreground'
              >
                Multiple Route
              </Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />

      <RoutesTable />
    </div>
  )
}
