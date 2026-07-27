"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  FileText, 
  Settings,
  BarChart3,
  Calendar,
  LogOut,
  Menu,
  X,
  ShoppingCart,
  DollarSign,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"

const adminNavigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Bookings", href: "/admin/bookings", icon: Package },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Quotes", href: "/admin/quotes", icon: FileText },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Calendar", href: "/admin/calendar", icon: Calendar },
  { name: "Services", href: "/admin/services", icon: ShoppingCart },
  { name: "Pricing", href: "/admin/pricing", icon: DollarSign },
  { name: "Staff", href: "/admin/staff", icon: Zap },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

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
    <nav className="space-y-1">
      {adminNavigation.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        return (
          <Link key={item.href} href={item.href}>
            <button
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-black text-white"
                  : "text-slate-700 hover:text-black hover:bg-slate-100"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </button>
          </Link>
        )
      })}
      <button
        type="button"
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:text-white hover:bg-red-600 transition-colors mt-6 border border-slate-200"
      >
        <LogOut className="h-5 w-5" />
        Sign Out
      </button>
    </nav>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-xl font-bold text-black">FineMove Admin</h1>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <AdminNav />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-1 border-r border-slate-200 bg-slate-50">
          <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-6 mb-8">
              <Link href="/admin/dashboard">
                <h1 className="text-xl font-bold text-black">FineMove Admin</h1>
              </Link>
            </div>
            <AdminNav />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-700 hover:text-black"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-black">Admin</p>
                <p className="text-xs text-slate-600">Administrator</p>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}
