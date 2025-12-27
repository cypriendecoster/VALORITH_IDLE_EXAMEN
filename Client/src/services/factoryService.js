import api from './api.js';

export async function getFactories() {
    try {
        const response = await api.get('/factories');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'API error');
    }
}

export async function getFactoriesByRealm(realmId) {
    try {
        const response = await api.get(`/factories/realm/${realmId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'API error');
    }
}