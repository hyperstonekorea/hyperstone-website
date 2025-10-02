'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface SectionErrorBoundaryProps {
  children: ReactNode;
  sectionName: string;
  fallback?: ReactNode;
}

interface SectionErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class SectionErrorBoundary extends Component<
  SectionErrorBoundaryProps,
  SectionErrorBoundaryState
> {
  constructor(props: SectionErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): SectionErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(`[SectionErrorBoundary] Error in ${this.props.sectionName}:`, {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      section: this.props.sectionName,
      timestamp: Date.now(),
    });
  }

  handleRetry = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="py-12 px-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-4">
              <svg
                className="mx-auto h-10 w-10 text-yellow-500"
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Error loading {this.props.sectionName}
            </h3>
            <p className="text-gray-600 mb-4">
              This section couldn&apos;t be loaded. The rest of the page is still available.
            </p>
            <button
              onClick={this.handleRetry}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
