import { DataTable } from '@/components/ui/data-table'
import { columns } from './column'
import { getAllPrice } from '@/app/api/services'
import { useQuery } from '@tanstack/react-query'
import { DataTableSkeletonLoader } from '@/components/skeleton'

export default function PriceList() {
  const { data, isPending } = useQuery({
    queryKey: ['price-list'],
    queryFn: getAllPrice
  })
  const dataSource = data?.responseData

  return (
    <div className='py-10'>
      {isPending ? (
        <DataTableSkeletonLoader />
      ) : (
        <DataTable searchKey='price' columns={columns} data={dataSource} />
      )}
    </div>
  )
}
