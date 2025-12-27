import { useEffect, useState } from 'react';
import { getFactoriesByRealm } from '../services/factoryService.js';

export function useFactoriesByRealm(realmId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const factories = await getFactoriesByRealm(realmId);
        setData(factories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (realmId) {
      load();
    }
  }, [realmId]);

  return { data, loading, error };
}
