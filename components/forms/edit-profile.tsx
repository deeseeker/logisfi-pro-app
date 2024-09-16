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
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '../ui/use-toast'
import { updateProfile } from '@/app/api/services'
import { ProfileFormValues } from '@/lib/form-schema'

const FormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  phoneNumber: z.string(),
  position: z.string()
})

export type UpdateProfileForm = z.infer<typeof FormSchema>
const ProfileForm = ({}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const [key, setKey] = useState(0)
  const mutation = useMutation({
    mutationFn: (data: UpdateProfileForm) => {
      return updateProfile(data)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['profile']
      })

      form.reset() // Reset the form
      setKey((prevKey) => prevKey + 1) // Force a rerender by updating the key
    }
  })

  const onSubmit = (data: UpdateProfileForm) => {
    mutation.mutate(data)
  }
  return (
    <Form {...form} key={key}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem className='grid grid-cols-2 items-center'>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Enter first name...'
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
            name='lastName'
            render={({ field }) => (
              <FormItem className='grid grid-cols-2 items-center'>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Enter last name...'
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
            name='gender'
            render={({ field }) => (
              <FormItem className='grid grid-cols-2 items-center'>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    className='col-span-3'
                    placeholder='Enter gender...'
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
            name='position'
            render={({ field }) => (
              <FormItem className='grid grid-cols-2 items-center'>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    className='col-span-3'
                    placeholder='Enter position...'
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
            name='phoneNumber'
            render={({ field }) => (
              <FormItem className='grid grid-cols-2 items-center'>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    className='col-span-3'
                    placeholder='Enter phone number...'
                    disabled={mutation.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='text-end'>
          <Button
            type='submit'
            disabled={mutation.isPending}
            className='bg-customblue'
          >
            {mutation.isPending && (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            )}
            Save changes
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ProfileForm
