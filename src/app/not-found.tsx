import Link from 'next/link';

export default function NotFound() {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                페이지를 찾을 수 없습니다
              </h2>
              <p className="text-gray-600 mb-8">
                요청하신 페이지가 존재하지 않거나 이동되었습니다.
              </p>
            </div>
            
            <div className="space-y-4">
              <Link 
                href="/ko" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                홈으로 돌아가기
              </Link>
              <br />
              <Link 
                href="/en" 
                className="inline-block text-blue-600 hover:text-blue-800 transition-colors"
              >
                Go to English Home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}