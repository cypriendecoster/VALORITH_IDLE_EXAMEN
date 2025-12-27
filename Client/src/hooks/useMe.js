import { useEffect, useState } from "react";
import { getMe } from '../services/userService.js';

export function useMe() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const user = await getMe();
                setData(user);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    return { data, loading, error };
}