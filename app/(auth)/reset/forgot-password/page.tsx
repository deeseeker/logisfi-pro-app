import { Metadata } from 'next'
import ForgotPasswordForm from '@/components/forms/forgot-password'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
}

export default function ForgotPassword() {
  return (
    <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Image
        src='/login-bg.jpeg'
        alt='login bg'
        width={400}
        height={400}
        className='object-cover h-full w-full'
        priority
      />
      <div className='flex h-full items-center p-4 lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight text-[#205BBB]'>
              Forgot Password?
            </h1>
            <p className='text-sm text-muted-foreground'>
              No worries.we will send you reset instructions.
            </p>
          </div>
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  )
}
