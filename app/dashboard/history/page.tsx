'use client'
import PageContainer from '@/components/layout/page-container'
import AdminProfile from '@/components/profiles/admin-profile'
import BTransactionHistory from '@/components/tables/bank-tables/history'
import InvTransactionHistory from '@/components/tables/investor-tables/history'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'
const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Transaction History', link: '/dashboard/history' }
]
export default function History() {
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
        return <BTransactionHistory />
      case 'investor':
        return <InvTransactionHistory />
      default:
        break
    }
  }
  return (
    <div className='space-y-2'>
      <Breadcrumbs items={breadcrumbItems} />
      <Heading
        title='Transaction History'
        description='View all your transaction history'
      />
      <Separator />

      {role ? renderContent() : <p>Loading...</p>}
    </div>
  )
}
