import { DataTable } from '@/components/ui/data-table'
import { columns } from './column'
import { getAllRoutes, getAllVendors } from '@/app/api/services'
import { useQuery } from '@tanstack/react-query'

export default function VendorsTable() {
  const { data, isPending } = useQuery({
    queryKey: ['vendors'],
    queryFn: getAllVendors
  })
  console.log(data)
  const dataSource = data?.responseData

  return (
    <div className='py-10'>
      {isPending ? (
        'Loading...'
      ) : (
        <DataTable searchKey='vendor' columns={columns} data={dataSource} />
      )}
    </div>
  )
}
