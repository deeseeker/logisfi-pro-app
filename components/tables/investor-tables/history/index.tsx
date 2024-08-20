import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'

function getData(): any {
  // Fetch data from your API here.
  return [
    {
      key: '1',
      name: 'Stephanie Okeke',
      bankName: 'GT bank',
      accountNumber: '1233456789',
      percentage: '10%'
    },
    {
      key: '1',
      name: 'Stephanie Okeke',
      bankName: 'GT bank',
      accountNumber: '1233456789',
      percentage: '10%'
    },
    {
      key: '1',
      name: 'Stephanie Okeke',
      bankName: 'GT bank',
      accountNumber: '1233456789',
      percentage: '10%'
    },
    {
      key: '1',
      name: 'Stephanie Okeke',
      bankName: 'GT bank',
      accountNumber: '1233456789',
      percentage: '10%'
    },
    {
      key: '1',
      name: 'Stephanie Okeke',
      bankName: 'GT bank',
      accountNumber: '1233456789',
      percentage: '10%'
    },
    {
      key: '1',
      name: 'Stephanie Okeke',
      bankName: 'GT bank',
      accountNumber: '1233456789',
      percentage: '10%'
    },
    {
      key: '1',
      name: 'Stephanie Okeke',
      bankName: 'GT bank',
      accountNumber: '1233456789',
      percentage: '10%'
    },
    {
      key: '1',
      name: 'Stephanie Okeke',
      bankName: 'GT bank',
      accountNumber: '1233456789',
      percentage: '10%'
    },
    {
      key: '1',
      name: 'Stephanie Okeke',
      bankName: 'GT bank',
      accountNumber: '1233456789',
      percentage: '10%'
    },
    {
      key: '1',
      name: 'Stephanie Okeke',
      bankName: 'GT bank',
      accountNumber: '1233456789',
      percentage: '10%'
    },
    {
      key: '1',
      name: 'Stephanie Okeke',
      bankName: 'GT bank',
      accountNumber: '1233456789',
      percentage: '10%'
    }
    // ...
  ]
}

export default function InvTransactionHistory() {
  const data = getData()

  return (
    <div>
      <DataTable searchKey='transactions' columns={columns} data={data} />
    </div>
  )
}
