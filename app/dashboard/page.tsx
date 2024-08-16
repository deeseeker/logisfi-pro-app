'use client'
import AdminDashboard from '@/components/dashboards/admin-dashboard'
import BankDashboard from '@/components/dashboards/bank-dashboard'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    // Access localStorage only after the component has mounted
    const userRole = localStorage.getItem('role')
    setRole(userRole)
  }, [])

  const renderContent = () => {
    switch (role) {
      case 'admin':
        return <AdminDashboard />
      case 'bank':
        return <BankDashboard />

      default:
        break
    }
  }
  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-2xl font-bold tracking-tight text-customblue'>
          Hi, Welcome back 👋
        </h2>
        <div className='hidden items-center space-x-2 md:flex'>
          {/* <CalendarDateRangePicker /> */}
          <Button className='bg-[#001475]'>Download Report</Button>
        </div>
      </div>
      {role ? renderContent() : <p>Loading...</p>}
    </div>
  )
}
