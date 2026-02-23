import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../services/userService.js';

export function useRedirectIfAuthenticated(redirectTo = '/game') {
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        await getMe();
        if (isMounted) {
          navigate(redirectTo, { replace: true });
        }
      } catch {
        // Not authenticated or request failed; stay on the page.
      }
    }

    checkAuth();
    return () => {
      isMounted = false;
    };
  }, [navigate, redirectTo]);
}
