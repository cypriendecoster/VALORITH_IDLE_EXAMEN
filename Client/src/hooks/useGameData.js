import { useEffect, useState } from 'react';
import { getGameSnapshot } from '../services/gameService.js';

export function useGameData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    load();
  }, []);

  return { data, loading, error, setData, reload: load };
}
