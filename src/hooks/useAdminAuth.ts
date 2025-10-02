'use client';

import { useState, useEffect } from 'react';

interface AdminAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

export function useAdminAuth(): AdminAuthState {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }

    // Check if user is already authenticated on mount
    try {
      const token = sessionStorage.getItem('admin-token');
      if (token) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error accessing sessionStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (password: string): Promise<boolean> => {
    // Only run on client side
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success && data.token) {
        sessionStorage.setItem('admin-token', data.token);
        setIsAuthenticated(true);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    // Only run on client side
    if (typeof window === 'undefined') {
      return;
    }

    try {
      sessionStorage.removeItem('admin-token');
      setIsAuthenticated(false);
      
      // Clear the HTTP-only cookie by making a request to logout endpoint
      fetch('/api/admin/logout', { method: 'POST' }).catch(console.error);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
}