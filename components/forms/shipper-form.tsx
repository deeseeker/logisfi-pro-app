import React from 'react'
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
import { UseFormReturn } from 'react-hook-form'

interface ShipperFormProps {
  form: UseFormReturn<any>
  onSubmit: (data: any) => void
  mutation: { isPending: boolean }
  key?: number
}

const ShipperForm: React.FC<ShipperFormProps> = ({
  form,
  onSubmit,
  mutation,
  key
}) => {
  return (
    <Form {...form} key={key}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 py-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='grid grid-cols-4 items-center gap-4'>
              <FormLabel className='text-right'>Name</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Enter name...'
                  className='col-span-3'
                  disabled={mutation.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{' '}
        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem className='grid grid-cols-4 items-center gap-4'>
              <FormLabel className='text-right'>Address</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Enter address...'
                  className='col-span-3'
                  disabled={mutation.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='state'
          render={({ field }) => (
            <FormItem className='grid grid-cols-4 items-center gap-4'>
              <FormLabel className='text-right'>State</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Enter state...'
                  className='col-span-3'
                  disabled={mutation.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{' '}
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem className='grid grid-cols-4 items-center gap-4'>
              <FormLabel className='text-right'>Phone</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Enter phone...'
                  className='col-span-3'
                  disabled={mutation.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{' '}
        <FormField
          control={form.control}
          name='country'
          render={({ field }) => (
            <FormItem className='grid grid-cols-4 items-center gap-4'>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='col-span-3'
                  placeholder='Enter country...'
                  disabled={mutation.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{' '}
        <FormField
          control={form.control}
          name='city'
          render={({ field }) => (
            <FormItem className='grid grid-cols-4 items-center gap-4'>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='col-span-3'
                  placeholder='Enter city...'
                  disabled={mutation.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{' '}
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='grid grid-cols-4 items-center gap-4'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='col-span-3'
                  placeholder='Enter email...'
                  disabled={mutation.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='text-end'>
          <Button
            type='submit'
            disabled={mutation.isPending}
            className='bg-customblue'
          >
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

export default ShipperForm
