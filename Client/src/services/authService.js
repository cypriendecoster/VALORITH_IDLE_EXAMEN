import api from './api.js';

function mapAuthError(message) {
    if (message === 'Password must be at least 8 characters with upper, lower, and number.') {
        return 'Mot de passe: 8 caracteres minimum, avec une majuscule, une minuscule et un chiffre.';
    }
    if (message === 'Invalid email format') {
        return 'Email invalide.';
    }
    if (message === 'Invalid username format') {
        return 'Pseudo invalide: 3 a 20 caracteres, lettres/chiffres/underscore.';
    }
    if (message === 'Account not found') {
        return 'Compte introuvable.';
    }
    if (message === 'Incorrect password') {
        return 'Mot de passe incorrect.';
    }
    return message;
}

export async function register(data) {
    try {
        const response = await api.post('/auth/register', data);
        return response.data;
    } catch (error) {
        console.error(error);
        const message = error.response?.data?.message || 'API error';
        throw new Error(mapAuthError(message));
    }
}

export async function login(data) {
    try {
        const response = await api.post('/auth/login', data);
        return response.data;
    } catch (error) {
        console.error(error);
        const message = error.response?.data?.message || 'API error';
        throw new Error(mapAuthError(message));
    }
}

export async function requestPasswordReset(data) {
    try {
        const response = await api.post('/auth/forgot-password', data);
        return response.data;
    } catch (error) {
        console.error(error);
        const message = error.response?.data?.message || 'API error';
        throw new Error(mapAuthError(message));
    }
}

export async function resetPassword(data) {
    try {
        const response = await api.post('/auth/reset-password', data);
        return response.data;
    } catch (error) {
        console.error(error);
        const message = error.response?.data?.message || 'API error';
        throw new Error(mapAuthError(message));
    }
}
