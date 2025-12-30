import api from './api.js';

export async function getMe() {
    try {
        const response = await api.get('/users/me');
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || 'API error');
    }
}

export async function resetProgress(password) {
    try {
        const response = await api.post('/users/reset-progress', { password });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || 'API error');
    }
}

export async function deleteAccount(password) {
    try {
        const response = await api.delete('/users/me', { data: { password } });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || 'API error');
    }
}
