import api from './api.js';

export async function register(data) {
    try {
        const response = await api.post('/auth/register', data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'API error');
    }
}

export async function login (data) {
    try {
        const response = await api.post('/auth/login', data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'API error');
    }
}