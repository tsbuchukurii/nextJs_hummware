import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials, req) => {
                // Verify credentials against your database
                const user = await verifyUser(credentials.email, credentials.password);
                if (user) {
                    // Return user object with custom claims or roles
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
        jwt: async ({ token, user, account, profile }) => {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.role = user.role; // role-based access
                token.refreshToken = generateRefreshToken(); // implement this
            }
            return token;
        },
        session: async ({ session, token }) => {
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.name = token.name;
            session.user.role = token.role;
            session.accessToken = token.accessToken; // Optional
            return session;
        },
    },
    pages: {
        signIn: '/login', // customize login page
    },
};

async function verifyUser(email, password) {
    // Replace with your user database validation
    if (email === 'user@example.com' && password === 'securePassword123') {
        return { id: '1', name: 'Advanced User', email: email, role: 'admin' };
    }
    return null;
}

// Dummy refresh token generator
function generateRefreshToken() {
    return Math.random().toString(36).substring(2);
}

export { authOptions as default };
