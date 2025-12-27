import { useEffect, useState } from 'react';
import { getRealms, getRealmUnlockCosts } from '../services/realmService.js';

export function useRealms() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [realms, costs] = await Promise.all([
          getRealms(),
          getRealmUnlockCosts()
        ]);

        const costMap = costs.reduce((acc, c) => {
          const key = c.target_realm_id;
          if (!acc[key]) acc[key] = [];
          acc[key].push(c);
          return acc;
        }, {});

        const merged = realms.map((r) => ({
          ...r,
          unlockCosts: costMap[r.id] || []
        }));

        setData(merged);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { data, loading, error };
}
