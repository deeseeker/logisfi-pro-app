import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'

function getData(): any {
  // Fetch data from your axiosInstance here.
  return [
    {
      key: 1,
      transactionId: 'THH.3.40',
      shipper: 'FMN',
      origin: 'Lagos',
      destination: 'Kano',
      truckSize: '30 Tons',
      disbursement: '#400,000'
    },
    {
      key: 1,
      transactionId: 'THH.3.40',
      shipper: 'FMN',
      origin: 'Lagos',
      destination: 'Kano',
      truckSize: '30 Tons',
      disbursement: '#400,000'
    },
    {
      key: 1,
      transactionId: 'THH.3.40',
      shipper: 'FMN',
      origin: 'Lagos',
      destination: 'Kano',
      truckSize: '30 Tons',
      disbursement: '#400,000'
    },
    {
      key: 1,
      transactionId: 'THH.3.40',
      shipper: 'FMN',
      origin: 'Lagos',
      destination: 'Kano',
      truckSize: '30 Tons',
      disbursement: '#400,000'
    },
    {
      key: 1,
      transactionId: 'THH.3.40',
      shipper: 'FMN',
      origin: 'Lagos',
      destination: 'Kano',
      truckSize: '30 Tons',
      disbursement: '#400,000'
    },
    {
      key: 1,
      transactionId: 'THH.3.40',
      shipper: 'FMN',
      origin: 'Lagos',
      destination: 'Kano',
      truckSize: '30 Tons',
      disbursement: '#400,000'
    }
    // ...
  ]
}

export default function BTransactionHistory() {
  const data = getData()

  return (
    <div>
      <DataTable searchKey='transactions' columns={columns} data={data} />
    </div>
  )
}
