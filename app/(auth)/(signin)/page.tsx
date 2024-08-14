import UserAuthForm from '@/components/forms/user-auth-form'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
}
export default function AuthenticationPage() {
  return (
    <div className='h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Image
        src='/login-bg.jpeg'
        alt='login bg'
        width={400}
        height={400}
        className='object-cover h-full w-full border border-green-800'
        priority
      />

      <div className='flex h-full items-center p-4'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight text-[#205BBB]'>
              Welcome!
            </h1>
            <p className='text-sm text-black'>Login to your account.</p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  )
}
