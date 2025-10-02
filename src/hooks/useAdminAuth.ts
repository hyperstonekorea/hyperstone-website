'use client';

/**
 * Admin authentication hook for logout functionality
 * 
 * This hook provides a centralized logout function that:
 * - Clears the session token from sessionStorage
 * - Calls the logout API to clear HTTP-only cookies
 * - Redirects to the login page
 * 
 * Note: Login and authentication checking are now handled directly
 * in the /adminLogin and /admin page components respectively.
 */

interface AdminAuthHook {
  logout: () => void;
}

export function useAdminAuth(): AdminAuthHook {
  const logout = () => {
    // Only run on client side
    if (typeof window === 'undefined') {
      return;
    }

    try {
      // Clear session token from sessionStorage
      sessionStorage.removeItem('admin-token');
      
      // Clear the HTTP-only cookie by making a request to logout endpoint
      fetch('/api/admin/logout', { method: 'POST' })
        .then(() => {
          // Redirect to login page after successful logout
          window.location.href = '/adminLogin';
        })
        .catch((error) => {
          console.error('Logout API error:', error);
          // Still redirect even if API call fails
          window.location.href = '/adminLogin';
        });
    } catch (error) {
      console.error('Logout error:', error);
      // Redirect to login page even on error
      window.location.href = '/adminLogin';
    }
  };

  return {
    logout,
  };
}