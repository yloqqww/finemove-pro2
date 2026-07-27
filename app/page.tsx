import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Palette, 
  Sofa, 
  Building2, 
  Star, 
  Package, 
  Warehouse,
  CheckCircle2,
  Shield,
  Clock,
  Award,
  ArrowRight,
  Menu,
  FileText,
  Calendar,
  Users,
  CheckSquare
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-slate-200 sticky top-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-black">
              FineMove
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#services" className="text-slate-700 hover:text-black transition-colors">
                Services
              </Link>
              <Link href="#why" className="text-slate-700 hover:text-black transition-colors">
                Why Us
              </Link>
              <Link href="#features" className="text-slate-700 hover:text-black transition-colors">
                Features
              </Link>
              <Link href="/login">
                <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                  Sign In
                </Button>
              </Link>
              <Link href="/customer/bookings/new">
                <Button className="bg-black hover:bg-slate-800 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
            <button className="md:hidden">
              <Menu className="h-6 w-6 text-slate-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-black py-20 lg:py-32 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-600/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-full text-blue-300 text-sm font-medium">
                ✨ Museum-Grade Service
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Premium Logistics for Fine Art & Luxury Items
            </h1>
            <p className="text-xl text-slate-200 mb-8 leading-relaxed">
              Museum-grade transportation, white-glove service, and expert handling for your most valuable possessions. Trusted by galleries, collectors, and institutions worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/customer/bookings/new">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base shadow-lg hover:shadow-xl transition-all">
                  Get a Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#services">
                <Button size="lg" className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 text-base shadow-lg hover:shadow-xl transition-all">
                  Explore Services
                </Button>
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-12 pt-12 border-t border-slate-700 flex flex-wrap gap-8">
              <div>
                <p className="text-4xl font-bold text-blue-400">500+</p>
                <p className="text-slate-400">Successful Moves</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-400">$50M+</p>
                <p className="text-slate-400">Value Transported</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-400">4.9/5</p>
                <p className="text-slate-400">Customer Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Services</h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              Specialized logistics solutions tailored to your exact needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const IconComponent = service.icon
              return (
                <Card key={service.title} className="border border-slate-200 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/10 group">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 mb-4 text-sm">
                      {service.description}
                    </p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                      From ${service.price}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose FineMove</h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              We're not just a moving company. We're specialists in the most valuable items in the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features/Process Section */}
      <section id="features" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              Simple, transparent, and professional from start to finish
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FileText, title: "Get a Quote", description: "Describe your items and locations. We'll provide an instant estimate." },
              { icon: Calendar, title: "Schedule", description: "Pick your preferred date and time. We offer flexible scheduling." },
              { icon: Users, title: "Professional Handling", description: "Our trained team handles everything with museum-grade care." },
              { icon: CheckSquare, title: "Peace of Mind", description: "Full tracking, insurance, and support throughout your move." },
            ].map((step, idx) => {
              const IconComponent = step.icon
              return (
                <div key={idx} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative p-6 rounded-lg border border-slate-200 group-hover:border-blue-500 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 text-sm">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Trusted by Professionals</h2>
            <p className="text-lg text-slate-300 max-w-2xl">
              Thousands of satisfied customers across galleries, museums, and private collections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Chen", role: "Gallery Director", text: "FineMove handled our exhibition artwork with exceptional care. Highly recommended." },
              { name: "James Mitchell", role: "Museum Curator", text: "Professional, reliable, and they understand the value of what they're moving." },
              { name: "Victoria Lopez", role: "Private Collector", text: "Outstanding service. My entire collection arrived in perfect condition." },
            ].map((testimonial) => (
              <Card key={testimonial.name} className="border border-slate-600 bg-slate-800 hover:border-blue-500 transition-colors">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-blue-400 text-blue-400" />
                    ))}
                  </div>
                  <p className="text-slate-100 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-slate-300">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 border-t border-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get an instant quote and book your move in just a few minutes
          </p>
          <Link href="/customer/bookings/new">
            <Button size="lg" variant="secondary" className="px-8 py-3 text-base shadow-lg hover:shadow-xl">
              Get a Quote Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">FineMove</h3>
              <p className="text-sm leading-relaxed">
                Premium logistics for fine art and luxury items. Museum-grade service, expert handling.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#services" className="hover:text-white transition-colors">Fine Art Transport</Link></li>
                <li><Link href="#services" className="hover:text-white transition-colors">Luxury Furniture</Link></li>
                <li><Link href="#services" className="hover:text-white transition-colors">Museum Delivery</Link></li>
                <li><Link href="#services" className="hover:text-white transition-colors">Storage Solutions</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>hello@finemove.com</li>
                <li>+1 (212) 555-0199</li>
                <li>New York, NY 10001</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>&copy; 2026 FineMove Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const services = [
  {
    icon: Palette,
    title: "Fine Art Transport",
    description: "Museum-grade transport for paintings, sculptures, and fine art pieces",
    price: "450",
  },
  {
    icon: Sofa,
    title: "Luxury Furniture",
    description: "White-glove moving service for high-end furniture and antiques",
    price: "350",
  },
  {
    icon: Building2,
    title: "Museum Delivery",
    description: "Specialized logistics for museums, galleries, and cultural institutions",
    price: "800",
  },
  {
    icon: Star,
    title: "White Glove Delivery",
    description: "Premium end-to-end delivery with full setup and placement",
    price: "300",
  },
  {
    icon: Package,
    title: "Professional Packing",
    description: "Expert packing using archival materials and custom crating",
    price: "150",
  },
  {
    icon: Warehouse,
    title: "Climate Storage",
    description: "Secure, climate-controlled storage for fine art and luxury items",
    price: "250",
  },
]

const features = [
  {
    icon: Shield,
    title: "Fully Insured",
    description: "Comprehensive coverage for complete peace of mind",
  },
  {
    icon: Award,
    title: "Expert Team",
    description: "Trained specialists in fine art handling",
  },
  {
    icon: Clock,
    title: "On-Time Guaranteed",
    description: "Real-time tracking and punctual service",
  },
  {
    icon: CheckCircle2,
    title: "Quality Assured",
    description: "Museum-quality standards on every move",
  },
]
