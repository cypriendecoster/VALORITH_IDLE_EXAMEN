import api from './api.js';
import { buildApiError } from '../utils/apiError.js';

function mapAuthError(message, code) {
    if (code === 'AUTH_WEAK_PASSWORD') {
        return 'Mot de passe: 8 caracteres minimum, avec une majuscule, une minuscule et un chiffre.';
    }
    if (code === 'AUTH_INVALID_EMAIL') {
        return 'Email invalide.';
    }
    if (code === 'AUTH_INVALID_USERNAME') {
        return 'Pseudo invalide: 3 a 20 caracteres, lettres/chiffres/underscore.';
    }
    if (code === 'AUTH_ACCOUNT_NOT_FOUND') {
        return 'Compte introuvable.';
    }
    if (code === 'AUTH_INCORRECT_PASSWORD' || code === 'INVALID_CREDENTIALS') {
        return 'Mot de passe incorrect.';
    }
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
        const apiError = buildApiError(error, 'Erreur d’inscription.');
        const message = mapAuthError(apiError.message, apiError.code);
        const err = new Error(message);
        if (apiError.code) {
            err.code = apiError.code;
        }
        throw err;
    }
}

export async function login(data) {
    try {
        const response = await api.post('/auth/login', data);
        return response.data;
    } catch (error) {
        console.error(error);
        const apiError = buildApiError(error, 'Erreur de connexion.');
        const message = mapAuthError(apiError.message, apiError.code);
        const err = new Error(message);
        if (apiError.code) {
            err.code = apiError.code;
        }
        throw err;
    }
}

export async function requestPasswordReset(data) {
    try {
        const response = await api.post('/auth/forgot-password', data);
        return response.data;
    } catch (error) {
        console.error(error);
        const apiError = buildApiError(error, 'Erreur de réinitialisation.');
        const message = mapAuthError(apiError.message, apiError.code);
        const err = new Error(message);
        if (apiError.code) {
            err.code = apiError.code;
        }
        throw err;
    }
}

export async function resetPassword(data) {
    try {
        const response = await api.post('/auth/reset-password', data);
        return response.data;
    } catch (error) {
        console.error(error);
        const apiError = buildApiError(error, 'Erreur de réinitialisation.');
        const message = mapAuthError(apiError.message, apiError.code);
        const err = new Error(message);
        if (apiError.code) {
            err.code = apiError.code;
        }
        throw err;
    }
}
