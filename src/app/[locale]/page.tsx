import { Locale } from '@/types';

interface PageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          HYPERSTONE - {locale === 'ko' ? '한국어' : 'English'}
        </h1>
        <p className="text-xl">
          {locale === 'ko' 
            ? '건설업계의 혁신적인 솔루션' 
            : 'Innovative Solutions for Construction Industry'
          }
        </p>
        <p className="mt-4 text-gray-600">
          {locale === 'ko' 
            ? '페이지가 정상적으로 로드되었습니다.' 
            : 'Page loaded successfully.'
          }
        </p>
      </div>
    </div>
  );
}