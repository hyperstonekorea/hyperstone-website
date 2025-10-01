import { ReactNode } from 'react';

interface ProductLayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
    productSlug: string;
  }>;
}

export default function ProductLayout({ children }: ProductLayoutProps) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}