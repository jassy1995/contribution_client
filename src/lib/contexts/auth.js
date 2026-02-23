import { createContext, useContext, useEffect, useState } from 'react';
import { useMount } from 'react-use';
import { useGetProfile } from '../api/auth.js';
import { clearCookie, getCrossSubdomainCookie, setCrossSubdomainCookie } from '../utils.js';

export const authContext = createContext({
  user: null,
  updateUser: () => {},
  authenticate: () => {},
  reloadUser: () => {},
  resolved: false,
  authenticated: false,
  logout: () => {},
  error: null,
});

export const useAuth = () => {
  return useContext(authContext);
};

export function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [resolved, setResolved] = useState(false);
  const { refetch, data, error } = useGetProfile();

  useEffect(() => {
    if (data) {
      const { user } = data.data;
      authenticate({ user });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      clearCookie('contribution-token');
      setAuthenticated(false);
      setUser(null);
      setResolved(true);
    }
  }, [error]);

  const authenticate = (data) => {
    setUser(data.user);
    setAuthenticated(true);
    setResolved(true);
    if (data.token) setCrossSubdomainCookie('contribution-token', data.token, 30);
  };

  const logout = (redirectFrom) => {
    const from = redirectFrom ?? window.location.href;
    try {
      sessionStorage.setItem('from', from);
    } catch {
      void 0;
    }
    clearCookie('contribution-token');
    setAuthenticated(false);
    setUser(null);
    setResolved(true);
    const redirect = encodeURIComponent(from ?? '/');
    window.location.href = `/login?from=${redirect}`;
  };

  const updateUser = (user) => {
    setUser((old) => ({ ...old, ...user }));
  };

  const reloadUser = async () => {
    await refetch();
  };

  useMount(() => {
    const token = getCrossSubdomainCookie('contribution-token');
    if (!token) return setResolved(true);
    if (!resolved && !authenticated) reloadUser();
  });

  return {
    user,
    updateUser,
    reloadUser,
    authenticate,
    resolved,
    authenticated,
    logout,
    error,
  };
}
