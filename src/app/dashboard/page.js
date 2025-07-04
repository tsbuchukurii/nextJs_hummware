"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
    const {data: session, status} = [];//useSession();

    useEffect(() => {
        console.log(process.env.NEXT_PUBLIC_API_URL);
        if (status === "unauthenticated") {
            signIn(); // redirect to login
        }
    }, [status]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (!session) {
        return null; // or a spinner
    }

    return <ProtectedRoute>Welcome to Dashboard</ProtectedRoute>
}
