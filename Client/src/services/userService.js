import api from './api.js';

export async function getMe() {
    try {
        const response = await api.get('/users/me');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'API error');
    }
}