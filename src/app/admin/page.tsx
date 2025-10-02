'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { Loading } from '@/components/ui/Loading';

// Session validation interval (5 minutes)
const SESSION_CHECK_INTERVAL = 5 * 60 * 1000;

// Token expiration time (24 hours in milliseconds)
const TOKEN_EXPIRATION_TIME = 24 * 60 * 60 * 1000;

export default function AdminPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionExpired, setSessionExpired] = useState(false);

  // Validate token expiration
  const validateToken = useCallback((token: string): boolean => {
    try {
      // Decode the token (format: "admin:timestamp" in base64)
      const decoded = atob(token);
      const [prefix, timestamp] = decoded.split(':');
      
      if (prefix !== 'admin' || !timestamp) {
        return false;
      }

      const tokenTime = parseInt(timestamp, 10);
      const currentTime = Date.now();
      
      // Check if token has expired
      if (currentTime - tokenTime > TOKEN_EXPIRATION_TIME) {
        return false;
      }

      return true;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }, []);

  // Check authentication status
  const checkAuth = useCallback(async (showLoading = true) => {
    if (showLoading) {
      setIsChecking(true);
    }

    try {
      // Check if sessionStorage is available
      if (typeof window === 'undefined' || !window.sessionStorage) {
        throw new Error('SessionStorage is not available');
      }

      // Get token from sessionStorage
      const token = sessionStorage.getItem('admin-token');
      
      if (!token) {
        // Not authenticated, redirect to login
        setIsAuthenticated(false);
        router.push('/adminLogin');
        return;
      }

      // Validate token expiration
      if (!validateToken(token)) {
        // Token expired
        sessionStorage.removeItem('admin-token');
        setSessionExpired(true);
        setIsAuthenticated(false);
        
        // Redirect to login after showing message
        setTimeout(() => {
          router.push('/adminLogin?expired=true');
        }, 2000);
        return;
      }

      // Token is valid, user is authenticated
      setIsAuthenticated(true);
      setError(null);
      setSessionExpired(false);
    } catch (error) {
      // Handle errors (e.g., sessionStorage not available)
      console.error('Auth check error:', error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : '인증 확인 중 오류가 발생했습니다.';
      
      setError(errorMessage);
      setIsAuthenticated(false);
      
      // Redirect to login on error after showing message
      setTimeout(() => {
        router.push('/adminLogin');
      }, 2000);
    } finally {
      if (showLoading) {
        setIsChecking(false);
      }
    }
  }, [router, validateToken]);

  // Initial authentication check
  useEffect(() => {
    checkAuth(true);
  }, [checkAuth]);

  // Periodic session validation
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    // Set up interval to periodically check session validity
    const intervalId = setInterval(() => {
      checkAuth(false);
    }, SESSION_CHECK_INTERVAL);

    // Clean up interval on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [isAuthenticated, checkAuth]);

  // Handle visibility change (tab switching)
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Re-validate session when user returns to tab
        checkAuth(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isAuthenticated, checkAuth]);

  // Show loading state during initial authentication check
  if (isChecking) {
    return <Loading message="인증 확인 중..." locale="ko" variant="page" />;
  }

  // Show session expired message
  if (sessionExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">⏱️</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">세션이 만료되었습니다</h2>
          <p className="text-gray-600 mb-4">
            보안을 위해 24시간 후 자동으로 로그아웃됩니다.
          </p>
          <p className="text-sm text-gray-500">
            로그인 페이지로 이동합니다...
          </p>
        </div>
      </div>
    );
  }

  // Show error state if authentication check failed
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">인증 오류</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            로그인 페이지로 이동합니다...
          </p>
        </div>
      </div>
    );
  }

  // Show loading while redirecting if not authenticated
  if (!isAuthenticated) {
    return <Loading message="로그인 페이지로 이동 중..." locale="ko" variant="page" />;
  }

  // User is authenticated, show dashboard
  return <AdminDashboard />;
}