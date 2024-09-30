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
import { useForm, UseFormReturn } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useToast } from '../../ui/use-toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createOrder,
  getAllOrders,
  getAllRoutes,
  getAllShippers,
  updateOrder
} from '@/app/api/services'
import { OrderStatusEnums } from '@/types/admin'

export const formatEnumKey = (key: string) => {
  return key.replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before uppercase letters
}
const FormSchema = z.object({
  orderStatus: z.string({
    required_error: 'Please select a route.'
  })
})
const UpdateOrderForm = ({ data }: { data: any }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const [key, setKey] = useState(0)
  const mutation = useMutation({
    mutationFn: (data: any) => {
      return updateOrder(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orders']
      })
      toast({
        title: 'Success!',
        description: 'Order has been updated successfully.'
      })

      form.reset() // Reset the form
      setKey((prevKey) => prevKey + 1) // Force a rerender by updating the key
    }
  })

  const enumEntries = Object.entries(OrderStatusEnums).filter(
    ([key, value]) => typeof value === 'number'
  )

  function onSubmit(dataSource: z.infer<typeof FormSchema>) {
    const formData = {
      orderId: data?.id,
      shipperId: data?.shipper?.id,
      userId: data.user?.id,
      routeId: data?.route?.id,
      orderStatus: dataSource.orderStatus
    }
    console.log(formData)
    mutation.mutate(formData)
  }
  return (
    <Form {...form} key={key}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 py-4'>
        <FormField
          control={form.control}
          name='orderStatus'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='col-span-3'>
                    <SelectValue placeholder='Update order status' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {enumEntries.map(([key, value]) => (
                    <SelectItem key={value} value={key}>
                      {formatEnumKey(key)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

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

export default UpdateOrderForm
