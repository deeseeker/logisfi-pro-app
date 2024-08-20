import useRole from '@/hooks/useRole'
import { NavItem } from '@/types'

function NavItems() {
  const role = useRole()
  const adminItems: NavItem[] =
    role === 'admin'
      ? [
          {
            title: 'Account',
            href: '/dashboard/account',
            icon: 'account',
            label: 'account'
          },
          {
            title: 'Transactions',
            href: '/dashboard/transactions',
            icon: 'transactions',
            label: 'transactions'
          },
          {
            title: 'Investments',
            href: '/dashboard/investments',
            icon: 'investments',
            label: 'investments'
          },
          {
            title: 'Withdrawals',
            href: '/dashboard/withdrawals',
            icon: 'withdrawals',
            label: 'withdrawals'
          },
          {
            title: 'Shippers',
            href: '/dashboard/shippers',
            icon: 'shippers',
            label: 'shippers'
          },
          {
            title: 'Vendors',
            href: '/dashboard/vendors',
            icon: 'vendors',
            label: 'vendors'
          },
          {
            title: 'Drivers',
            href: '/dashboard/drivers',
            icon: 'drivers',
            label: 'drivers'
          }
        ]
      : []
  const investorItems: NavItem[] =
    role === 'investor'
      ? [
          {
            title: 'Beneficiary',
            href: '/dashboard/beneficiary',
            icon: 'beneficiary',
            label: 'beneficiary'
          }
        ]
      : []

  const navItems: NavItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: 'dashboard',
      label: 'Dashboard'
    },
    {
      title: 'Profile',
      href: '/dashboard/profile',
      icon: 'profile',
      label: 'profile'
    },
    ...adminItems,
    ...investorItems,
    //  role==='admin' && ...adminItems,
    {
      title: 'History',
      href: '/dashboard/history',
      icon: 'history',
      label: 'history'
    },
    {
      title: 'Logout',
      href: '/',
      icon: 'logout',
      label: 'logout'
    }
  ]
  return navItems
}

export default NavItems
