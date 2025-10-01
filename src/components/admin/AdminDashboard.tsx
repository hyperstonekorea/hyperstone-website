'use client';

import { useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/Button';
import ContentManager from './ContentManager';
import EmailSettings from './EmailSettings';
import SEOStatus from './SEOStatus';

type ActiveTab = 'overview' | 'content' | 'email' | 'seo';

function AdminDashboard() {
  const { logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');

  const handleLogout = () => {
    logout();
  };

  const tabs = [
    { id: 'overview' as const, label: '개요', icon: '📊' },
    { id: 'content' as const, label: '콘텐츠 관리', icon: '🎨' },
    { id: 'email' as const, label: '이메일 설정', icon: '📧' },
    { id: 'seo' as const, label: 'SEO 관리', icon: '🔍' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">HYPERSTONE 관리자</h1>
              <p className="text-sm text-gray-600">웹사이트 관리 대시보드</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              로그아웃
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">관리자 대시보드</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">🎨</div>
                    <div>
                      <h3 className="font-medium text-gray-900">콘텐츠 관리</h3>
                      <p className="text-sm text-gray-600">섹션별 배경 및 스타일 설정</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">📧</div>
                    <div>
                      <h3 className="font-medium text-gray-900">이메일 설정</h3>
                      <p className="text-sm text-gray-600">문의 수신 이메일 관리</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">🔍</div>
                    <div>
                      <h3 className="font-medium text-gray-900">SEO 관리</h3>
                      <p className="text-sm text-gray-600">검색엔진 최적화 상태 확인</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">빠른 작업</h3>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setActiveTab('content')}
                >
                  배경 설정 변경
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab('email')}
                >
                  이메일 설정 변경
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab('seo')}
                >
                  SEO 상태 확인
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('/', '_blank')}
                >
                  웹사이트 보기
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">시스템 정보</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">웹사이트 URL:</span>
                  <span className="ml-2 text-gray-600">hyperstone.co.kr</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">언어 지원:</span>
                  <span className="ml-2 text-gray-600">한국어, 영어</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">마지막 업데이트:</span>
                  <span className="ml-2 text-gray-600">{new Date().toLocaleDateString('ko-KR')}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">관리자 세션:</span>
                  <span className="ml-2 text-green-600">활성</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && <ContentManager />}
        {activeTab === 'email' && <EmailSettings />}
        {activeTab === 'seo' && <SEOStatus />}
      </main>
    </div>
  );
}

export default AdminDashboard;