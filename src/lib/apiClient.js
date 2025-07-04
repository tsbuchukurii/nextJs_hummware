import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // set in .env
    timeout: 10000,
});

// Add interceptors to attach token and handle errors
apiClient.interceptors.request.use((config) => {
    // Retrieve token from cookies (server-side cookies or client storage)
    const token = getAuthToken(); // will define below
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Handle 401 errors globally (token expired)
        if (error.response?.status === 401) {
            // Optionally refresh token here
            // For now, just reject
        }
        return Promise.reject(error);
    }
);

// Helper to get token from cookies or storage (client-side)
function getAuthToken() {
    // For client-side only (browser)
    if (typeof window !== 'undefined') {
        // Example: from localStorage (not recommended for sensitive data)
        return localStorage.getItem('token');
    }
    // For server-side, get from cookies via cookie parsing (see next section)
    return null;
}

export default apiClient;
