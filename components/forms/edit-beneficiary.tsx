'use client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ProfileFormValues, profileSchema } from '@/lib/form-schema'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

export const EditBeneficiary = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema)
  })

  const {
    control,
    formState: { errors }
  } = form

  const processForm: SubmitHandler<ProfileFormValues> = (data) => {
    console.log('data ==>', data)
    setData(data)
  }

  return (
    <div>
      <h2 className='mb-4'>Edit Beneficiary</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(processForm)}
          className='w-full space-y-8'
        >
          <div className='gap-8 md:grid md:grid-cols-2'>
            {
              <>
                <FormField
                  control={form.control}
                  name='firstname'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input disabled={loading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='lastname'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input disabled={loading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input disabled={loading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='contactno'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input type='string' disabled={loading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{' '}
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type='string' disabled={loading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            }
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            {' '}
            Save
          </Button>
        </form>
      </Form>
    </div>
  )
}
