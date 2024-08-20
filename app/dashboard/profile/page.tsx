'use client'
import AdminProfile from '@/components/profiles/admin-profile'
import BankProfile from '@/components/profiles/bank-profile'
import InvestorProfile from '@/components/profiles/investor-profile'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Profile', link: '/dashboard/profile' }
]
export default function Profile() {
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
        return <BankProfile />
      case 'investor':
        return <InvestorProfile />
      default:
        break
    }
  }
  return (
    <div>
      <div className='space-y-2'>
        <Breadcrumbs items={breadcrumbItems} />
        <Heading title='Profile' description='Manage your profile' />
        {/* <Separator /> */}
        {role ? renderContent() : <p>Loading...</p>}
      </div>
    </div>
  )
}
