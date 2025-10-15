import type { Metadata } from "next";
import { Geist, Geist_Mono, Audiowide } from "next/font/google";
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { locales, isValidLocale } from '@/i18n/config';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Loading } from '@/components/ui/Loading';
import { logError } from '@/lib/error-logging';
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const audiowide = Audiowide({
  weight: "400",
  variable: "--font-audiowide",
  subsets: ["latin"],
});

// Generate static params for supported locales
export async function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  try {
    const { locale } = await params;
    
    return {
      title: `HYPERSTONE - ${locale === 'ko' ? '건설업계의 혁신적인 솔루션' : 'Innovative Construction Solutions'}`,
      description: locale === 'ko' 
        ? 'DULITE 브랜드로 최고 품질의 콘크리트 제품을 제공하는 HYPERSTONE'
        : 'HYPERSTONE provides the highest quality concrete products under the DULITE brand'
    };
  } catch (error) {
    logError(error as Error, { component: 'LocaleLayout.generateMetadata' });
    return {
      title: 'HYPERSTONE',
      description: 'HYPERSTONE - Construction Solutions'
    };
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  try {
    const { locale } = await params;
    
    // Validate that the incoming `locale` parameter is valid
    if (!isValidLocale(locale)) {
      notFound();
    }

    return (
      <html lang={locale}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${audiowide.variable} antialiased`}
        >
          <ErrorBoundary>
            <Suspense fallback={<Loading variant="page" locale={locale} />}>
              <div className="mobile-optimized touch-device">
                {children}
              </div>
            </Suspense>
          </ErrorBoundary>
        </body>
      </html>
    );
  } catch (error) {
    logError(error as Error, { component: 'LocaleLayout' });
    notFound();
  }
}