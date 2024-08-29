import { DataTable } from '@/components/ui/data-table'
import { columns } from './column'
import { IResponse, IRoutes } from '@/types/admin'
import { useEffect, useState } from 'react'
import { getAllRoutes } from '@/app/api/services'
import { useQuery } from '@tanstack/react-query'

export default function RoutesTable() {
  const { data, isPending } = useQuery({
    queryKey: ['routes'],
    queryFn: getAllRoutes
  })
  console.log(data)
  const dataSource = data?.responseData

  return (
    <div className='py-10'>
      {isPending ? (
        'Loading...'
      ) : (
        <DataTable searchKey='origin' columns={columns} data={dataSource} />
      )}
    </div>
  )
}
