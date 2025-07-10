// app/middleware.js
import { NextResponse } from 'next/server';

// Define protected routes
const protectedRoutes = ['/dashboard'];

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // Check if route is protected
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        // Retrieve token/session info. Assumes you're storing authentication info in cookies
        const token = request.cookies.get('authToken')?.value;

        // If token is invalid or missing, redirect to login
        if (!token || !(await verifyToken(token))) {
            const loginUrl = new URL('/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

// Example token verification logic (simulate your API call or JWT validation)
async function verifyToken(token) {
    // For example purposes, assume token validity check is asynchronous
    // You might opt to verify JWT here or call your backend API
    try {
        // Placeholder: verify token validity and return boolean
        // In production, replace with actual validation logic
        return true; // e.g., await verifyJWT(token);
    } catch {
        return false;
    }
}
