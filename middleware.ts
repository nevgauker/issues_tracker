// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './auth'

export async function middleware(req: NextRequest) {
  const session = await auth()
  if (session?.user) {
    return NextResponse.next()
  }

  const signInUrl = new URL('/api/auth/signin', req.url)
  return NextResponse.redirect(signInUrl)
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}
