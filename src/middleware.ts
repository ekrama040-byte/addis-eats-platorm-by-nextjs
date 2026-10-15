import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Log incoming path and custom geo header simulation for Addis Ababa delivery zones
  const clientIp = request.headers.get('x-forwarded-for') || '127.0.0.1';
  console.log(`[Middleware Audit] Request URL: ${request.url} | Client IP: ${clientIp} | Region: Addis Ababa`);

  // Add security and caching headers
  response.headers.set('x-addis-eats-region', 'ET-AA');
  response.headers.set('X-Frame-Options', 'DENY');

  return response;
}

// Matcher configuration for performance optimization
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};