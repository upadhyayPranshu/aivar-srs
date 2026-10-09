import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Bypassing strict Supabase Auth checks in middleware for development
  // so you aren't blocked by Supabase's mandatory Email Confirmation settings.
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
