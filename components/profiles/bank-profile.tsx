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

type Props = {}

function BankProfile() {
  return (
    <div className='space-y-8'>
      <Card className='flex items-center'>
        <CardHeader>
          <Avatar className='h-20 w-20'>
            <AvatarImage src='' alt='profile picture' />
            <AvatarFallback>SB</AvatarFallback>
          </Avatar>
        </CardHeader>
        <div>
          <CardTitle>Sterling Bank</CardTitle>
        </div>
      </Card>{' '}
      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-3 gap-y-4'>
            <div>
              <h3>First Name</h3>
              <CardDescription>Adedamola </CardDescription>
            </div>
            <div>
              <h3>Last Name</h3>
              <CardDescription>Chinonso</CardDescription>
            </div>
            <div>
              <h3>Email Address</h3>
              <CardDescription>bmorakinyo@thehaulagehub.com</CardDescription>
            </div>
            <div>
              <h3>Phone Number</h3>
              <CardDescription>123456789</CardDescription>
            </div>
            <div>
              <h3>Position</h3>
              <CardDescription>Managing Director</CardDescription>
            </div>
            <div>
              <h3>Cost of Fund</h3>
              <CardDescription>2.5%</CardDescription>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button className='bg-customblue'>
            <SquarePenIcon className='mr-2 h-4 w-4' /> Edit
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default BankProfile
