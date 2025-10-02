import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from 'next/navigation';
import { Locale } from '@/types';
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const locales = ['ko', 'en'];

// Generate static params for supported locales
export async function generateStaticParams() {
  return [
    { locale: 'ko' },
    { locale: 'en' }
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: `HYPERSTONE - ${locale === 'ko' ? '건설업계의 혁신적인 솔루션' : 'Innovative Construction Solutions'}`,
    description: locale === 'ko' 
      ? 'DULITE 브랜드로 최고 품질의 콘크리트 제품을 제공하는 HYPERSTONE'
      : 'HYPERSTONE provides the highest quality concrete products under the DULITE brand'
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="mobile-optimized touch-device">
          {children}
        </div>
      </body>
    </html>
  );
}