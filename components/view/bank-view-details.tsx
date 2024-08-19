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
import Link from 'next/link'

type Props = {}

function BankView() {
  return (
    <div className='space-y-8'>
      <Card>
        <CardHeader className='text-lg font-medium text-[#205BBB] bg-[#F5F9FF] px-6 py-4 rounded-lg m-4'>
          Shipper&apos;s Details
        </CardHeader>
        <CardContent className='m-4'>
          <div className='grid grid-cols-3 gap-y-4'>
            <div>
              <h3 className='font-normal'>Name</h3>
              <CardDescription>FMN</CardDescription>
            </div>
            <div>
              <h3>Price</h3>
              <CardDescription>#500,000</CardDescription>
            </div>
            <div>
              <h3>Origin</h3>
              <CardDescription>Lagos</CardDescription>
            </div>
            <div>
              <h3>Destination</h3>
              <CardDescription>Kano</CardDescription>
            </div>
            <div>
              <h3>Truck Size</h3>
              <CardDescription>30Tons</CardDescription>
            </div>
            <div>
              <h3>Created Date</h3>
              <CardDescription>01/05/2024</CardDescription>
            </div>
          </div>
        </CardContent>
        <CardHeader className='text-lg font-medium text-[#205BBB] bg-[#F5F9FF] px-6 py-4 rounded-lg m-4'>
          Vendor Details
        </CardHeader>
        <CardContent className='m-4'>
          <div className='grid grid-cols-3 gap-y-4'>
            <div>
              <h3 className='font-normal'>Name</h3>
              <CardDescription>Alh. Gana & co</CardDescription>
            </div>
            <div>
              <h3 className='font-normal'>Vendor Price</h3>
              <CardDescription>#400,000</CardDescription>
            </div>
            <div>
              <h3 className='font-normal'>Account Name</h3>
              <CardDescription>Alh. Gana & co</CardDescription>
            </div>
            <div>
              <h3 className='font-normal'>Account Number</h3>
              <CardDescription>0123456789</CardDescription>
            </div>
            <div>
              <h3 className='font-normal'>Truck No</h3>
              <CardDescription>KJU123</CardDescription>
            </div>
          </div>
        </CardContent>
        <CardHeader className='text-lg font-medium text-[#205BBB] bg-[#F5F9FF] px-6 py-4 rounded-lg m-4'>
          Funding
        </CardHeader>
        <CardContent className='m-4'>
          <div className='grid grid-cols-3 gap-y-4'>
            <div>
              <h3 className='font-normal'>Initial Payment from Bank</h3>
              <CardDescription>#300,000</CardDescription>
            </div>
            <div>
              <h3 className='font-normal'>Balance</h3>
              <CardDescription>#100,000</CardDescription>
            </div>
            <div>
              <h3 className='font-normal'>Expected cost of Fund</h3>
              <CardDescription>#400,000</CardDescription>
            </div>
            <div>
              <h3 className='font-normal'>Mobilization Date</h3>
              <CardDescription>01/05/2024</CardDescription>
            </div>
          </div>
        </CardContent>
      </Card>{' '}
    </div>
  )
}

export default BankView
