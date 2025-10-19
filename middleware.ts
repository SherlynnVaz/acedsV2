import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

// Ensure JWT_SECRET is properly typed
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// Add the paths that need authentication
const protectedPaths: string[] = ['/dashboard', '/topics']

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Check if the path needs authentication
  if (protectedPaths.some(prefix => path.startsWith(prefix))) {
    // Get token from cookies
    const token = request.cookies.get('token')?.value

    // Get token from Authorization header as fallback
    const authHeader = request.headers.get('authorization')
    const headerToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null

    // Use either cookie token or header token
    const finalToken = token || headerToken

    if (!finalToken) {
      // Store the attempted URL to redirect back after login
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.set('redirectTo', request.url)
      return response
    }

    try {
      // Verify the token
      await jwtVerify(finalToken, new TextEncoder().encode(JWT_SECRET))
      
      // Token is valid, allow the request
      const response = NextResponse.next()
      
      // Ensure token is also set in cookie if it came from header
      if (!token && headerToken) {
        response.cookies.set('token', headerToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/'
        })
      }
      
      return response
    } catch (error) {
      // Token is invalid, redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.set('redirectTo', request.url)
      return response
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
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
} 