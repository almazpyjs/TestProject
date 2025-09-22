import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

const ACCESS_TOKEN_KEY = 'python_mastery_access';
const REFRESH_TOKEN_KEY = 'python_mastery_refresh';
const USER_KEY = 'python_mastery_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const persistSession = useCallback((payload) => {
    if (payload?.access_token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, payload.access_token);
      api.defaults.headers.common.Authorization = `Bearer ${payload.access_token}`;
    }
    if (payload?.refresh_token) {
      localStorage.setItem(REFRESH_TOKEN_KEY, payload.refresh_token);
    }
    if (payload?.user) {
      setUser(payload.user);
      localStorage.setItem(USER_KEY, JSON.stringify(payload.user));
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, []);

  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    try {
      const { data } = await api.post('/auth/login', credentials);
      persistSession(data);
      return data;
    } finally {
      setIsLoading(false);
    }
  }, [persistSession]);

  const register = useCallback(async (payload) => {
    setIsLoading(true);
    try {
      const { data } = await api.post('/auth/register', payload);
      persistSession(data);
      return data;
    } finally {
      setIsLoading(false);
    }
  }, [persistSession]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    delete api.defaults.headers.common.Authorization;
  }, []);

  const refreshProfile = useCallback(async () => {
    const { data } = await api.get('/user/me');
    setUser(data.user);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    return data.user;
  }, []);

  const value = useMemo(() => ({
    user,
    isLoading,
    login,
    register,
    logout,
    refreshProfile
  }), [user, isLoading, login, register, logout, refreshProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
