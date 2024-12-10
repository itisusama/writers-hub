import { NextResponse } from 'next/server';

export function middleware(req) {
  const session = req.cookies.get('userSession');

  // Protect the /dashboard route
  if (req.nextUrl.pathname.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

// Specify the routes to apply the middleware
export const config = {
  matcher: ['/dashboard']
};
