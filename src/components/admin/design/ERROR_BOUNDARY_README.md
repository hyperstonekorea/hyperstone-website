# Design System Error Boundary Documentation

## Overview

The Design System Error Boundary provides comprehensive error handling for the admin design system components. It catches errors, logs them, and provides graceful fallback UI to prevent the entire admin interface from crashing.

## Features

### 1. Error Catching
- Catches JavaScript errors in child components
- Prevents errors from propagating to parent components
- Maintains application stability

### 2. Error Logging
- Logs errors to console with structured data
- Tracks error count to prevent infinite loops
- Includes component stack traces
- Records user agent and URL information
- Can be extended to send logs to external services (Sentry, LogRocket, etc.)

### 3. Graceful Fallbacks
- Shows user-friendly error messages
- Provides retry functionality
- Allows page reload as fallback
- Displays error details for debugging (optional)

### 4. User-Friendly Messages
- Clear error descriptions
- Actionable buttons (Try Again, Reload Page)
- Copy error details for bug reporting
- Warning messages for repeated errors

## Components

### DesignSystemErrorBoundary

Main error boundary component that wraps design system components.

**Props:**
- `children`: ReactNode - Components to wrap
- `componentName`: string (optional) - Name of the component for logging
- `fallback`: ReactNode (optional) - Custom fallback UI
- `onError`: (error, errorInfo) => void (optional) - Custom error handler
- `showDetails`: boolean (optional) - Show error details in UI

**Example Usage:**

```tsx
import DesignSystemErrorBoundary from './DesignSystemErrorBoundary';

<DesignSystemErrorBoundary 
  componentName="Section Designer"
  showDetails={true}
  onError={(error, errorInfo) => {
    // Custom error handling
    console.log('Error in Section Designer:', error);
  }}
>
  <SectionDesigner {...props} />
</DesignSystemErrorBoundary>
```

### Error Logger

Centralized error logging utility for the design system.

**Features:**
- Structured error logging
- Multiple log levels (error, warning, info)
- In-memory log storage
- Export logs as JSON
- Filter logs by level or component

**Example Usage:**

```tsx
import { designSystemLogger } from '@/lib/design/error-logger';

// Log an error
designSystemLogger.error(
  'ComponentName',
  'Error message',
  error,
  { additionalContext: 'value' }
);

// Log a warning
designSystemLogger.warning(
  'ComponentName',
  'Warning message',
  { context: 'data' }
);

// Get all logs
const logs = designSystemLogger.getLogs();

// Export logs
const logsJson = designSystemLogger.exportLogs();
```

## Error Handling Strategy

### 1. Component-Level Error Boundaries

Each major design system component is wrapped with an error boundary:

- **Section Designer**: Catches errors in section customization
- **Product Card Designer**: Catches errors in card styling
- **Product Detail Designer**: Catches errors in product page design
- **Design History**: Catches errors in history management
- **Preview Panel**: Catches errors in preview rendering
- **Accessibility Validation**: Catches errors in validation

### 2. Error Count Tracking

The error boundary tracks how many times an error occurs:

- **1st error**: Shows "Try Again" button
- **2nd error**: Shows warning about repeated errors
- **3rd error**: Forces page reload instead of retry

This prevents infinite error loops and provides a clear recovery path.

### 3. Error Logging

All errors are logged with:
- Timestamp
- Component name
- Error message and stack trace
- Component stack trace
- User agent
- Current URL
- Additional context

### 4. Graceful Degradation

When an error occurs:
1. The error boundary catches it
2. The error is logged
3. A fallback UI is shown
4. Other components continue to work
5. User can retry or reload

## Integration with DesignSystemManager

The `DesignSystemManager` component integrates error boundaries for all major sections:

```tsx
<DesignSystemErrorBoundary 
  componentName="Section Designer"
  showDetails={true}
  onError={(error, errorInfo) => {
    designSystemLogger.error('SectionDesigner', error.message, error, {
      componentStack: errorInfo.componentStack,
      selectedSection,
    });
  }}
>
  <SectionDesigner {...props} />
</DesignSystemErrorBoundary>
```

## Customization

### Custom Fallback UI

You can provide a custom fallback UI:

```tsx
<DesignSystemErrorBoundary 
  fallback={
    <div className="custom-error-ui">
      <h2>Oops! Something went wrong</h2>
      <button onClick={() => window.location.reload()}>
        Reload
      </button>
    </div>
  }
>
  <YourComponent />
</DesignSystemErrorBoundary>
```

