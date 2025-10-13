# Design System Error Boundary Test Guide

## Overview

This document provides test scenarios for the Design System Error Boundary implementation.

## Test Scenarios

### 1. Basic Error Catching

**Test:** Verify error boundary catches rendering errors

**Steps:**
1. Create a component that throws an error
2. Wrap it with DesignSystemErrorBoundary
3. Verify fallback UI is displayed
4. Verify error is logged to console

**Expected Result:**
- Error boundary catches the error
- Fallback UI is displayed with error message
- Console shows structured error log
- Other components continue to work

**Test Component:**
```tsx
const ThrowErrorComponent = () => {
  throw new Error('Test error');
  return <div>This should not render</div>;
};

<DesignSystemErrorBoundary componentName="Test Component">
  <ThrowErrorComponent />
</DesignSystemErrorBoundary>
```

### 2. Retry Functionality

**Test:** Verify retry button works correctly

**Steps:**
1. Trigger an error in a component
2. Click "Try Again" button
3. Verify component re-renders
4. Trigger error again
5. Verify error count increases

**Expected Result:**
- First error shows "Try Again" button
- Clicking retry resets error state
- Component re-renders
- Error count increments on repeated errors
- Warning appears after 2nd error

### 3. Max Error Count

**Test:** Verify max error count prevents infinite loops

**Steps:**
1. Trigger an error 3 times
2. Verify "Try Again" button is replaced with "Reload Page"
3. Verify warning message about max errors

**Expected Result:**
- After 3 errors, "Try Again" button is hidden
- "Reload Page" button is shown
- Warning message indicates max errors reached
- Console logs show max error count message

### 4. Error Logging

**Test:** Verify error logging works correctly

**Steps:**
1. Trigger an error
2. Check console for error log
3. Verify log contains all required fields
4. Use designSystemLogger.getLogs() to retrieve logs

**Expected Result:**
- Console shows structured error log
- Log includes: timestamp, component name, error message, stack trace
- Logs are stored in memory
- Logs can be retrieved and exported

**Test Code:**
```tsx
import { designSystemLogger } from '@/lib/design/error-logger';

// Trigger error
// ...

// Check logs
const logs = designSystemLogger.getLogs();
console.log('All logs:', logs);

const errorLogs = designSystemLogger.getLogsByLevel('error');
console.log('Error logs:', errorLogs);

// Export logs
const logsJson = designSystemLogger.exportLogs();
console.log('Exported logs:', logsJson);
```

### 5. Custom Error Handler

**Test:** Verify custom error handler is called

**Steps:**
1. Create error boundary with custom onError handler
2. Trigger an error
3. Verify custom handler is called with error and errorInfo

**Expected Result:**
- Custom handler receives error object
- Custom handler receives errorInfo with component stack
- Custom handler can perform additional logging or actions

**Test Code:**
```tsx
const [customErrorCalled, setCustomErrorCalled] = useState(false);

<DesignSystemErrorBoundary
  componentName="Test Component"
  onError={(error, errorInfo) => {
    setCustomErrorCalled(true);
    console.log('Custom handler called:', error, errorInfo);
  }}
>
  <ThrowErrorComponent />
</DesignSystemErrorBoundary>

// Verify customErrorCalled is true
```

### 6. Custom Fallback UI

**Test:** Verify custom fallback UI is displayed

**Steps:**
1. Create error boundary with custom fallback prop
2. Trigger an error
3. Verify custom fallback is displayed instead of default

**Expected Result:**
- Custom fallback UI is rendered
- Default fallback UI is not shown
- Error is still logged

**Test Code:**
```tsx
<DesignSystemErrorBoundary
  componentName="Test Component"
  fallback={
    <div className="custom-fallback">
      <h2>Custom Error UI</h2>
      <p>Something went wrong</p>
    </div>
  }
>
  <ThrowErrorComponent />
</DesignSystemErrorBoundary>
```

### 7. Show/Hide Error Details

**Test:** Verify error details can be shown or hidden

**Steps:**
1. Create error boundary with showDetails={true}
2. Trigger an error
3. Verify error details are displayed
4. Create error boundary with showDetails={false}
5. Verify error details are hidden

**Expected Result:**
- When showDetails=true, error message and stack trace are visible
- When showDetails=false, only user-friendly message is shown
- "Copy Error" button appears when showDetails=true

### 8. Copy Error Details

**Test:** Verify error details can be copied to clipboard

**Steps:**
1. Create error boundary with showDetails={true}
2. Trigger an error
3. Click "Copy Error" button
4. Verify clipboard contains error details

**Expected Result:**
- "Copy Error" button is visible
- Clicking button copies error details as JSON
- Alert confirms copy was successful
- Clipboard contains: component name, error message, stack trace, timestamp, URL

### 9. Integration with DesignSystemManager

**Test:** Verify error boundaries work in DesignSystemManager

**Steps:**
1. Open DesignSystemManager
2. Navigate to different tabs (Sections, Cards, Products, History)
3. Trigger errors in different components
4. Verify each error boundary catches its component's errors
5. Verify other tabs continue to work

