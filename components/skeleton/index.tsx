'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

export function DataTableSkeletonLoader() {
  return (
    <>
      <Skeleton className='mb-4 w-full md:max-w-sm h-10' />
      <ScrollArea className='h-[calc(80vh-220px)] rounded-md border md:h-[calc(80dvh-200px)] bg-white'>
        <Table className='relative'>
          <TableHeader>
            <TableRow>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableHead key={index}>
                  <Skeleton className='h-4 w-24' />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: 5 }).map((_, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Skeleton className='h-6 w-full' />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Skeleton className='flex-1 h-6 w-24' />
        <div className='space-x-2'>
          <Skeleton className='h-8 w-20' />
          <Skeleton className='h-8 w-20' />
        </div>
      </div>
    </>
  )
}
