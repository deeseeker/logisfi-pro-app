import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const schemaToDate = (date: any) => {
  const dateValue = new Date(date)
  const year = dateValue.getFullYear()
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
    dateValue
  )
  const day = dateValue.getDate()

  return `${month} ${day}, ${year}`
}
