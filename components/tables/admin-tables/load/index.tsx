import { DataTable } from '@/components/ui/data-table'
import { columns } from './column'
import { getAllShipments } from '@/app/api/services'
import { useQuery } from '@tanstack/react-query'
import { DataTableSkeletonLoader } from '@/components/skeleton'

export default function LoadTable() {
  const { data, isPending } = useQuery({
    queryKey: ['loads'],
    queryFn: getAllShipments
  })
  console.log(data)
  const dataSource = data?.responseData

  return (
    <div className='py-10'>
      {isPending ? (
        <DataTableSkeletonLoader />
      ) : (
        <DataTable searchKey='origin' columns={columns} data={dataSource} />
      )}
    </div>
  )
}
