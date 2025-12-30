import { useEffect, useState } from 'react';
import { getGameSnapshot } from '../services/gameService.js';

export function useGameData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const snapshot = await getGameSnapshot();
        setData(snapshot);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { data, loading, error, setData };
}