### Custom Error Handler

Add custom error handling logic:

```tsx
<DesignSystemErrorBoundary 
  onError={(error, errorInfo) => {
    // Send to analytics
    analytics.track('design_system_error', {
      component: 'SectionDesigner',
      error: error.message,
    });
    
    // Send to error tracking service
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
  }}
>
  <YourComponent />
</DesignSystemErrorBoundary>
```

## External Logging Integration

To integrate with external logging services, update the `error-logger.ts` file:

### Sentry Integration

```typescript
import * as Sentry from '@sentry/nextjs';

private sendToLoggingService(errorLog: ErrorLog): void {
  Sentry.captureException(errorLog.error, {
    tags: {
      component: errorLog.componentName,
    },
    contexts: {
      errorLog: {
        timestamp: errorLog.timestamp,
        url: errorLog.url,
        userAgent: errorLog.userAgent,
      },
    },
  });
}
```

### LogRocket Integration

```typescript
import LogRocket from 'logrocket';

private sendToLoggingService(errorLog: ErrorLog): void {
  LogRocket.captureException(errorLog.error, {
    tags: {
      component: errorLog.componentName,
    },
    extra: errorLog,
  });
}
```

### Custom API Endpoint

```typescript
private async sendToLoggingService(errorLog: ErrorLog): Promise<void> {
  try {
    await fetch('/api/admin/logs/error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorLog),
    });
  } catch (err) {
    console.error('Failed to send error log:', err);
  }
}
```

## Best Practices

### 1. Wrap Major Components

Always wrap major components with error boundaries:

```tsx
// ✅ Good
<DesignSystemErrorBoundary componentName="MyComponent">
  <MyComponent />
</DesignSystemErrorBoundary>

// ❌ Bad - no error boundary
<MyComponent />
```

### 2. Provide Component Names

Always provide a component name for better logging:

```tsx
// ✅ Good
<DesignSystemErrorBoundary componentName="Section Designer">

// ❌ Bad - generic name
<DesignSystemErrorBoundary>
```

### 3. Show Details in Development

Show error details in development, hide in production:

```tsx
<DesignSystemErrorBoundary 
  showDetails={process.env.NODE_ENV === 'development'}
>
```

### 4. Log Errors Consistently

Use the error logger consistently across the application:

```tsx
try {
  // risky operation
} catch (error) {
  designSystemLogger.error('ComponentName', 'Operation failed', error);
  // handle error
}
```

### 5. Test Error Scenarios

Test error boundaries by throwing errors:

```tsx
// For testing only
const TestErrorComponent = () => {
  throw new Error('Test error');
};

<DesignSystemErrorBoundary>
  <TestErrorComponent />
</DesignSystemErrorBoundary>
```

## Troubleshooting

### Error Boundary Not Catching Errors

Error boundaries only catch errors in:
- Rendering
- Lifecycle methods
- Constructors of child components

They do NOT catch errors in:
- Event handlers (use try-catch)
- Asynchronous code (use try-catch)
- Server-side rendering
- Errors in the error boundary itself

### Infinite Error Loops

If you encounter infinite error loops:
1. Check the error count tracking (max 3 errors)
2. Ensure the error boundary is not causing errors
3. Check for errors in the fallback UI
4. Review the component stack trace

### Logs Not Appearing

If logs are not appearing:
1. Check console for error messages
2. Verify error logger is imported correctly
3. Check browser console settings
4. Verify logging is enabled in config

## Future Enhancements

Potential improvements for the error boundary system:

1. **Error Recovery Strategies**: Automatic retry with exponential backoff
2. **Error Metrics**: Track error rates and patterns
3. **User Feedback**: Allow users to submit error reports
4. **Error Categorization**: Categorize errors by severity
5. **Performance Monitoring**: Track performance impact of errors
6. **A/B Testing**: Test different error recovery strategies
7. **Error Prediction**: Predict and prevent common errors

## Related Files

- `DesignSystemErrorBoundary.tsx` - Main error boundary component
- `error-logger.ts` - Error logging utility
- `DesignSystemManager.tsx` - Integration example
- `ErrorBoundary.tsx` - Generic error boundary
- `SectionErrorBoundary.tsx` - Section-specific error boundary

## Support

For questions or issues with the error boundary system:
1. Check this documentation
2. Review the error logs
3. Check the component stack traces
4. Contact the development team
