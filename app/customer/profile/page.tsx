"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MapPin, Key } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Mock user data
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    company: "Art Gallery NYC",
    address: "350 Fifth Avenue",
    city: "New York",
    state: "NY",
    zip: "10118",
  })

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    setIsEditing(false)
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black">Profile</h1>
        <p className="text-slate-700">
          Manage your account information
        </p>
      </div>

      {/* Personal Information */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-black">Personal Information</CardTitle>
              <CardDescription className="text-slate-600">Update your personal details</CardDescription>
            </div>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} className="bg-black hover:bg-slate-900 text-white">Edit</Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-black">Full Name</Label>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-slate-400" />
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  disabled={!isEditing}
                  className="text-black"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-black">Email</Label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  disabled={true}
                  className="text-black"
                />
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Email cannot be changed
              </p>
            </div>

            <div>
              <Label htmlFor="phone" className="text-black">Phone</Label>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400" />
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  disabled={!isEditing}
                  className="text-black"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="company" className="text-black">Company (Optional)</Label>
              <Input
                id="company"
                value={profile.company}
                onChange={(e) =>
                  setProfile({ ...profile, company: e.target.value })
                }
                disabled={!isEditing}
                className="text-black"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-slate-400" />
              <h3 className="font-semibold text-black">Address</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="address" className="text-black">Street Address</Label>
                <Input
                  id="address"
                  value={profile.address}
                  onChange={(e) =>
                    setProfile({ ...profile, address: e.target.value })
                  }
                  disabled={!isEditing}
                  className="text-black"
                />
              </div>

              <div>
                <Label htmlFor="city" className="text-black">City</Label>
                <Input
                  id="city"
                  value={profile.city}
                  onChange={(e) =>
                    setProfile({ ...profile, city: e.target.value })
                  }
                  disabled={!isEditing}
                  className="text-black"
                />
              </div>

              <div>
                <Label htmlFor="state" className="text-black">State</Label>
                <Input
                  id="state"
                  value={profile.state}
                  onChange={(e) =>
                    setProfile({ ...profile, state: e.target.value })
                  }
                  disabled={!isEditing}
                  maxLength={2}
                  className="text-black"
                />
              </div>

              <div>
                <Label htmlFor="zip" className="text-black">ZIP Code</Label>
                <Input
                  id="zip"
                  value={profile.zip}
                  onChange={(e) =>
                    setProfile({ ...profile, zip: e.target.value })
                  }
                  disabled={!isEditing}
                  maxLength={5}
                  className="text-black"
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={isSaving}
                className="border-black text-black hover:bg-slate-100"
              >
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving} className="bg-black hover:bg-slate-900 text-white">
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-black">
            <Key className="h-5 w-5" />
            Security
          </CardTitle>
          <CardDescription className="text-slate-600">Manage your password and security settings</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="border-black text-black hover:bg-slate-100">Change Password</Button>
        </CardContent>
      </Card>

      {/* Account Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-black">12</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-black">$8,450</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Member Since
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-black">Jan 2025</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
