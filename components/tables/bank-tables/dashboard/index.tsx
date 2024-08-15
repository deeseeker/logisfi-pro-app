import { DataTable } from '@/components/ui/data-table'
import { TransactionType, columns } from './columns'

async function getData(): Promise<TransactionType[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      name: 'Bukola Morakinyo',
      transactionId: 'Redeemed ROI',
      amount: 30000,
      date: '12/02/2020',
      status: 'success'
    },
    {
      id: '728ed52f',
      name: 'Bukola Morakinyo',
      transactionId: 'Redeemed ROI',
      amount: 30000,
      date: '12/02/2020',
      status: 'success'
    },
    {
      id: '728ed52f',
      name: 'Bukola Morakinyo',
      transactionId: 'Redeemed ROI',
      amount: 30000,
      date: '12/02/2020',
      status: 'success'
    }
    // ...
  ]
}

export default async function ActiveTransactions() {
  const data = await getData()

  return (
    <div className='py-10'>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
