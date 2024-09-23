'use client'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { ChevronDownIcon } from 'lucide-react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'
import { vendorSchema, vendorUpdateSchema } from '@/types/admin'
import VendorForm from '@/components/forms/vendor-form'
import VendorsTable from '@/components/tables/admin-tables/vendors'
import { addNewVendor } from '@/app/api/services'
import { Separator } from '@/components/ui/separator'
import CustomDialog from '@/components/dialog/custom-dialog'

export type VendorFormValue = z.infer<typeof vendorSchema>
export type VendorUpdateValue = z.infer<typeof vendorUpdateSchema>
export default function Vendors() {
  const { toast } = useToast()
  const form = useForm<VendorFormValue>({
    resolver: zodResolver(vendorSchema)
  })
  const queryClient = useQueryClient()
  const [key, setKey] = useState(0)
  const mutation = useMutation({
    mutationFn: (data: VendorFormValue) => {
      return addNewVendor(data)
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
    mutation.mutate(data)
  }
  return (
    <div className='space-y-2'>
      <div className='flex justify-between'>
        <Heading title='Vendors' description='Manage all your vendors' />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Add Vendor(s) <ChevronDownIcon className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className='grid gap-2'>
              <CustomDialog
                triggerText='Single Vendor'
                title='Add Single Vendor'
                description='Include a vendor to the list here. Click submit when you are done.'
                FormComponent={VendorForm}
                formKey={key}
                onSubmit={onSubmit}
                mutation={mutation}
                form={form}
              />
              <Button className='bg-transparent text-black text-xs md:text-sm overflow-hidden rounded-md py-2 font-normal hover:bg-accent hover:text-accent-foreground'>
                Multiple Vendors
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />
      <VendorsTable />
    </div>
  )
}
