import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('auth_user_session')

  const isProtectedPath = request.nextUrl.pathname.startsWith('/dashboard')
  const isAuthPath = ['/', '/login', '/register'].includes(request.nextUrl.pathname)

  if (!session && isProtectedPath) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (session && isAuthPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register', '/'],
}
