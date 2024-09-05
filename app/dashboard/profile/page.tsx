'use client'
import AdminProfile from '@/components/profiles/admin-profile'
import BankProfile from '@/components/profiles/bank-profile'
import InvestorProfile from '@/components/profiles/investor-profile'
import { Heading } from '@/components/ui/heading'
import { useEffect, useState } from 'react'

export default function Profile() {
  const [role, setRole] = useState<string>()

  useEffect(() => {
    // Access localStorage only after the component has mounted
    const userRole = JSON.parse(localStorage.getItem('roles') as string)

    setRole(userRole[0])
  }, [role])
  const renderContent = () => {
    switch (role) {
      case 'Admin':
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
        <Heading title='Profile' description='Manage your profile' />
        {role ? renderContent() : <p>Loading...</p>}
      </div>
    </div>
  )
}
