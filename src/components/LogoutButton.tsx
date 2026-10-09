'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { logout } from '@/app/actions/auth'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/login')
    router.refresh()
  }

  return (
    <button 
      onClick={handleLogout} 
      title="Logout"
      className="p-2 hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-colors rounded-full"
    >
      <LogOut className="h-5 w-5" />
    </button>
  )
}
