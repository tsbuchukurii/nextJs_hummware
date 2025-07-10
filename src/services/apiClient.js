// app/services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://your-backend-api.com/api', // replace with your API endpoint
    withCredentials: true,
});

// Request interceptor to attach token
apiClient.interceptors.request.use((config) => {
    // Retrieve token from cookies or storage
    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('authToken='))
        ?.split('=')[1];

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

// Response interceptor for token refresh or error handling
apiClient.interceptors.response.use((response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // TODO: Implement token refresh logic if you have refresh tokens
            // const newToken = await refreshToken();
            // Update token in cookies
            // document.cookie = `authToken=${newToken}; path=/; secure; HttpOnly`;

            // Retry original request with new token
            // You can also force re-login if refresh fails
        }
        return Promise.reject(error);
    }
);

export default apiClient;
