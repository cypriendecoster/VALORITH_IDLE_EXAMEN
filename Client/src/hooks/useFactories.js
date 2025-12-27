import { useEffect, useState } from "react";
import { getFactories } from '../services/factoryService.js';

export function useFactories() {
    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const factories = await getFactories();
                setData(factories);
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