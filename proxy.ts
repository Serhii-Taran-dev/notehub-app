import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { checkSession } from '@/lib/api/serverApi';

const privateRoutes = ['/notes', '/profile'];
const publicRoutes = ['/sign-in', '/sign-up'];

const matchesRoute = (pathname: string, route: string): boolean => {
  return pathname === route || pathname.startsWith(`${route}/`);
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPrivateRoute = privateRoutes.some((route) =>
    matchesRoute(pathname, route)
  );
  const isPublicRoute = publicRoutes.some((route) =>
    matchesRoute(pathname, route)
  );

  const hasAuthCookies =
    request.cookies.has('accessToken') || request.cookies.has('refreshToken');

  let isAuthenticated = false;

  if (hasAuthCookies) {
    try {
      isAuthenticated = await checkSession();
    } catch {
      isAuthenticated = false;
    }
  }

  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/notes/filter/all', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/notes/:path*', '/profile/:path*', '/sign-in', '/sign-up'],
};
