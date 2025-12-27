import { useState } from "react";
import { login, register } from '../services/authService.js';

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleLogin(data) {
        try {
            setLoading(true);
            setError(null);
            const result = await login(data);
            localStorage.setItem('token', result.token);
            return result;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }


    async function handleRegister(data) {
        try {
            setLoading(true);
            setError(null);
            const result = await register(data);
            localStorage.setItem('token', result.token);
            return result;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    function logout() {
        localStorage.removeItem('token');
    }

    return { loading, error, handleLogin, handleRegister, logout };
}
