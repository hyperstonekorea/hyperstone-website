'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ReactNode, useEffect, useState } from 'react';

interface TranslationsProviderProps {
  children: ReactNode;
  locale: string;
}

export function TranslationsProvider({ children, locale }: TranslationsProviderProps) {
  const [messages, setMessages] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only load on client side
    if (typeof window === 'undefined') return;

    async function loadMessages() {
      try {
        const msgs = await import(`../../../messages/${locale}.json`);
        setMessages(msgs.default);
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to empty messages
        setMessages({});
      } finally {
        setLoading(false);
      }
    }

    loadMessages();
  }, [locale]);

  if (loading || !messages) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
