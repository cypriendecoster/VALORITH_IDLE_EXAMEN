import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../services/userService.js';

export function useRequireAuth({ role = null, redirectTo = '/login', unauthorizedTo = '/game' } = {}) {
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyAuth() {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) {
        navigate(redirectTo, { replace: true });
        return;
      }
      try {
        const me = await getMe();
        if (role && me?.role !== role) {
          navigate(unauthorizedTo, { replace: true });
        }
      } catch (err) {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        navigate(redirectTo, { replace: true });
      }
    }
    verifyAuth();
  }, [navigate, redirectTo, role, unauthorizedTo]);
}
