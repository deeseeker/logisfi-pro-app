'use client'
import React from 'react'
import { DashboardNav } from '@/components/dashboard-nav'
import { navItems } from '@/constants/data'
import { cn } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'
import { useSidebar } from '@/hooks/useSidebar'
import Logisfipro from '@/public/logisfi-icon.svg'
import Link from 'next/link'
import Image from 'next/image'

type SidebarProps = {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar()

  const handleToggle = () => {
    toggle()
  }

  return (
    <aside
      className={cn(
        `relative  hidden h-screen flex-none border-r bg-card transition-[width] duration-500 md:block`,
        !isMinimized ? 'w-64' : 'max-w-20',
        className
      )}
    >
      <div className='hidden p-5 pt-10 md:block'>
        <Link href={''}>
          <Image
            src='/logisfi-icon.svg'
            width={121}
            height={30}
            alt='logisfi pro icon'
          />
        </Link>
      </div>
      <ChevronLeft
        className={cn(
          'absolute -right-3 top-10 z-50  cursor-pointer rounded-full border bg-background text-3xl text-customblue',
          isMinimized && 'rotate-180'
        )}
        onClick={handleToggle}
      />
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
          <div className='mt-3 space-y-1'>
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </aside>
  )
}
