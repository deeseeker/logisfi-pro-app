import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'

function getData(): any {
  // Fetch data from your axiosInstance here.
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

export default function BeneficiaryTable() {
  const data = getData()

  return (
    <div>
      <DataTable searchKey='beneficiary' columns={columns} data={data} />
    </div>
  )
}
