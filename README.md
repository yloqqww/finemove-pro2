# FineMove Pro

> Premium Fine Art & White-Glove Logistics Booking Platform

A complete production-ready full-stack web application for luxury moving and fine art logistics services. Built with Next.js 15, React 19, TypeScript, Prisma, PostgreSQL, and Supabase.

![FineMove Pro](https://img.shields.io/badge/Next.js-15-black) ![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue) ![Prisma](https://img.shields.io/badge/Prisma-5.22-green)

## ✨ Features

### Public Website
- 🎨 Premium landing page with hero section
- 📦 Services showcase
- 💰 Transparent pricing
- 📝 Contact form
- 🌟 Testimonials & FAQ

### Booking System
- 📋 Multi-step booking wizard (7 steps)
- 🚚 Multiple service types
- 📍 Pickup & destination details
- 📦 Item details with photo upload
- 💵 Real-time dynamic pricing
- 📅 Interactive calendar availability
- 💳 Multiple payment options

### Customer Portal
- 📊 Dashboard with booking overview
- 📋 Booking management (view, reschedule, cancel)
- 💰 Quote requests
- 🧾 Invoice history with PDF download
- 🔔 Notifications
- 👤 Profile management

### Admin Panel
- 📈 Analytics dashboard with charts
- 🗓️ Booking management (CRUD)
- 👥 Customer management
- 💬 Quote approval system
- 🛠️ Service configuration
- 💵 Pricing rules management
- 🎟️ Coupon system
- 📅 Calendar view
- 👨‍💼 Staff management
- ⚙️ System settings

### AI Features
- 🤖 AI Quote Assistant (mock architecture ready for OpenAI/Claude)

### Technical Features
- 🔐 Supabase Authentication (Email/Password)
- 🌓 Dark mode support
- 📱 Fully responsive design
- ⚡ Server-side rendering (SSR)
- 🎯 Type-safe with TypeScript
- 🎨 Beautiful UI with Tailwind CSS + shadcn/ui
- 📊 Charts with Chart.js
- 🔄 State management with Zustand
- 📝 Form validation with Zod + React Hook Form
- 🖼️ Image uploads to Supabase Storage
- 📄 PDF invoice generation
- 🔍 Search & filtering
- 📤 CSV export
- 🎭 Loading skeletons
- ⚠️ Error boundaries
- 🍞 Toast notifications

## 🚀 Tech Stack

**Frontend:**
- Next.js 15
- React 19
- TypeScript
- TailwindCSS
- shadcn/ui
- Framer Motion
- Lucide Icons

**Backend:**
- Next.js Server Actions
- Next.js API Routes
- Prisma ORM
- PostgreSQL
- Supabase Auth & Storage

**State & Forms:**
- Zustand
- React Hook Form
- Zod
- TanStack Query

**Charts:**
- Chart.js
- react-chartjs-2

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- Supabase account (free tier)
- npm or yarn

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/finemove-pro.git
cd finemove-pro
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
- Database connection string
- Supabase project URL and keys
- App URL

### 4. Set up Supabase

1. Create a new Supabase project at https://supabase.com
2. Copy the project URL and anon key
3. Create a storage bucket named `booking-photos` with public read access
4. Enable Email Authentication in Supabase Dashboard

### 5. Set up the database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with demo data
npm run db:seed
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗃️ Database

The application uses PostgreSQL with Prisma ORM. Schema includes:

- **Users** - Customer, Admin, Staff roles
- **Customers** - Customer profiles
- **Bookings** - Main booking records
- **BookingItems** - Items within bookings
- **Services** - Service catalog
- **PricingRules** - Dynamic pricing configuration
- **Quotes** - Quote requests
- **Invoices** - Billing records
- **CalendarSlots** - Availability management
- **Staff** - Staff members
- **Notifications** - In-app notifications
- **Analytics** - Business metrics
- **Settings** - System configuration

## 👥 Demo Accounts

After seeding, you can log in with:

**Admin:**
- Email: `admin@finemovepro.com`
- Password: (set during first Supabase signup)

**Customer:**
- Create a new account via signup

## 📁 Project Structure

```
finemove-pro/
├── app/
│   ├── (auth)/          # Authentication pages
│   ├── (public)/        # Public website
│   ├── (customer)/      # Customer portal
│   ├── (admin)/         # Admin panel
│   ├── ai-assistant/    # AI features
│   └── api/             # API routes
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── layout/          # Layout components
│   ├── booking/         # Booking-specific components
│   ├── dashboard/       # Dashboard components
│   ├── forms/           # Form components
│   └── tables/          # Table components
├── lib/
│   ├── actions/         # Server actions
│   ├── services/        # Business logic
│   ├── validations/     # Zod schemas
│   ├── helpers/         # Utility functions
│   └── supabase/        # Supabase client
├── hooks/               # Custom React hooks
├── store/               # Zustand stores
├── types/               # TypeScript types
├── prisma/              # Database schema & seed
└── public/              # Static assets
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables
5. Deploy

### Database Hosting

Use one of these PostgreSQL hosting providers:
- Supabase (built-in PostgreSQL)
- Railway
- Neon
- AWS RDS
- Digital Ocean

## 📜 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with demo data
npm run db:studio    # Open Prisma Studio
```

## 🔐 Security Features

- Row Level Security (RLS) with Supabase
- Protected routes with middleware
- Role-based access control (RBAC)
- Input validation with Zod
- SQL injection prevention via Prisma
- XSS protection
- CSRF protection
- Secure password hashing
- Session management

## 📊 Key Features Detail

### Dynamic Pricing Engine

Automatic price calculation based on:
- Service base price
- Distance (per mile after 10 miles)
- Item dimensions (large item fee)
- Item weight (heavy item fee)
- Special handling (fragile, glass)
- Add-on services (packing, installation, etc.)
- Building factors (floors, elevator, loading dock)
- Timing (weekend, holiday, emergency)
- Insurance (percentage of item value)

### Calendar System

- Capacity-based availability
- Time slot management (Morning/Afternoon/Evening)
- Real-time booking updates
- Visual calendar interface
- Date restrictions (no past dates, 90-day limit)

### Notification System

In-app notifications with:
- Booking confirmations
- Status updates
- Quote approvals
- Invoice generation
- Reminders

Architecture ready for email notifications via:
- SendGrid
- Resend
- Nodemailer

## 🎨 Design System

- **Colors:** Premium neutral palette with accent colors
- **Typography:** Professional font hierarchy
- **Spacing:** Consistent 8px grid
- **Components:** Reusable shadcn/ui components
- **Animations:** Subtle Framer Motion transitions
- **Icons:** Lucide icon library
- **Dark Mode:** Full theme support

## 🔮 Future Enhancements

- [ ] Real-time chat support
- [ ] SMS notifications (Twilio)
- [ ] Email notifications (SendGrid/Resend)
- [ ] Stripe payment integration
- [ ] Google Maps integration
- [ ] Route optimization
- [ ] Mobile app (React Native)
- [ ] Shopify integration
- [ ] QuickBooks integration
- [ ] Google Calendar sync
- [ ] Zapier/Make.com integrations
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Customer reviews & ratings

## 📄 License

MIT License - feel free to use this project for your portfolio or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💼 Portfolio

This project demonstrates expertise in:
- Modern React development
- Full-stack TypeScript
- Database design & optimization
- Authentication & authorization
- Payment systems
- API design
- UI/UX design
- Performance optimization
- Deployment & DevOps

Perfect for showcasing to potential clients or employers.

## 📞 Support

For questions or support, please contact:
- Email: hello@finemovepro.com
- Website: https://finemovepro.com

---

Built with ❤️ by [Your Name]
