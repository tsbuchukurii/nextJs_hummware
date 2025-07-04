import apiClient from '@/lib/apiClient';

export const getUserProfile = async () => {
    const response = await apiClient.get('/user/profile');
    return response.data;
};
