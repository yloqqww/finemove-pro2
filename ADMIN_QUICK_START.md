# 🚀 Admin Panel Quick Start Guide

## Access the Admin Panel

### URLs
- **Dashboard**: `http://localhost:3000/admin/dashboard`
- **Bookings**: `http://localhost:3000/admin/bookings`
- **Customers**: `http://localhost:3000/admin/customers`
- **Quotes**: `http://localhost:3000/admin/quotes`
- **Analytics**: `http://localhost:3000/admin/analytics`
- **Calendar**: `http://localhost:3000/admin/calendar`
- **Services**: `http://localhost:3000/admin/services`
- **Pricing**: `http://localhost:3000/admin/pricing`
- **Staff**: `http://localhost:3000/admin/staff`
- **Settings**: `http://localhost:3000/admin/settings`

---

## 🔐 Authentication

1. The admin panel is **automatically protected**
2. Only users with `role = 'ADMIN'` can access
3. Access is controlled by:
   - Middleware (redirects to login if not authenticated)
   - Layout component (redirects if not admin role)
   - API routes (all verify admin status)

### Making Someone an Admin

Update their user role in the database:
```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'admin@example.com';
```

---

## 📊 Dashboard Navigation

### Left Sidebar
The navigation bar shows:
- 🏠 Dashboard
- 📦 Bookings
- 👥 Customers
- 📝 Quotes
- 📈 Analytics
- 📅 Calendar
- 🛒 Services
- 💰 Pricing
- ⚡ Staff
- ⚙️ Settings
- 🚪 Sign Out

---

## ⚙️ Configuration

### Environment Variables
Make sure `.env.local` has:
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
DATABASE_URL=your_postgres_url
```

### Database
Ensure Prisma migrations are run:
```bash
npm run db:push
```

---

## 🎨 Features Guide

### Dashboard
- View key metrics at a glance
- See recent bookings
- Monitor revenue trends
- Check payment status

### Bookings Management
- **Search**: Find bookings by number or customer name
- **Filter**: By status (Pending, Confirmed, In Progress, etc.)
- **Actions**: 
  - View details
  - Edit booking
  - Delete booking

### Customers
- **Search**: By name, email, or phone
- **View**: Customer profile
- **Manage**: Suspend/reactivate accounts
- **Track**: Total bookings and spending

### Analytics
- Select time range (7d, 30d, 90d, 1y)
- View revenue trends
- See payment method distribution
- Track service popularity
- Compare monthly growth

---

## 🔧 Development

### Add New Admin Page

1. Create new file in `app/admin/[feature]/page.tsx`
2. Use the layout wrapper (automatic)
3. Add navigation entry in `app/admin/layout.tsx`

### Create New API Endpoint

1. Create route in `app/api/admin/[resource]/route.ts`
2. Add Supabase auth check
3. Verify admin role
4. Return JSON response

### Example API Structure
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // 1. Check auth
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Check admin role
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
    })
    if (!dbUser || dbUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // 3. Your logic here
    // ...

    return NextResponse.json({ success: true, data: ... })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}
```

---

## 🐛 Troubleshooting

### Can't Access Admin Panel?
- ✅ Check you're logged in
- ✅ Verify user role is 'ADMIN' in database
- ✅ Check browser console for errors

### Data Not Showing?
- ✅ Verify database connection
- ✅ Check Prisma models match database schema
- ✅ Run `npm run db:push` to sync schema

### Charts Not Displaying?
- ✅ Recharts is installed (`npm install recharts --legacy-peer-deps`)
- ✅ Browser console shows no errors
- ✅ API returning proper data format

---

## 💡 Tips & Tricks

### Bulk Operations
All list pages support pagination. Ready to add:
- Bulk select
- Bulk delete
- Bulk status update
- Export to CSV

### Search Optimization
Search is debounced (300ms) to:
- Reduce API calls
- Improve performance
- Better UX

### Status Indicators
Color-coded badges for quick status recognition:
- 🟡 Yellow = Pending
- 🔵 Blue = Confirmed/Active
- 🟣 Purple = In Progress
- 🟢 Green = Completed/Paid
- 🔴 Red = Cancelled/Unpaid

---

## 📱 Mobile Responsive

All admin pages are fully responsive:
- 📱 Mobile: Full menu collapses to hamburger
- 💻 Tablet: Side menu visible
- 🖥️ Desktop: Full layout with sidebar

---

## 🎯 Coming Soon

These pages are placeholders ready for implementation:
- 📅 Calendar & Scheduling
- 🛒 Services Management
- 💰 Pricing Rules
- ⚡ Staff Management
- ⚙️ System Settings

---

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Check `.next/` for build issues
3. Run `npm run build` to verify compilation
4. Check database connection

---

**Happy administrating! 🎉**
