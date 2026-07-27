'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Package,
  FileText,
  Receipt,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/customer/dashboard', icon: LayoutDashboard },
  { name: 'Bookings', href: '/customer/bookings', icon: Package },
  { name: 'Quotes', href: '/customer/quotes', icon: FileText },
  { name: 'Invoices', href: '/customer/invoices', icon: Receipt },
  { name: 'Profile', href: '/customer/profile', icon: User },
]

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    try {
      // Call the logout API to clear the cookie
      await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {
        // Silently fail - still log out client-side
      })
      
      // Clear client-side storage
      localStorage.removeItem('user')
      localStorage.removeItem('auth')
      sessionStorage.clear()
      
      // Navigate to login
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
      // Fallback to just pushing to login
      router.push('/login')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="text-xl font-bold text-black">
                FineMove
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="text-slate-700 hover:text-black">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <Nav pathname={pathname} onLogout={handleLogout} />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-1 border-r border-slate-200 bg-slate-50">
          <div className="flex items-center flex-shrink-0 px-6 py-8">
            <Link href="/" className="text-2xl font-bold text-black hover:opacity-80 transition-opacity">
              FineMove
            </Link>
          </div>
          <Nav pathname={pathname} onLogout={handleLogout} />

          {/* User Section */}
          <div className="flex flex-shrink-0 border-t border-slate-200 p-4 mt-auto">
            <div className="flex items-center gap-3 w-full px-2">
              <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center text-black font-semibold text-sm">
                YL
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-black truncate">You</p>
                <p className="text-xs text-slate-700 truncate">Premium Member</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Mobile Header */}
        <div className="sticky top-0 z-30 lg:hidden flex h-16 items-center gap-x-4 border-b border-slate-200 bg-white px-4">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="text-slate-700 hover:text-black">
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="text-lg font-bold text-black">
            FineMove
          </Link>
        </div>

        {/* Content */}
        <main className="min-h-screen">{children}</main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-slate-50 py-8 px-4 lg:px-8">
          <div className="mx-auto max-w-7xl text-center text-slate-700 text-sm">
            <p>© 2026 FineMove Pro. Premium Fine Art & White-Glove Logistics</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

function Nav({ pathname, onLogout }: { pathname: string; onLogout: () => void }) {
  return (
    <nav className="flex-1 space-y-2 px-3 py-6">
      {navigation.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
        const Icon = item.icon
        return (
          <Link key={item.name} href={item.href}>
            <div
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200',
                isActive
                  ? 'bg-black text-white'
                  : 'text-slate-800 hover:text-black hover:bg-slate-200'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
              {isActive && <ChevronDown className="ml-auto h-4 w-4" />}
            </div>
          </Link>
        )
      })}

      {/* Sign Out Button */}
      <button
        type="button"
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-sm text-slate-800 hover:text-white hover:bg-red-600 transition-all duration-200 mt-8 border-t border-slate-200 pt-6"
      >
        <LogOut className="h-5 w-5" />
        Sign Out
      </button>
    </nav>
  )
}
