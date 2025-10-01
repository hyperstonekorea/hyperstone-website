import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';

export default function ProductNotFound() {
  const t = useTranslations('common');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            제품을 찾을 수 없습니다
          </h2>
          <p className="text-gray-600">
            요청하신 제품 페이지가 존재하지 않습니다.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            variant="primary" 
            size="lg"
            href="/"
          >
            홈으로 돌아가기
          </Button>
          
          <div>
            <Link 
              href="/#products"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              제품 목록 보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}