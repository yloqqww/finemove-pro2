'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, FileText, Clock, CheckCircle, XCircle, Download } from "lucide-react"
import { mockQuotes } from '@/lib/mockData'

export default function QuotesPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [formData, setFormData] = useState({ serviceType: '', description: '', value: '' })
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quotes</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Request and manage custom quotes
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="bg-black hover:bg-slate-900">
              <Plus className="mr-2 h-4 w-4" />
              Request Quote
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request a Custom Quote</DialogTitle>
              <DialogDescription>
                Tell us about your needs and we'll provide a detailed quote
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault()
              setDialogOpen(false)
              setFormData({ serviceType: '', description: '', value: '' })
            }} className="space-y-4">
              <div>
                <Label htmlFor="serviceType" className="text-black">Service Type</Label>
                <Input 
                  id="serviceType" 
                  placeholder="e.g., Fine Art Transport"
                  value={formData.serviceType}
                  onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-black">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you need moved..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="estimatedValue" className="text-black">Estimated Value (Optional)</Label>
                <Input 
                  id="estimatedValue" 
                  type="number" 
                  placeholder="5000"
                  value={formData.value}
                  onChange={(e) => setFormData({...formData, value: e.target.value})}
                />
              </div>
              <Button type="submit" className="w-full bg-black hover:bg-slate-900">
                Submit Quote Request
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {mockQuotes.map((quote) => (
          <Card key={quote.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-xl text-black">{quote.number}</CardTitle>
                    <StatusBadge status={quote.status} />
                  </div>
                  <CardDescription className="text-sm text-slate-600">
                    {quote.amount.replace('$', '')} • Expires {quote.expiry}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-black">
                    {quote.amount}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">
                    for {quote.customer}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 mb-4">
                {quote.items}
              </p>
              <div className="flex gap-2">
                {quote.status === "APPROVED" && (
                  <Button className="bg-black hover:bg-slate-900">Accept & Book</Button>
                )}
                {quote.status === "PENDING" && (
                  <Button variant="outline" className="border-black text-black hover:bg-slate-100">View Details</Button>
                )}
                <Button variant="ghost" className="text-black">
                  <Download className="h-4 w-4 mr-1" />
                  PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockQuotes.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FileText className="h-16 w-16 text-slate-300 mb-4" />
            <h3 className="text-xl font-semibold text-black mb-2">No quotes yet</h3>
            <p className="text-slate-600 mb-6 text-center max-w-md">
              Request a custom quote for your specific needs and get a detailed pricing estimate
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-black hover:bg-slate-900">
                  <Plus className="mr-2 h-4 w-4" />
                  Request First Quote
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Request a Custom Quote</DialogTitle>
                </DialogHeader>
                {/* Form content */}
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const variants: { [key: string]: string } = {
    PENDING: "bg-yellow-100 text-yellow-900 border border-yellow-200",
    APPROVED: "bg-emerald-100 text-emerald-900 border border-emerald-200",
    REJECTED: "bg-red-100 text-red-900 border border-red-200",
    EXPIRED: "bg-slate-100 text-slate-900 border border-slate-200",
  }

  return (
    <Badge className={variants[status] || variants.PENDING}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </Badge>
  )
}
