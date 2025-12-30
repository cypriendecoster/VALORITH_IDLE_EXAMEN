import api from './api.js';

export async function getRealms() {
    try {
        const response = await api.get('/realms');
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || 'API error');
    }
}

export async function getRealmUnlockCosts() {
    try {
        const response = await api.get('/realm-unlock-costs');
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || 'API error');
    }
}

export async function activateRealm(realmId) {
    try {
        const response = await api.post(`/player/realms/${realmId}/activate`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response?.data?.message || 'API error');
    }
}
