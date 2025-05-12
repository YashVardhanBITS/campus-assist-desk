
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../components/Auth/Login';

const Index = () => {
  // Get authentication state from context
  const auth = useAuth();
  const currentUser = auth ? auth.currentUser : null;
  
  // If user is already logged in, redirect to dashboard
  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }
  
  // Otherwise, show login page
  return <Login />;
};

export default Index;
