'use client'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useState } from 'react'

const formSchema = z.object({
  username: z.string(),
  password: z.string()
})

export type UserFormValue = z.infer<typeof formSchema>
export default function UserAuthForm() {
  const [loading, setLoading] = useState(false)
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema)
  })
  return (
    <>
      <Form {...form}>
        <form className='w-full space-y-4'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type='username'
                    placeholder='Enter your username...'
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter your password...'
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={loading}
            className='ml-auto w-full bg-customblue'
            type='submit'
          >
            {loading ? 'loading...' : 'Login'}
          </Button>
        </form>
      </Form>
    </>
  )
}
