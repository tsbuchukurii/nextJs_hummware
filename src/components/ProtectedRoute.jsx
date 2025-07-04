'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthProvider';

export default function ProtectedRoute({ children }) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login'); // or your login path
        }
    }, [user, router]);

    if (!user) {
        return <p>Loading...</p>; // optional loader
    }

    return children;
}
