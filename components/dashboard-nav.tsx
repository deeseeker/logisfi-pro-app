'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import { NavItem } from '@/types'
import { Dispatch, SetStateAction, useState } from 'react'
import { useSidebar } from '@/hooks/useSidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from './ui/accordion'

interface DashboardNavProps {
  items: NavItem[]
  setOpen?: Dispatch<SetStateAction<boolean>>
  isMobileNav?: boolean
}

export function DashboardNav({
  items,
  setOpen,
  isMobileNav = false
}: DashboardNavProps) {
  const path = usePathname()
  const { isMinimized } = useSidebar()

  if (!items?.length) {
    return null
  }

  return (
    <nav className='grid items-start gap-2'>
      <TooltipProvider>
        {items.map((item, index) => {
          const Icon = Icons[item.icon || 'arrowRight']
          return item.isChidren
            ? item.href && (
                <Accordion type='single' collapsible>
                  <AccordionItem className='border-none' value='item-1'>
                    <AccordionTrigger
                      className={cn(
                        'overflow-hidden rounded-md py-2 text-sm font-normal hover:no-underline hover:bg-accent hover:text-accent-foreground',
                        path === item.href ? 'bg-accent' : 'transparent',
                        item.disabled && 'cursor-not-allowed opacity-80'
                      )}
                    >
                      <Link
                        href={item.disabled ? '/' : item.href}
                        className={cn('flex items-center gap-2')}
                        onClick={() => {
                          if (setOpen) setOpen(false)
                          if (item.title === 'logout') localStorage.clear()
                        }}
                      >
                        <Icon
                          className={`ml-3 size-4 flex-none text-customblue`}
                        />

                        {isMobileNav || (!isMinimized && !isMobileNav) ? (
                          <span className='mr-2 truncate text-customblue'>
                            {item.title}
                          </span>
                        ) : (
                          ''
                        )}
                      </Link>
                    </AccordionTrigger>
                    <AccordionContent>
                      {item.children?.map((child) => {
                        const Icon = Icons[child.icon || 'arrowRight']
                        return (
                          child.href && (
                            <Tooltip key={index}>
                              <TooltipTrigger asChild>
                                <Link
                                  href={child.disabled ? '/' : child.href}
                                  className={cn(
                                    'flex childs-center gap-2 overflow-hidden rounded-md py-2 text-sm font-normal hover:bg-accent hover:text-accent-foreground',
                                    path === child.href
                                      ? 'bg-accent'
                                      : 'transparent',
                                    child.disabled &&
                                      'cursor-not-allowed opacity-80'
                                  )}
                                  onClick={() => {
                                    if (setOpen) setOpen(false)
                                    if (child.title === 'logout')
                                      localStorage.clear()
                                  }}
                                >
                                  <Icon
                                    className={`ml-3 size-4 flex-none text-customblue`}
                                  />

                                  {isMobileNav ||
                                  (!isMinimized && !isMobileNav) ? (
                                    <span className='mr-2 truncate text-customblue'>
                                      {child.title}
                                    </span>
                                  ) : (
                                    ''
                                  )}
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent
                                align='center'
                                side='right'
                                sideOffset={8}
                                className={
                                  !isMinimized ? 'hidden' : 'inline-block'
                                }
                              >
                                {child.title}
                              </TooltipContent>
                            </Tooltip>
                          )
                        )
                      })}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )
            : item.href && (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.disabled ? '/' : item.href}
                      className={cn(
                        'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-normal hover:bg-accent hover:text-accent-foreground',
                        path === item.href ? 'bg-accent' : 'transparent',
                        item.disabled && 'cursor-not-allowed opacity-80'
                      )}
                      onClick={() => {
                        if (setOpen) setOpen(false)
                        if (item.title === 'logout') localStorage.clear()
                      }}
                    >
                      <Icon
                        className={`ml-3 size-4 flex-none text-customblue`}
                      />

                      {isMobileNav || (!isMinimized && !isMobileNav) ? (
                        <span className='mr-2 truncate text-customblue'>
                          {item.title}
                        </span>
                      ) : (
                        ''
                      )}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    align='center'
                    side='right'
                    sideOffset={8}
                    className={!isMinimized ? 'hidden' : 'inline-block'}
                  >
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              )
        })}
      </TooltipProvider>
    </nav>
  )
}
