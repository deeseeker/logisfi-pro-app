import Header from '@/components/layout/header'
import Sidebar from '@/components/layout/sidebar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Logisfi-pro Dashboard',
  description: 'Multi-user dashboard that renders contents based on user roles'
}

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex'>
      <Sidebar />
      <main className='w-full flex-1 overflow-hidden bg-[#f5f9ff]'>
        <Header />
        {children}
      </main>
    </div>
  )
}
