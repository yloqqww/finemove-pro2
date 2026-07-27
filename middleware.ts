import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Check for mock user in cookie (set from localStorage)
  const userCookie = request.cookies.get('user')?.value
  
  // Protected routes for authenticated users
  const isAuthRoute = request.nextUrl.pathname.startsWith('/admin') ||
                      request.nextUrl.pathname.startsWith('/customer')
  
  // Redirect to login if accessing protected route without auth
  if (isAuthRoute && !userCookie) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect authenticated users away from auth pages
  const isLoginPage = request.nextUrl.pathname.startsWith('/login') ||
                      request.nextUrl.pathname.startsWith('/signup')
  
  if (isLoginPage && userCookie) {
    const user = JSON.parse(userCookie)
    return NextResponse.redirect(new URL(
      user.role === 'ADMIN' ? '/admin/dashboard' : '/customer/dashboard',
      request.url
    ))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
