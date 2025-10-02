import { Locale } from '@/i18n/config';

interface LoadingProps {
  message?: string;
  locale?: Locale;
  variant?: 'page' | 'section' | 'inline';
}

const LOADING_MESSAGES: Record<Locale, string> = {
  en: 'Loading...',
  ko: '로딩 중...',
};

export function Loading({ message, locale = 'en', variant = 'page' }: LoadingProps) {
  const displayMessage = message || LOADING_MESSAGES[locale];

  if (variant === 'inline') {
    return (
      <span className="inline-flex items-center gap-2" role="status" aria-live="polite">
        <svg
          className="animate-spin h-4 w-4 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span className="text-sm text-gray-600">{displayMessage}</span>
      </span>
    );
  }

  if (variant === 'section') {
    return (
      <div className="py-16 px-4" role="status" aria-live="polite">
        <div className="flex flex-col items-center justify-center">
          <svg
            className="animate-spin h-10 w-10 text-blue-600 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="text-gray-600 text-lg">{displayMessage}</p>
        </div>
      </div>
    );
  }

  // page variant
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50" role="status" aria-live="polite">
      <div className="flex flex-col items-center">
        <svg
          className="animate-spin h-16 w-16 text-blue-600 mb-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <p className="text-gray-700 text-xl font-medium">{displayMessage}</p>
      </div>
    </div>
  );
}

export function HeroLoading({ locale = 'en' }: { locale?: Locale }) {
  return (
    <div className="min-h-[600px] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Loading variant="section" locale={locale} />
    </div>
  );
}

export function SectionLoading({ locale = 'en' }: { locale?: Locale }) {
  return <Loading variant="section" locale={locale} />;
}
