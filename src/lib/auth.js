export async function verifyUser(email, password) {
    if (email === 'user@example.com' && password === 'securePassword123') {
        return { id: '1', name: 'Advanced User', email: email, role: 'admin' };
    }
    return null;
}