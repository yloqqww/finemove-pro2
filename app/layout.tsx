import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FineMove Pro - Premium Fine Art & White-Glove Logistics",
  description: "Museum-grade transport for fine art, luxury furniture, and high-value items with white-glove service.",
  keywords: ["fine art moving", "luxury furniture", "white glove delivery", "art logistics", "museum delivery"],
  authors: [{ name: "FineMove Pro" }],
  openGraph: {
    title: "FineMove Pro - Premium Fine Art & White-Glove Logistics",
    description: "Museum-grade transport for fine art, luxury furniture, and high-value items",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
