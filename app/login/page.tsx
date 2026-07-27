'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      // Mock authentication - accept any email/password
      if (!email || !password) {
        setMessage({ type: 'error', text: 'Please fill in all fields' })
        setLoading(false)
        return
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Store mock user session in both localStorage and cookie
      const userData = {
        id: '123',
        email,
        name: email.split('@')[0],
        role: email.includes('admin') ? 'ADMIN' : 'CUSTOMER'
      }
      
      localStorage.setItem('user', JSON.stringify(userData))
      
      // Also set cookie for server-side middleware
      document.cookie = `user=${JSON.stringify(userData)}; path=/; max-age=86400`

      setMessage({ type: 'success', text: 'Logged in successfully! Redirecting...' })
      
      // Redirect based on role immediately (no delay)
      if (email.includes('admin')) {
        router.push('/admin/dashboard')
      } else {
        router.push('/customer/dashboard')
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Login failed. Please try again.' })
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black mb-4">
            <span className="text-white font-bold text-lg">FM</span>
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">Welcome Back</h1>
          <p className="text-slate-700">Sign in to manage your shipments</p>
        </div>

        {/* Login Card */}
        <Card className="bg-white border-slate-200 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-black">Sign In</CardTitle>
            <CardDescription className="text-slate-700">Enter your credentials to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {message && (
                <div className={`flex items-center gap-3 p-3 rounded-lg ${message.type === 'success' ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
                  {message.type === 'success' ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  )}
                  <p className={`text-sm font-medium ${message.type === 'success' ? 'text-emerald-800' : 'text-red-800'}`}>
                    {message.text}
                  </p>
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium text-black">Email Address</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border-slate-200 text-black placeholder:text-slate-400 focus:border-black focus:ring-black"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-black">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white border-slate-200 text-black placeholder:text-slate-400 focus:border-black focus:ring-black"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-black hover:bg-slate-900 text-white font-semibold h-11 rounded-lg transition-all duration-200"
              >
                {loading ? 'Signing in...' : 'Sign In'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            {/* Quick Login Demo */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-xs text-black font-semibold mb-3">Demo Accounts:</p>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setEmail('customer@example.com')
                    setPassword('password123')
                  }}
                  className="w-full p-2 text-xs text-black bg-slate-100 hover:bg-slate-200 rounded transition-colors text-left"
                >
                  👤 Customer: customer@example.com
                </button>
                <button
                  onClick={() => {
                    setEmail('admin@example.com')
                    setPassword('password123')
                  }}
                  className="w-full p-2 text-xs text-black bg-slate-100 hover:bg-slate-200 rounded transition-colors text-left"
                >
                  👨‍💼 Admin: admin@example.com
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-slate-700">
            Don't have an account?{' '}
            <Link href="/signup" className="text-black hover:text-slate-700 font-semibold transition-colors">
              Sign up now
            </Link>
          </p>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-3 gap-4">
          {[
            { icon: '🛡️', label: 'Secure' },
            { icon: '⚡', label: 'Fast' },
            { icon: '🎯', label: 'Reliable' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-xs text-slate-700">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
