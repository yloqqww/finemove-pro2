'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Package, TrendingUp, Clock, CheckCircle2, ArrowRight } from "lucide-react"

export default function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-2">Welcome Back</h1>
            <p className="text-lg text-slate-700">Track your bookings and manage your premium shipments</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <Link href="/customer/bookings/new">
              <Button className="w-full h-12 bg-black hover:bg-slate-900 text-white text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all">
                <Package className="mr-2 h-5 w-5" />
                New Booking
              </Button>
            </Link>
            <Link href="/customer/bookings">
              <Button variant="outline" className="w-full h-12 border-slate-400 text-black hover:bg-slate-100 text-base font-semibold rounded-lg hover:border-slate-500">
                <Clock className="mr-2 h-5 w-5" />
                My Bookings
              </Button>
            </Link>
            <Link href="/customer/quotes">
              <Button variant="outline" className="w-full h-12 border-slate-400 text-black hover:bg-slate-100 text-base font-semibold rounded-lg hover:border-slate-500">
                <TrendingUp className="mr-2 h-5 w-5" />
                Get Quote
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <StatCard
              icon={<Package className="h-6 w-6 text-black" />}
              title="Active Bookings"
              value="3"
              trend="+2 this month"
              bgColor="bg-slate-50"
              borderColor="border-slate-200"
            />
            <StatCard
              icon={<Clock className="h-6 w-6 text-slate-700" />}
              title="Pending Quotes"
              value="2"
              trend="Awaiting approval"
              bgColor="bg-white"
              borderColor="border-slate-300"
            />
            <StatCard
              icon={<TrendingUp className="h-6 w-6 text-black" />}
              title="Completed"
              value="12"
              trend="Successfully delivered"
              bgColor="bg-slate-50"
              borderColor="border-slate-200"
            />
            <StatCard
              icon={<CheckCircle2 className="h-6 w-6 text-black" />}
              title="Total Spent"
              value="$8,450"
              trend="Premium service"
              bgColor="bg-white"
              borderColor="border-slate-300"
            />
          </div>

          {/* Recent Bookings Section */}
          <Card className="bg-white border-slate-200 shadow-sm mb-12">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-black">Recent Bookings</CardTitle>
                  <CardDescription className="text-black font-medium">Your latest shipments and status</CardDescription>
                </div>
                <Link href="/customer/bookings">
                  <Button variant="ghost" className="text-black hover:text-slate-700 hover:bg-slate-100">
                    View All <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    id: 1,
                    number: "FMP-01025",
                    service: "Fine Art Transport",
                    date: "Aug 15, 2026",
                    status: "CONFIRMED",
                    price: "$1,250",
                    icon: "🎨",
                  },
                  {
                    id: 2,
                    number: "FMP-01018",
                    service: "Luxury Furniture Delivery",
                    date: "Aug 10, 2026",
                    status: "IN_PROGRESS",
                    price: "$895",
                    icon: "🪑",
                  },
                  {
                    id: 3,
                    number: "FMP-00997",
                    service: "White Glove Service",
                    date: "Jul 28, 2026",
                    status: "COMPLETED",
                    price: "$650",
                    icon: "✨",
                  },
                ].map((booking) => (
                  <div
                    key={booking.id}
                    className="group flex items-center justify-between p-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-2xl">{booking.icon}</div>
                      <div className="flex-1">
                        <p className="font-semibold text-black text-sm">{booking.number}</p>
                        <p className="text-black text-sm font-medium">{booking.service}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <div>
                        <p className="font-semibold text-black text-sm">{booking.price}</p>
                        <p className="text-black text-xs font-medium">{booking.date}</p>
                      </div>
                      <Badge
                        className={`px-3 py-1 text-xs font-semibold ${
                          booking.status === "CONFIRMED"
                            ? "bg-blue-100 text-blue-900 border border-blue-300"
                            : booking.status === "IN_PROGRESS"
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : "bg-emerald-100 text-emerald-900 border border-emerald-300"
                        }`}
                        variant="secondary"
                      >
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon="🛡️"
              title="Fully Insured"
              description="Your items are protected with comprehensive insurance coverage"
            />
            <FeatureCard
              icon="🚚"
              title="Real-time Tracking"
              description="Track your shipment every step of the way with live updates"
            />
            <FeatureCard
              icon="👥"
              title="Expert Team"
              description="Trained professionals handle your precious items with care"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, title, value, trend, bgColor, borderColor }: any) {
  return (
    <Card className={`${bgColor} border ${borderColor} shadow-sm hover:shadow-md transition-all`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-black">{title}</CardTitle>
          <div className="p-2 rounded-lg bg-slate-200">{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-black mb-1">{value}</div>
        <p className="text-xs text-black font-medium">{trend}</p>
      </CardContent>
    </Card>
  )
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="p-6 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-md">
      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-lg font-semibold text-black mb-2">{title}</h3>
      <p className="text-black text-sm font-medium">{description}</p>
    </div>
  )
}
