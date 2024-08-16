import { useEffect, useState } from 'react'

function useRole() {
  const [role, setRole] = useState('')
  useEffect(() => {
    const role = localStorage.getItem('role')
    setRole(role as string)
  }, [])
  return role
}

export default useRole
