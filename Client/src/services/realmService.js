import api from './api.js';

export async function getRealms() {
    try {
        const response = await api.get('/realms');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'API error');
    }
}

export async function getRealmUnlockCosts() {
    try {
        const response = await api.get('/realms/unlock-costs');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'API error');
    }
}