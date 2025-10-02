export interface ErrorLog {
  level: 'error' | 'warn' | 'info';
  message: string;
  context: {
    component?: string;
    locale?: string;
    url?: string;
    userAgent?: string;
    [key: string]: any;
  };
  stack?: string;
  timestamp: number;
}

export function logError(
  error: Error,
  context: Record<string, any> = {}
): void {
  const errorLog: ErrorLog = {
    level: 'error',
    message: error.message,
    context: {
      ...context,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    },
    stack: error.stack,
    timestamp: Date.now(),
  };

  console.error('[ERROR]', errorLog);
}

export function logWarning(
  message: string,
  context: Record<string, any> = {}
): void {
  const warningLog: ErrorLog = {
    level: 'warn',
    message,
    context: {
      ...context,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    },
    timestamp: Date.now(),
  };

  console.warn('[WARNING]', warningLog);
}

export function logInfo(
  message: string,
  context: Record<string, any> = {}
): void {
  const infoLog: ErrorLog = {
    level: 'info',
    message,
    context: {
      ...context,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    },
    timestamp: Date.now(),
  };

  console.info('[INFO]', infoLog);
}
