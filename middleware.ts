import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // List of non-German locales that need prefixes
  const otherLocales = ['en', 'it'];
  
  // Check if pathname starts with a non-German locale
  const hasOtherLocale = otherLocales.some((locale) =>
    pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If it has a non-German locale prefix, let it through
  if (hasOtherLocale) {
    return NextResponse.next();
  }
  
  // Check if this is an old /de/ path that needs to be redirected to root
  if (pathname.startsWith('/de/') || pathname === '/de') {
    const url = request.nextUrl.clone();
    // Remove /de prefix
    url.pathname = pathname.replace(/^\/de/, '') || '/';
    return NextResponse.redirect(url, { status: 301 });
  }

  // All other paths are treated as German (default)
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and static files
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.gif|.*\\.webp).*)'
  ]
};