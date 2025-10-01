import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/lib/metadata';
import { generateOrganizationSchema, generateWebsiteSchema } from '@/lib/structured-data';
import StructuredData from '@/components/seo/StructuredData';
import { PerformanceMonitor } from '@/components/ui/PerformanceMonitor';
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  return generatePageMetadata({
    locale: locale as Locale,
    url: locale === 'ko' ? '/' : '/en',
  });
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

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // Generate structured data
  const organizationSchema = generateOrganizationSchema(locale as Locale);
  const websiteSchema = generateWebsiteSchema(locale as Locale);

  return (
    <html lang={locale}>
      <head>
        <StructuredData data={[organizationSchema, websiteSchema]} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <PerformanceMonitor />
          <div className="mobile-optimized touch-device">
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}