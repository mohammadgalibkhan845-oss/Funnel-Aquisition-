import React, { createContext, useContext, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

function safeJsonParse(val, fallback = null) {
  if (!val) return fallback;
  try {
    return JSON.parse(val);
  } catch (e) {
    return fallback;
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return safeJsonParse(localStorage.getItem('apex_user'));
  });
  const [token, setToken] = useState(() => localStorage.getItem('apex_auth_token') || null);
  const [loading, setLoading] = useState(false);

  const loginWithDemo = async (role = 'admin') => {
    setLoading(true);
    try {
      const res = await api.demoLogin(role);
      localStorage.setItem('apex_auth_token', res.token);
      localStorage.setItem('apex_user', JSON.stringify(res.user));
      setToken(res.token);
      setUser(res.user);
      return res.user;
    } catch (err) {
      console.error('Demo login error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.login({ email, password });
      localStorage.setItem('apex_auth_token', res.token);
      localStorage.setItem('apex_user', JSON.stringify(res.user));
      setToken(res.token);
      setUser(res.user);
      return res.user;
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('apex_auth_token');
    localStorage.removeItem('apex_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, loginWithDemo, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
