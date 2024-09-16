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
import { ChevronDownIcon, FilePlus, Layers, Layers3 } from 'lucide-react'
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
import { vendorSchema } from '@/types/admin'
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
            <Button variant='outline' className=''>
              Add Shipper(s) <ChevronDownIcon className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className='grid gap-2'>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className='bg-transparent text-black text-xs md:text-sm overflow-hidden rounded-md py-2 font-normal hover:bg-accent hover:text-accent-foreground'>
                    <FilePlus className='mr-2 h-4 w-4' /> Shipper
                  </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[600px]'>
                  <DialogHeader>
                    <DialogTitle>Add Single Shipper</DialogTitle>
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
              <Button className='bg-transparent text-black text-xs md:text-sm overflow-hidden rounded-md py-2 font-normal hover:bg-accent hover:text-accent-foreground'>
                <Layers3 className='mr-2 h-4 w-4' /> Shippers
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />

      <ShippersTable />
    </div>
  )
}
