import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyUser } from "@/lib/auth";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const user = await verifyUser(credentials.email, credentials.password);
                if (user) {
                    return { id: user.id, name: user.name, email: user.email, role: user.role };
                }
                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24, // 1 day
        updateAge: 60 * 15,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        encryption: true,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.role = user.role;
                token.refreshToken = generateRefreshToken();
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.name = token.name;
            session.user.role = token.role;
            session.accessToken = token.accessToken;
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
    },
};

// Dummy refresh token generator
function generateRefreshToken() {
    return Math.random().toString(36).substring(2);
}

export default authOptions;
