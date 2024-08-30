'use client'
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
import { addNewRoute, addNewShipper } from '@/app/api/services'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'
import RouteForm from '@/components/forms/route-form'
import { formSchema, vendorSchema } from '@/types/admin'
import ShippersTable from '@/components/tables/admin-tables/shippers'
import { VendorFormValue } from '../vendors/page'
import ShipperForm from '@/components/forms/shipper-form'

export default function Shippers() {
  const { toast } = useToast()
  const form = useForm<VendorFormValue>({
    resolver: zodResolver(vendorSchema)
  })
  const queryClient = useQueryClient()
  const [key, setKey] = useState(0)
  const mutation = useMutation({
    mutationFn: (data: VendorFormValue) => {
      return addNewShipper(data)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['shippers']
      })
      toast({
        title: 'Success!',
        description: 'The shipper lists has been updated successfully.'
      })

      form.reset() // Reset the form
      setKey((prevKey) => prevKey + 1) // Force a rerender by updating the key
    }
  })

  const onSubmit = async (data: VendorFormValue) => {
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
                      Include a shipper to the list here. Click submit when you
                      are done.
                    </DialogDescription>
                  </DialogHeader>
                  <ShipperForm
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
                Multiple Shipper
              </Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />

      <ShippersTable />
    </div>
  )
}
