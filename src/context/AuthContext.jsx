import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
  }, [token]);

  const register = async (name, email, password) => {
    try {
      const res = await axios.post('http://localhost:3001/api/users/register', { name, email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setToken(res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      setAuthToken(res.data.token);
      window.location.href = '/'; // Hard redirect
    } catch (err) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      //... (rest of error handling)
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:3001/api/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setToken(res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      setAuthToken(res.data.token);
      window.location.href = '/'; // Hard redirect
    } catch (err) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      //... (rest of error handling)
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setAuthToken(null);
    window.location.href = '/login'; // Hard redirect
  };

  const value = {
    token,
    user,
    isAuthenticated,
    register,
    login,
    logout,
  };

  // The provider *only* renders its children. No logic, no loading.
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};