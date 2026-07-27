'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
export default function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: 'FineMove Pro',
    email: 'admin@finemove.com',
    phone: '(555) 123-FINE',
    address: '123 Business Ave, New York, NY',
    autoConfirm: true,
    notifyCustomer: true,
    requireSignature: true,
    insuranceRequired: true,
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black">Settings</h1>
        <p className="text-slate-700">Manage system configuration</p>
      </div>

      {/* Company Information */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-black">Company Information</CardTitle>
          <CardDescription className="text-slate-600">Your company details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="companyName" className="text-black">Company Name</Label>
            <Input
              id="companyName"
              value={settings.companyName}
              onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              className="text-black"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-black">Email</Label>
            <Input
              id="email"
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="text-black"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-black">Phone</Label>
            <Input
              id="phone"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="text-black"
            />
          </div>

          <div>
            <Label htmlFor="address" className="text-black">Address</Label>
            <Input
              id="address"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="text-black"
            />
          </div>
        </CardContent>
      </Card>

      {/* Business Rules */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-black">Business Rules</CardTitle>
          <CardDescription className="text-slate-600">Configure automatic behaviors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="flex items-center justify-between p-4 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer">
            <div>
              <p className="font-medium text-black">Auto-Confirm Bookings</p>
              <p className="text-sm text-slate-600">Automatically confirm bookings after 24 hours</p>
            </div>
            <input
              type="checkbox"
              checked={settings.autoConfirm}
              onChange={(e) => setSettings({ ...settings, autoConfirm: e.target.checked })}
              className="w-5 h-5"
            />
          </label>

          <label className="flex items-center justify-between p-4 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer">
            <div>
              <p className="font-medium text-black">Notify Customers</p>
              <p className="text-sm text-slate-600">Send notifications for booking updates</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifyCustomer}
              onChange={(e) => setSettings({ ...settings, notifyCustomer: e.target.checked })}
              className="w-5 h-5"
            />
          </label>

          <label className="flex items-center justify-between p-4 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer">
            <div>
              <p className="font-medium text-black">Require Signature</p>
              <p className="text-sm text-slate-600">Require delivery signature on all shipments</p>
            </div>
            <input
              type="checkbox"
              checked={settings.requireSignature}
              onChange={(e) => setSettings({ ...settings, requireSignature: e.target.checked })}
              className="w-5 h-5"
            />
          </label>

          <label className="flex items-center justify-between p-4 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer">
            <div>
              <p className="font-medium text-black">Insurance Required</p>
              <p className="text-sm text-slate-600">Require insurance for all bookings</p>
            </div>
            <input
              type="checkbox"
              checked={settings.insuranceRequired}
              onChange={(e) => setSettings({ ...settings, insuranceRequired: e.target.checked })}
              className="w-5 h-5"
            />
          </label>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="bg-white border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
          <CardDescription className="text-slate-600">Irreversible actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-50">
            Clear All Data
          </Button>
          <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-50">
            Reset System
          </Button>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex items-center gap-3">
        <Button onClick={handleSave} className="bg-black hover:bg-slate-900 text-white">
          Save Settings
        </Button>
        {saved && (
          <p className="text-sm text-emerald-600 font-medium">✓ Settings saved successfully</p>
        )}
      </div>
    </div>
  )
}
