import { useEffect, useState } from "react";
import { getMe } from '../services/userService.js';

export function useMe() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                setError(null);
                const user = await getMe();
                setData(user);
            } catch (error) {
                setError(error.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [refreshKey]);

    useEffect(() => {
        function onAuthChanged() {
            setRefreshKey((prev) => prev + 1);
        }
        window.addEventListener('auth-changed', onAuthChanged);
        return () => window.removeEventListener('auth-changed', onAuthChanged);
    }, []);

    return { data, loading, error };
}
