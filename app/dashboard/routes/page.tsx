'use client'

import RoutesTable from '@/components/tables/admin-tables/routes'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Heading } from '@/components/ui/heading'
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
import { formSchema, updateRouteSchema } from '@/types/admin'
import CustomDialog from '@/components/dialog/custom-dialog'

export type RouteFormValue = z.infer<typeof formSchema>
export type UpdateFormValue = z.infer<typeof updateRouteSchema>
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
        <Heading title='Routes' description='Manage all your routes' />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Add New <ChevronDownIcon className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className='grid gap-2'>
              <CustomDialog
                triggerText='Single Route'
                title='Add Single Route'
                description='Include route to the list here. Click submit when you are done.'
                FormComponent={RouteForm}
                formKey={key}
                onSubmit={onSubmit}
                mutation={mutation}
                form={form}
              />
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
