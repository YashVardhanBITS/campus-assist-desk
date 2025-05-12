
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUserData, setUserData, logout } from '../utils/authUtils';
import { authService } from '../services/api';

// Create context
export const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = getUserData();
    if (storedUser) {
      setCurrentUser(storedUser);
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      const result = await authService.login(email, password);
      if (result.success) {
        setCurrentUser(result.user);
        setUserData(result.user);
        return result.user;
      }
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      const result = await authService.register(userData);
      if (result.success) {
        setCurrentUser(result.user);
        setUserData(result.user);
        return result.user;
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logoutUser = () => {
    setCurrentUser(null);
    logout();
  };

  // Change password function
  const changePassword = async (oldPassword, newPassword) => {
    if (!currentUser) {
      throw new Error('No authenticated user');
    }

    try {
      setError(null);
      setLoading(true);
      const result = await authService.changePassword(
        currentUser.id,
        oldPassword,
        newPassword
      );
      return result;
    } catch (err) {
      setError(err.message || 'Failed to change password');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout: logoutUser,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
