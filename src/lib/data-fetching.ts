import { logError, logWarning } from './error-logging';

export interface FetchOptions {
  cache?: RequestCache;
  timeout?: number;
  fallback?: any;
  retries?: number;
}

export interface FetchResult<T> {
  data: T | null;
  error: Error | null;
  fromCache: boolean;
  fromFallback: boolean;
}

const DEFAULT_TIMEOUT = 10000; // 10 seconds
const DEFAULT_RETRIES = 1;

export async function safeFetch<T>(
  url: string,
  options: FetchOptions = {}
): Promise<FetchResult<T>> {
  const {
    cache = 'force-cache',
    timeout = DEFAULT_TIMEOUT,
    fallback = null,
    retries = DEFAULT_RETRIES,
  } = options;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        cache,
        signal: controller.signal,
        next: cache === 'force-cache' ? { revalidate: 3600 } : undefined,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        data,
        error: null,
        fromCache: cache === 'force-cache',
        fromFallback: false,
      };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < retries) {
        logWarning(`Fetch attempt ${attempt + 1} failed, retrying...`, {
          url,
          error: lastError.message,
        });
        await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }
  }

  logError(lastError!, {
    component: 'safeFetch',
    url,
    retries,
  });

  if (fallback !== null) {
    logWarning('Using fallback data', { url });
    return {
      data: fallback,
      error: lastError,
      fromCache: false,
      fromFallback: true,
    };
  }

  return {
    data: null,
    error: lastError,
    fromCache: false,
    fromFallback: false,
  };
}

// Request deduplication cache
const requestCache = new Map<string, Promise<any>>();

export async function dedupedFetch<T>(
  url: string,
  options: FetchOptions = {}
): Promise<FetchResult<T>> {
  const cacheKey = `${url}-${JSON.stringify(options)}`;

  if (requestCache.has(cacheKey)) {
    return requestCache.get(cacheKey);
  }

  const promise = safeFetch<T>(url, options);
  requestCache.set(cacheKey, promise);

  try {
    const result = await promise;
    return result;
  } finally {
    setTimeout(() => requestCache.delete(cacheKey), 5000);
  }
}
