'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AdminLogin from '@/components/admin/AdminLogin';
import { Loading } from '@/components/ui/Loading';

// Helper function to safely access sessionStorage
function getSessionToken(): string | null {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return sessionStorage.getItem('admin-token');
    }
  } catch (error) {
    console.warn('SessionStorage access failed:', error);
  }
  return null;
}

// Helper function to safely set sessionStorage
function setSessionToken(token: string): boolean {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem('admin-token', token);
      return true;
    }
  } catch (error) {
    console.warn('SessionStorage write failed:', error);
  }
  return false;
}

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [storageWarning, setStorageWarning] = useState(false);
  const [sessionExpiredMessage, setSessionExpiredMessage] = useState(false);

  useEffect(() => {
    // Check if redirected due to session expiration
    const expired = searchParams.get('expired');
    if (expired === 'true') {
      setSessionExpiredMessage(true);
      // Auto-hide message after 5 seconds
      setTimeout(() => {
        setSessionExpiredMessage(false);
      }, 5000);
    }

    // Check if already authenticated
    const checkAuth = async () => {
      try {
        // Check sessionStorage for existing token
        const token = getSessionToken();
        if (token) {
          setIsAuthenticated(true);
          router.push('/admin');
          return;
        }
      } catch (error) {
        // Handle edge case where sessionStorage is disabled
        console.error('Auth check error:', error);
        setStorageWarning(true);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [router, searchParams]);

  const handleLogin = async (password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success && data.token) {
        // Store token in sessionStorage
        const stored = setSessionToken(data.token);
        
        if (!stored) {
          // Show warning if sessionStorage is disabled
          setStorageWarning(true);
          console.warn('SessionStorage is disabled. Authentication may not persist.');
        }
        
        // Redirect to admin dashboard
        router.push('/admin');
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Show loading spinner while checking authentication
  if (isChecking) {
    return <Loading message="인증 확인 중..." locale="ko" variant="page" />;
  }

  // Show loading spinner while redirecting
  if (isAuthenticated) {
    return <Loading message="리디렉션 중..." locale="ko" variant="page" />;
  }

  // Show login form with optional warnings
  return (
    <div>
      {sessionExpiredMessage && (
        <div className="fixed top-0 left-0 right-0 bg-blue-50 border-b border-blue-200 px-4 py-3 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-blue-800">
                세션이 만료되었습니다. 다시 로그인해주세요.
              </p>
            </div>
            <button
              onClick={() => setSessionExpiredMessage(false)}
              className="text-blue-600 hover:text-blue-800"
              aria-label="닫기"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      {storageWarning && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-50 border-b border-yellow-200 px-4 py-3 z-50" style={{ top: sessionExpiredMessage ? '52px' : '0' }}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentStorage"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="text-sm text-yellow-800">
                브라우저 저장소가 비활성화되어 있습니다. 인증 상태가 유지되지 않을 수 있습니다.
              </p>
            </div>
            <button
              onClick={() => setStorageWarning(false)}
              className="text-yellow-600 hover:text-yellow-800"
              aria-label="닫기"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      <AdminLogin onLogin={handleLogin} />
    </div>
  );
}
