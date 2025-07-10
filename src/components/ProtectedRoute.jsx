'use client';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/api/auth/signin');
        } else if (status === 'authenticated' && allowedRoles.length > 0 && !allowedRoles.includes(session.user.role)) {
            router.push('/403'); // Redirect to 403 Forbidden page
        }
    }, [status, router, session, allowedRoles]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'unauthenticated' || (status === 'authenticated' && allowedRoles.length > 0 && !allowedRoles.includes(session.user.role))) {
        return null;
    }

    return children;
};

export default ProtectedRoute;
