'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface DesignSystemErrorBoundaryProps {
  children: ReactNode;
  componentName?: string;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showDetails?: boolean;
}

interface DesignSystemErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorCount: number;
}

interface ErrorLog {
  timestamp: string;
  componentName: string;
  errorMessage: string;
  errorStack?: string;
  componentStack?: string;
  userAgent: string;
  url: string;
}

/**
 * DesignSystemErrorBoundary - Comprehensive error boundary for the design system
 * 
 * Features:
 * - Catches and logs errors in design system components
 * - Provides graceful fallback UI
 * - Logs errors to console and optionally to external service
 * - Shows user-friendly error messages
 * - Allows retry functionality
 * - Tracks error count to prevent infinite error loops
 */
export class DesignSystemErrorBoundary extends Component<
  DesignSystemErrorBoundaryProps,
  DesignSystemErrorBoundaryState
> {
  private maxErrorCount = 3;

  constructor(props: DesignSystemErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<DesignSystemErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const errorCount = this.state.errorCount + 1;
    
    this.setState({
      errorInfo,
      errorCount,
    });

    // Log error details
    this.logError(error, errorInfo);

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // If error count exceeds max, prevent further retries
    if (errorCount >= this.maxErrorCount) {
      console.error(
        `[DesignSystemErrorBoundary] Max error count (${this.maxErrorCount}) reached for ${this.props.componentName || 'component'}. Preventing further retries.`
      );
    }
  }

  /**
   * Log error to console and optionally to external logging service
   */
  private logError(error: Error, errorInfo: ErrorInfo): void {
    const errorLog: ErrorLog = {
      timestamp: new Date().toISOString(),
      componentName: this.props.componentName || 'DesignSystem',
      errorMessage: error.message,
      errorStack: error.stack || undefined,
      componentStack: errorInfo.componentStack || undefined,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
    };

    // Console logging with structured data
    console.error('[DesignSystemErrorBoundary] Error caught:', {
      ...errorLog,
      errorCount: this.state.errorCount + 1,
    });

    // TODO: Send to external logging service (e.g., Sentry, LogRocket)
    // this.sendToLoggingService(errorLog);
  }

  /**
   * Send error to external logging service
   * Placeholder for future implementation
   */
  private sendToLoggingService(errorLog: ErrorLog): void {
    // Example: Send to Sentry, LogRocket, or custom logging endpoint
    // fetch('/api/admin/logs/error', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorLog),
    // }).catch(err => console.error('Failed to send error log:', err));
  }

  /**
   * Reset error state and retry rendering
   */
  handleRetry = (): void => {
    if (this.state.errorCount >= this.maxErrorCount) {
      // If max errors reached, reload the page instead
      window.location.reload();
      return;
    }

    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  /**
   * Reload the entire page
   */
  handleReload = (): void => {
    window.location.reload();
  };

  /**
   * Copy error details to clipboard for bug reporting
   */
  handleCopyError = async (): Promise<void> => {
    const errorDetails = {
      component: this.props.componentName || 'DesignSystem',
      error: this.state.error?.message,
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(errorDetails, null, 2));
      alert('Error details copied to clipboard');
    } catch (err) {
      console.error('Failed to copy error details:', err);
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isMaxErrorsReached = this.state.errorCount >= this.maxErrorCount;
      const componentName = this.props.componentName || 'Design System';

      return (
        <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border-2 border-red-200">
          <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 rounded-full p-4">
                <svg
                  className="h-12 w-12 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            {/* Error Title */}
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
              {isMaxErrorsReached ? 'Critical Error' : `Error in ${componentName}`}
            </h2>

            {/* Error Message */}
            <p className="text-gray-600 text-center mb-6">
              {isMaxErrorsReached
                ? 'Multiple errors occurred. Please reload the page or contact support if the issue persists.'
                : 'An unexpected error occurred while rendering this component. You can try again or reload the page.'}
            </p>

            {/* Error Details (if enabled) */}
            {this.props.showDetails && this.state.error && (
              <div className="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Error Details:</h3>
                <p className="text-sm text-red-600 font-mono mb-2 break-all">
                  {this.state.error.message}
                </p>
                {this.state.error.stack && (
                  <details className="text-xs text-gray-600 font-mono">
                    <summary className="cursor-pointer hover:text-gray-900 mb-2">
                      View Stack Trace
                    </summary>
                    <pre className="whitespace-pre-wrap bg-white p-3 rounded border border-gray-200 overflow-auto max-h-48">
                      {this.state.error.stack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            {/* Error Count Warning */}
            {this.state.errorCount > 1 && !isMaxErrorsReached && (
              <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <svg
                    className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <p className="text-sm text-yellow-800">
                    This error has occurred {this.state.errorCount} time(s). 
                    {this.state.errorCount >= this.maxErrorCount - 1 && 
                      ' One more error will require a page reload.'}
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {!isMaxErrorsReached && (
                <button
                  onClick={this.handleRetry}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-sm hover:shadow-md"
                >
                  Try Again
                </button>
              )}
              <button
                onClick={this.handleReload}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors shadow-sm hover:shadow-md"
              >
                Reload Page
              </button>
              {this.props.showDetails && (
                <button
                  onClick={this.handleCopyError}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors border border-gray-300"
                  title="Copy error details for bug reporting"
                >
                  Copy Error
                </button>
              )}
            </div>

            {/* Help Text */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                If this problem persists, please contact support with the error details.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default DesignSystemErrorBoundary;
