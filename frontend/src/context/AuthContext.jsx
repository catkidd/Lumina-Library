import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const email = localStorage.getItem('userEmail');
    const role = localStorage.getItem('userRole');

    if (accessToken && email && role) {
      setUser({ email, role });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/api/auth/login', { email, password });
      const { accessToken, refreshToken, email: userEmail, role } = res.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userEmail', userEmail);
      localStorage.setItem('userRole', role);

      setUser({ email: userEmail, role });
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Invalid credentials',
      };
    }
  };

  const register = async (email, password, role) => {
    try {
      const res = await api.post('/api/auth/register', { email, password, role });
      const { accessToken, refreshToken, email: userEmail, role: userRole } = res.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userEmail', userEmail);
      localStorage.setItem('userRole', userRole);

      setUser({ email: userEmail, role: userRole });
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Registration failed. Email might be in use.',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
