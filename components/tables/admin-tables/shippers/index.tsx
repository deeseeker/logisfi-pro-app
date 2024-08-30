import { DataTable } from '@/components/ui/data-table'
import { columns } from './column'
import { getAllRoutes, getAllShippers, getAllVendors } from '@/app/api/services'
import { useQuery } from '@tanstack/react-query'

export default function ShippersTable() {
  const { data, isPending } = useQuery({
    queryKey: ['shippers'],
    queryFn: getAllShippers
  })
  console.log(data)
  const dataSource = data?.responseData

  return (
    <div className='py-10'>
      {isPending ? (
        'Loading...'
      ) : (
        <DataTable searchKey='shippers' columns={columns} data={dataSource} />
      )}
    </div>
  )
}
