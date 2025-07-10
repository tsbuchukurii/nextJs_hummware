// middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middlewareOLD(request) {
    const { pathname } = request.nextUrl;

    // Allow access to login, API auth, public pages
    if (
        pathname.startsWith('/api/auth') ||
        pathname.startsWith('/login') ||
        pathname === '/'
    ) {
        return NextResponse.next();
    }

    // Retrieve token (JWT) from cookies
    const token = await getToken({ request, secret: process.env.JWT_SECRET });

    if (!token) {
        // Not authenticated - redirect to login
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Role-based enforcement example
    const requiredRole = getRequiredRoleFromPath(pathname); // implement helper

    if (requiredRole && token.role !== requiredRole) {
        // User lacks permission, redirect or show error
        return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // All good, continue
    return NextResponse.next();
}

function getRequiredRoleFromPath(pathname) {
    // Define role restrictions based on route
    if (pathname.startsWith('/admin')) return 'admin';
    if (pathname.startsWith('/dashboard')) return null; // accessible to all logged-in
    return null;
}

export const config = {
    // Protect all routes except specific ones
    matcher: [
        '/dashboard/:path*',
        '/admin/:path*',
        // include other protected paths
    ],
};
