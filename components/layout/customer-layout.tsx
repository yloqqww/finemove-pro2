"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Receipt, 
  User, 
  LogOut,
  Menu,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/customer/dashboard", icon: LayoutDashboard },
  { name: "Bookings", href: "/customer/bookings", icon: Package },
  { name: "Quotes", href: "/customer/quotes", icon: FileText },
  { name: "Invoices", href: "/customer/invoices", icon: Receipt },
  { name: "Profile", href: "/customer/profile", icon: User },
]

export function CustomerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { userDetails, signOut } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 p-6">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-xl font-bold">FineMove Pro</h1>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <Nav />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-1 border-r bg-white dark:bg-gray-800">
          <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-6 mb-8">
              <Link href="/">
                <h1 className="text-xl font-bold">FineMove Pro</h1>
              </Link>
            </div>
            <Nav />
          </div>

          {/* User section */}
          <div className="flex flex-shrink-0 border-t p-4">
            <div className="flex items-center w-full">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{userDetails?.name}</p>
                <p className="text-xs text-gray-500 truncate">{userDetails?.email}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={signOut}
                className="hover:bg-red-100 hover:text-red-600 text-gray-600 transition-colors"
                title="Sign Out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="sticky top-0 z-10 lg:hidden flex h-16 items-center gap-x-4 border-b bg-white px-4 shadow-sm dark:bg-gray-800">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">FineMove Pro</h1>
          </div>
        </div>

        <main className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )

  function Nav() {
    return (
      <nav className="flex-1 space-y-1 px-3">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                  : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 flex-shrink-0 h-5 w-5",
                  isActive ? "text-gray-900 dark:text-white" : "text-gray-400 group-hover:text-gray-600"
                )}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>
    )
  }
}
