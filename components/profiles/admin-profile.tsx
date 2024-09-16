import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card'
import { Button } from '../ui/button'
import { SquarePenIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { getProfile } from '@/app/api/services'
import { useQuery } from '@tanstack/react-query'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import ProfileForm from '../forms/edit-profile'

function AdminProfile() {
  const { data } = useQuery({ queryKey: ['profile'], queryFn: getProfile })
  return (
    <div className='space-y-8'>
      <Card className='flex items-center'>
        <CardHeader>
          <Avatar className='h-20 w-20'>
            <AvatarImage src='' alt='profile picture' />
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </CardHeader>
        <div>
          <CardTitle>
            {data?.firstName} {data?.lastName}
          </CardTitle>
        </div>
      </Card>{' '}
      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 gap-y-12 justify-between'>
            <div>
              <h3>First Name</h3>
              <CardDescription>{data?.firstName}</CardDescription>
            </div>
            <div>
              <h3>Last Name</h3>
              <CardDescription>{data?.lastName}</CardDescription>
            </div>
            <div>
              <h3>Email Address</h3>
              <CardDescription>{data?.email}</CardDescription>
            </div>
            <div>
              <h3>Phone Number</h3>
              <CardDescription>{data?.phoneNumber}</CardDescription>
            </div>
            <div>
              <h3>Position</h3>
              <CardDescription>{data?.position}</CardDescription>
            </div>
            <div>
              <h3>Gender</h3>
              <CardDescription>{data?.gender}</CardDescription>
            </div>
          </div>
        </CardContent>

        <CardFooter className='flex justify-end'>
          <Dialog>
            <DialogTrigger asChild>
              <Button className='bg-customblue'>
                <SquarePenIcon className='mr-2 h-4 w-4' /> Edit
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[600px]'>
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when .
                </DialogDescription>
              </DialogHeader>
              <ProfileForm />
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}

export default AdminProfile
