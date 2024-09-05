import React, { useState } from 'react'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { useForm } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useToast } from '../ui/use-toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllRoutes, updatePrice, updateVPrice } from '@/app/api/services'
import { UpdatePriceValue } from '../tables/admin-tables/price-list/column'
import { uPriceSchema } from '@/types/admin'

interface PriceFormProps {
  vendorId: string
}

const UVPriceForm: React.FC<PriceFormProps> = ({ vendorId }) => {
  const form = useForm<z.infer<typeof uPriceSchema>>({
    resolver: zodResolver(uPriceSchema)
  })
  const { data, isPending } = useQuery({
    queryKey: ['routes'],
    queryFn: getAllRoutes
  })
  const queryClient = useQueryClient()
  const dataSource = data?.responseData
  const { toast } = useToast()

  const [key, setKey] = useState(0)
  const mutation = useMutation({
    mutationFn: (data: any) => {
      return updateVPrice(data)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['vendor-price-list']
      })

      form.reset() // Reset the form
      setKey((prevKey) => prevKey + 1) // Force a rerender by updating the key
    }
  })

  const onSubmit = async (data: any) => {
    data.vendorPriceId = vendorId
    mutation.mutate(data)
    if (mutation.isSuccess) {
      toast({
        title: 'Success!',
        description: 'The price list has been updated successfully.'
      })
    }
  }
  return (
    <Form {...form} key={key}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 py-4'>
        <FormField
          control={form.control}
          name='newPrice'
          render={({ field }) => (
            <FormItem className='grid grid-cols-4 items-center gap-4'>
              <FormLabel>New Price</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='col-span-3'
                  placeholder='Enter new price...'
                  disabled={mutation.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='text-end'>
          <Button type='submit' className='bg-customblue'>
            {mutation.isPending && (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            )}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default UVPriceForm
