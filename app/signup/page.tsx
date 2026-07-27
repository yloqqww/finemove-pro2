'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Check, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      if (!formData.name || !formData.email || !formData.password) {
        setMessage({ type: 'error', text: 'Please fill in all fields' })
        setLoading(false)
        return
      }

      if (formData.password !== formData.confirmPassword) {
        setMessage({ type: 'error', text: 'Passwords do not match' })
        setLoading(false)
        return
      }

      if (!passwordRequirements.every(req => req.met)) {
        setMessage({ type: 'error', text: 'Password does not meet requirements' })
        setLoading(false)
        return
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Store mock user session
      localStorage.setItem('user', JSON.stringify({
        id: Math.random().toString(),
        email: formData.email,
        name: formData.name,
        role: 'CUSTOMER'
      }))

      setMessage({ type: 'success', text: 'Account created! Redirecting to dashboard...' })
      
      // Redirect to customer dashboard
      setTimeout(() => {
        router.push('/customer/dashboard')
      }, 1500)
    } catch (error) {
      setMessage({ type: 'error', text: 'Signup failed. Please try again.' })
      setLoading(false)
    }
  }

  const passwordRequirements = [
    { met: formData.password.length >= 8, label: 'At least 8 characters' },
    { met: /[A-Z]/.test(formData.password), label: 'One uppercase letter' },
    { met: /[a-z]/.test(formData.password), label: 'One lowercase letter' },
    { met: /[0-9]/.test(formData.password), label: 'One number' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black mb-4">
            <span className="text-white font-bold text-lg">FM</span>
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">Get Started</h1>
          <p className="text-slate-700">Join FineMove Pro today</p>
        </div>

        {/* Signup Card */}
        <Card className="bg-white border-slate-200 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-black">Create Account</CardTitle>
            <CardDescription className="text-slate-700">Premium fine art logistics awaits</CardDescription>
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
                <label className="text-sm font-medium text-black">Full Name</label>
                <Input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-white border-slate-200 text-black placeholder:text-slate-400 focus:border-black focus:ring-black"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-black">Email Address</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white border-slate-200 text-black placeholder:text-slate-400 focus:border-black focus:ring-black"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-black">Password</label>
                <Input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-white border-slate-200 text-black placeholder:text-slate-400 focus:border-black focus:ring-black"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-black">Confirm Password</label>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-white border-slate-200 text-black placeholder:text-slate-400 focus:border-black focus:ring-black"
                  required
                />
              </div>

              {/* Password Requirements */}
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <p className="text-xs font-medium text-black mb-3">Password must contain:</p>
                <div className="space-y-2">
                  {passwordRequirements.map((req) => (
                    <div key={req.label} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${req.met ? 'bg-black' : 'bg-slate-300'}`}>
                        {req.met && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`text-xs ${req.met ? 'text-black font-medium' : 'text-slate-700'}`}>{req.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || !formData.password || formData.password !== formData.confirmPassword}
                className="w-full bg-black hover:bg-slate-900 text-white font-semibold h-11 rounded-lg transition-all duration-200"
              >
                {loading ? 'Creating account...' : 'Create Account'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-slate-700">
            Already have an account?{' '}
            <Link href="/login" className="text-black hover:text-slate-700 font-semibold transition-colors">
              Sign in here
            </Link>
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-12 space-y-3">
          {[
            '✨ Premium white-glove service',
            '🛡️ Full insurance coverage',
            '⚡ Real-time tracking',
            '🎯 Expert support team',
          ].map((benefit) => (
            <div key={benefit} className="flex items-center gap-3 text-slate-800 text-sm">
              <div className="w-1 h-1 rounded-full bg-black" />
              {benefit}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