**Expected Result:**
- Each tab has its own error boundary
- Errors in one tab don't affect other tabs
- Error logs include component context (selectedSection, selectedProduct)
- User can switch tabs even after an error

### 10. Error Logger Functionality

**Test:** Verify error logger utility works correctly

**Steps:**
1. Log errors, warnings, and info messages
2. Retrieve logs by level
3. Retrieve logs by component
4. Export logs as JSON
5. Clear logs

**Expected Result:**
- All log levels work correctly
- Logs can be filtered by level and component
- Logs can be exported as JSON
- Logs can be cleared

**Test Code:**
```tsx
import { designSystemLogger } from '@/lib/design/error-logger';

// Log different levels
designSystemLogger.error('TestComponent', 'Error message', new Error('Test'));
designSystemLogger.warning('TestComponent', 'Warning message');
designSystemLogger.info('TestComponent', 'Info message');

// Get logs
const allLogs = designSystemLogger.getLogs();
const errorLogs = designSystemLogger.getLogsByLevel('error');
const componentLogs = designSystemLogger.getLogsByComponent('TestComponent');

// Export
const json = designSystemLogger.exportLogs();

// Clear
designSystemLogger.clearLogs();
```

## Manual Testing Checklist

- [ ] Error boundary catches rendering errors
- [ ] Fallback UI is displayed correctly
- [ ] "Try Again" button works
- [ ] "Reload Page" button works
- [ ] Error count tracking works
- [ ] Max error count prevents infinite loops
- [ ] Error details can be shown/hidden
- [ ] "Copy Error" button works
- [ ] Custom error handler is called
- [ ] Custom fallback UI is displayed
- [ ] Error logging works
- [ ] Logs can be retrieved and exported
- [ ] Integration with DesignSystemManager works
- [ ] Errors in one component don't affect others
- [ ] Console logs are structured correctly

## Automated Testing

For automated testing, consider using:

### Jest + React Testing Library

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DesignSystemErrorBoundary from '../DesignSystemErrorBoundary';

describe('DesignSystemErrorBoundary', () => {
  it('catches errors and displays fallback UI', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <DesignSystemErrorBoundary componentName="Test">
        <ThrowError />
      </DesignSystemErrorBoundary>
    );

    expect(screen.getByText(/Error in Test/i)).toBeInTheDocument();
    expect(screen.getByText(/Try Again/i)).toBeInTheDocument();
  });

  it('calls custom error handler', () => {
    const onError = jest.fn();
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <DesignSystemErrorBoundary componentName="Test" onError={onError}>
        <ThrowError />
      </DesignSystemErrorBoundary>
    );

    expect(onError).toHaveBeenCalled();
  });

  it('retries on button click', async () => {
    const user = userEvent.setup();
    let shouldThrow = true;
    
    const MaybeThrow = () => {
      if (shouldThrow) {
        throw new Error('Test error');
      }
      return <div>Success</div>;
    };

    render(
      <DesignSystemErrorBoundary componentName="Test">
        <MaybeThrow />
      </DesignSystemErrorBoundary>
    );

    expect(screen.getByText(/Error in Test/i)).toBeInTheDocument();

    shouldThrow = false;
    await user.click(screen.getByText(/Try Again/i));

    expect(screen.getByText('Success')).toBeInTheDocument();
  });
});
```

## Performance Testing

Test the performance impact of error boundaries:

1. **Rendering Performance**: Measure render time with and without error boundaries
2. **Error Handling Performance**: Measure time to catch and display error
3. **Memory Usage**: Monitor memory usage with error logging
4. **Log Storage**: Test with large number of logs

## Browser Compatibility

Test error boundaries in different browsers:

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility Testing

Verify error boundaries are accessible:

- [ ] Error messages are announced by screen readers
- [ ] Buttons are keyboard accessible
- [ ] Focus management works correctly
- [ ] Color contrast meets WCAG standards
- [ ] Error details are accessible

## Known Limitations

Error boundaries do NOT catch errors in:

1. **Event Handlers**: Use try-catch in event handlers
2. **Asynchronous Code**: Use try-catch in async functions
3. **Server-Side Rendering**: Handle SSR errors separately
4. **Error Boundary Itself**: Errors in error boundary propagate up

## Troubleshooting

### Error Boundary Not Working

If error boundary is not catching errors:

1. Verify error is thrown during rendering
2. Check if error is in event handler (use try-catch)
3. Check if error is in async code (use try-catch)
4. Verify error boundary is properly wrapping component

### Infinite Error Loops

If experiencing infinite error loops:

1. Check error count tracking (should stop at 3)
2. Verify fallback UI doesn't throw errors
3. Check for errors in error boundary itself
4. Review component stack trace

### Logs Not Appearing

If logs are not appearing:

1. Check console settings
2. Verify error logger is imported
3. Check if logging is enabled
4. Verify browser console is open

## Conclusion

The Design System Error Boundary provides comprehensive error handling for the admin design system. Follow this test guide to ensure all functionality works correctly and provides a good user experience even when errors occur.
