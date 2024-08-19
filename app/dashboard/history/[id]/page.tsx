'use client'
import AdminProfile from '@/components/profiles/admin-profile'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import BankView from '@/components/view/bank-view-details'
import { useEffect, useState } from 'react'

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Transaction Id', link: '/dashboard/history/id' }
]
export default function TransactionId() {
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    // Access localStorage only after the component has mounted
    const userRole = localStorage.getItem('role')
    setRole(userRole)
  }, [])
  const renderContent = () => {
    switch (role) {
      case 'admin':
        return <AdminProfile />
      case 'bank':
        return <BankView />

      default:
        break
    }
  }
  return (
    <div className='space-y-2'>
      <Breadcrumbs items={breadcrumbItems} />
      <Heading
        title='Transaction TH.0.01'
        description='View transaction details'
      />
      <Separator />
      {role ? renderContent() : <p>Loading...</p>}
    </div>
  )
}
