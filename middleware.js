import { NextResponse } from 'next/server'

export default function middleware(request) {
  // Check if user is trying to access protected routes
  const protectedPaths = ['/add-item']
  const { pathname } = request.nextUrl
  
  // Check if current path is protected
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
  
  if (isProtectedPath) {
    // Check for authentication cookie
    const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true'
    
    if (!isLoggedIn) {
      // Redirect to login page if not authenticated
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}