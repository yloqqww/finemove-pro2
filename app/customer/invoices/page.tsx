'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Receipt, FileText, CreditCard } from "lucide-react"
import { mockInvoices } from '@/lib/mockData'

export default function InvoicesPage() {
  const totalPaid = mockInvoices.filter(i => i.status === 'PAID').length
  const paidAmount = mockInvoices.filter(i => i.status === 'PAID').reduce((sum, i) => sum + parseFloat(i.total.replace('$', '')), 0)
  const outstandingAmount = mockInvoices.filter(i => i.status === 'PENDING').reduce((sum, i) => sum + parseFloat(i.total.replace('$', '')), 0)
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and download your invoices
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Booking #</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Tax</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-semibold text-black">{invoice.number}</TableCell>
                  <TableCell>{invoice.booking}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>${parseFloat(invoice.tax.replace('$', ''))}</TableCell>
                  <TableCell className="font-semibold">{invoice.total}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>
                    <StatusBadge status={invoice.status} />
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" className="text-black">
                      <Download className="h-4 w-4" />
                    </Button>
                    {invoice.status === "PENDING" && (
                      <Button size="sm" className="bg-black hover:bg-slate-900">
                        <CreditCard className="h-4 w-4 mr-1" />
                        Pay
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-emerald-600">${paidAmount.toLocaleString()}</p>
            <p className="text-xs text-slate-600 mt-1">{totalPaid} invoices paid</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600">${outstandingAmount.toLocaleString()}</p>
            <p className="text-xs text-slate-600 mt-1">{mockInvoices.filter(i => i.status === 'PENDING').length} pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-black">{mockInvoices.length}</p>
            <p className="text-xs text-slate-600 mt-1">All time</p>
          </CardContent>
        </Card>
      </div>

      {mockInvoices.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FileText className="h-16 w-16 text-slate-300 mb-4" />
            <h3 className="text-xl font-semibold text-black mb-2">No invoices yet</h3>
            <p className="text-slate-600 text-center max-w-md">
              Invoices will appear here after your bookings are completed
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const variants: { [key: string]: string } = {
    PAID: "bg-emerald-100 text-emerald-900 border border-emerald-200",
    PENDING: "bg-yellow-100 text-yellow-900 border border-yellow-200",
    PARTIAL: "bg-blue-100 text-blue-900 border border-blue-200",
    REFUNDED: "bg-slate-100 text-slate-900 border border-slate-200",
  }

  return (
    <Badge className={variants[status] || variants.PENDING}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </Badge>
  )
}
