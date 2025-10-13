/**
 * Error Logger for Design System
 * 
 * Provides centralized error logging functionality for the design system.
 * Can be extended to send logs to external services like Sentry, LogRocket, etc.
 */

export interface ErrorLogEntry {
  timestamp: string;
  level: 'error' | 'warning' | 'info';
  component: string;
  message: string;
  error?: Error;
  context?: Record<string, unknown>;
  userAgent?: string;
  url?: string;
}

export interface ErrorLoggerConfig {
  enableConsoleLogging: boolean;
  enableRemoteLogging: boolean;
  remoteEndpoint?: string;
  maxLogSize: number;
}

class DesignSystemErrorLogger {
  private config: ErrorLoggerConfig;
  private logs: ErrorLogEntry[] = [];

  constructor(config?: Partial<ErrorLoggerConfig>) {
    this.config = {
      enableConsoleLogging: true,
      enableRemoteLogging: false,
      maxLogSize: 100,
      ...config,
    };
  }

  /**
   * Log an error
   */
  error(component: string, message: string, error?: Error, context?: Record<string, unknown>): void {
    this.log('error', component, message, error, context);
  }

  /**
   * Log a warning
   */
  warning(component: string, message: string, context?: Record<string, unknown>): void {
    this.log('warning', component, message, undefined, context);
  }

  /**
   * Log info
   */
  info(component: string, message: string, context?: Record<string, unknown>): void {
    this.log('info', component, message, undefined, context);
  }

  /**
   * Core logging method
   */
  private log(
    level: 'error' | 'warning' | 'info',
    component: string,
    message: string,
    error?: Error,
    context?: Record<string, unknown>
  ): void {
    const logEntry: ErrorLogEntry = {
      timestamp: new Date().toISOString(),
      level,
      component,
      message,
      error,
      context,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    };

    // Add to in-memory log
    this.logs.push(logEntry);
    if (this.logs.length > this.config.maxLogSize) {
      this.logs.shift(); // Remove oldest log
    }

    // Console logging
    if (this.config.enableConsoleLogging) {
      this.logToConsole(logEntry);
    }

    // Remote logging
    if (this.config.enableRemoteLogging && this.config.remoteEndpoint) {
      this.logToRemote(logEntry);
    }
  }

  /**
   * Log to console with appropriate formatting
   */
  private logToConsole(entry: ErrorLogEntry): void {
    const prefix = `[DesignSystem:${entry.component}]`;
    const logData = {
      timestamp: entry.timestamp,
      message: entry.message,
      ...(entry.context && { context: entry.context }),
      ...(entry.error && { error: entry.error }),
    };

    switch (entry.level) {
      case 'error':
        console.error(prefix, logData);
        break;
      case 'warning':
        console.warn(prefix, logData);
        break;
      case 'info':
        console.info(prefix, logData);
        break;
    }
  }

  /**
   * Send log to remote logging service
   */
  private async logToRemote(entry: ErrorLogEntry): Promise<void> {
    if (!this.config.remoteEndpoint) return;

    try {
      // Serialize error object
      const serializedEntry = {
        ...entry,
        error: entry.error ? {
          message: entry.error.message,
          stack: entry.error.stack,
          name: entry.error.name,
        } : undefined,
      };

      await fetch(this.config.remoteEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serializedEntry),
      });
    } catch (error) {
      // Silently fail to avoid infinite error loops
      console.error('[DesignSystemErrorLogger] Failed to send log to remote:', error);
    }
  }

  /**
   * Get all logs
   */
  getLogs(): ErrorLogEntry[] {
    return [...this.logs];
  }

  /**
   * Get logs by level
   */
  getLogsByLevel(level: 'error' | 'warning' | 'info'): ErrorLogEntry[] {
    return this.logs.filter(log => log.level === level);
  }

  /**
   * Get logs by component
   */
  getLogsByComponent(component: string): ErrorLogEntry[] {
    return this.logs.filter(log => log.component === component);
  }

  /**
   * Clear all logs
   */
  clearLogs(): void {
    this.logs = [];
  }

  /**
   * Export logs as JSON
   */
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<ErrorLoggerConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

// Singleton instance
let loggerInstance: DesignSystemErrorLogger | null = null;

/**
 * Get the error logger instance
 */
export function getErrorLogger(config?: Partial<ErrorLoggerConfig>): DesignSystemErrorLogger {
  if (!loggerInstance) {
    loggerInstance = new DesignSystemErrorLogger(config);
  } else if (config) {
    loggerInstance.updateConfig(config);
  }
  return loggerInstance;
}

/**
 * Convenience functions for quick logging
 */
export const designSystemLogger = {
  error: (component: string, message: string, error?: Error, context?: Record<string, unknown>) => {
    getErrorLogger().error(component, message, error, context);
  },
  warning: (component: string, message: string, context?: Record<string, unknown>) => {
    getErrorLogger().warning(component, message, context);
  },
  info: (component: string, message: string, context?: Record<string, unknown>) => {
    getErrorLogger().info(component, message, context);
  },
  getLogs: () => getErrorLogger().getLogs(),
  clearLogs: () => getErrorLogger().clearLogs(),
  exportLogs: () => getErrorLogger().exportLogs(),
};

export default designSystemLogger;
