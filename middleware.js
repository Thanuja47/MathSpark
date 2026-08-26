import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || '316e719fb60ff4438db31dac1abb452bd3cc8f9ef942be019e5c0e3cd19ce455'
);

const adminPhones = ['0713486268', '0729298096', '94729298096', '0712345678'];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect /admin page & /api/admin/* endpoints
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized: No token provided.' }, { status: 401 });
      }
      // Redirect page requests to login/home
      return NextResponse.redirect(new URL('/?login=required', request.url));
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      const isAdminRole = payload.role === 'admin';
      const isAdminPhone = payload.phone && adminPhones.includes(payload.phone);

      if (!isAdminRole && !isAdminPhone) {
        if (pathname.startsWith('/api/')) {
          return NextResponse.json({ error: 'Forbidden: Admin access required.' }, { status: 403 });
        }
        return NextResponse.redirect(new URL('/?error=forbidden', request.url));
      }
    } catch (err) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized: Invalid token.' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/?login=required', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/admin/:path*'],
};
