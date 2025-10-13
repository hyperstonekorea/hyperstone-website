'use client';

import { useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/Button';
import ContentManager from './ContentManager';
import EmailSettings from './EmailSettings';
import SEOStatus from './SEOStatus';
import DesignSystemManager from './design/DesignSystemManager';

type ActiveTab = 'overview' | 'content' | 'design' | 'email' | 'seo';

interface CollapsiblePanelProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  colorScheme?: 'blue' | 'green' | 'purple' | 'orange';
}

function CollapsiblePanel({ 
  title, 
  icon, 
  children, 
  defaultOpen = false,
  colorScheme = 'blue' 
}: CollapsiblePanelProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-150"
        aria-expanded={isOpen}
      >
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg ${colorClasses[colorScheme]} flex items-center justify-center text-xl transition-transform duration-200 ${isOpen ? 'scale-110' : ''}`}>
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="px-6 py-4 border-t border-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
}

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap animate-fadeIn">
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 p-4 rounded-lg h-24"></div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const { logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const handleTabChange = (tabId: ActiveTab) => {
    setIsLoading(true);
    setActiveTab(tabId);
    // Simulate loading for smooth transition
    setTimeout(() => setIsLoading(false), 300);
  };

  const tabs = [
    { id: 'overview' as const, label: '개요', icon: '📊', description: '대시보드 개요' },
    { id: 'content' as const, label: '콘텐츠', icon: '🎨', description: '콘텐츠 관리' },
    { id: 'design' as const, label: '디자인', icon: '🎭', description: '디자인 시스템' },
    { id: 'email' as const, label: '이메일', icon: '📧', description: '이메일 설정' },
    { id: 'seo' as const, label: 'SEO', icon: '🔍', description: 'SEO 관리' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50">
      {/* Modern Header with Gradient */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
                H
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  HYPERSTONE 관리자
                </h1>
                <p className="text-sm text-gray-600">웹사이트 관리 대시보드</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Tooltip content="웹사이트 미리보기">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('/', '_blank')}
                  className="hidden sm:flex items-center space-x-2"
                >
                  <span>🌐</span>
                  <span>미리보기</span>
                </Button>
              </Tooltip>
              <Tooltip content="로그아웃">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400 transition-all duration-200"
                >
                  로그아웃
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </header>

      {/* Modern Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <Tooltip key={tab.id} content={tab.description}>
                <button
                  onClick={() => handleTabChange(tab.id)}
                  className={`group relative py-4 px-4 sm:px-6 font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className={`text-lg transition-transform duration-200 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-105'}`}>
                      {tab.icon}
                    </span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </div>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                  )}
                </button>
              </Tooltip>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content with Smooth Transitions */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {activeTab === 'overview' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Welcome Card */}
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 sm:p-8 text-white">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2">환영합니다! 👋</h2>
                    <p className="text-blue-100 text-sm sm:text-base">
                      HYPERSTONE 웹사이트 관리 시스템에 오신 것을 환영합니다.
                    </p>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {[
                      { label: '콘텐츠', value: '4', icon: '🎨', color: 'blue', change: '+2%' },
                      { label: '디자인', value: '활성', icon: '🎭', color: 'purple', change: '최신' },
                      { label: '이메일', value: '설정됨', icon: '📧', color: 'green', change: '정상' },
                      { label: 'SEO', value: '최적화', icon: '🔍', color: 'orange', change: '100%' },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl">{stat.icon}</span>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            stat.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                            stat.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                            stat.color === 'green' ? 'bg-green-100 text-green-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {stat.change}
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Collapsible Panels */}
                  <CollapsiblePanel title="빠른 작업" icon="⚡" defaultOpen={true} colorScheme="blue">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleTabChange('content')}
                        className="w-full justify-center"
                      >
                        <span className="mr-2">🎨</span>
                        콘텐츠 관리
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTabChange('design')}
                        className="w-full justify-center"
                      >
                        <span className="mr-2">🎭</span>
                        디자인 시스템
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTabChange('email')}
                        className="w-full justify-center"
                      >
                        <span className="mr-2">📧</span>
                        이메일 설정
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTabChange('seo')}
                        className="w-full justify-center"
                      >
                        <span className="mr-2">🔍</span>
                        SEO 관리
                      </Button>
                    </div>
                  </CollapsiblePanel>

                  <CollapsiblePanel title="관리 기능" icon="🛠️" colorScheme="green">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        onClick={() => handleTabChange('content')}
                        className="group p-4 rounded-lg border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 text-left"
                      >
                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">🎨</div>
                        <h3 className="font-semibold text-gray-900 mb-1">콘텐츠 관리</h3>
                        <p className="text-sm text-gray-600">섹션별 배경 및 스타일 설정</p>
                      </button>
                      
                      <button
                        onClick={() => handleTabChange('design')}
                        className="group p-4 rounded-lg border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 text-left"
                      >
                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">🎭</div>
                        <h3 className="font-semibold text-gray-900 mb-1">디자인 시스템</h3>
                        <p className="text-sm text-gray-600">고급 디자인 설정 및 커스터마이징</p>
                      </button>
                      
                      <button
                        onClick={() => handleTabChange('email')}
                        className="group p-4 rounded-lg border-2 border-gray-200 hover:border-green-400 hover:bg-green-50 transition-all duration-200 text-left"
                      >
                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">📧</div>
                        <h3 className="font-semibold text-gray-900 mb-1">이메일 설정</h3>
                        <p className="text-sm text-gray-600">문의 수신 이메일 관리</p>
                      </button>
                    </div>
                  </CollapsiblePanel>

                  <CollapsiblePanel title="시스템 정보" icon="ℹ️" colorScheme="purple">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                        <div className="text-xl">🌐</div>
                        <div>
                          <div className="text-sm font-medium text-gray-700">웹사이트 URL</div>
                          <div className="text-sm text-gray-600">hyperstone.co.kr</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                        <div className="text-xl">🌍</div>
                        <div>
                          <div className="text-sm font-medium text-gray-700">언어 지원</div>
                          <div className="text-sm text-gray-600">한국어, 영어</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                        <div className="text-xl">📅</div>
                        <div>
                          <div className="text-sm font-medium text-gray-700">마지막 업데이트</div>
                          <div className="text-sm text-gray-600">{new Date().toLocaleDateString('ko-KR')}</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                        <div className="text-xl">✅</div>
                        <div>
                          <div className="text-sm font-medium text-gray-700">관리자 세션</div>
                          <div className="text-sm text-green-600 font-medium">활성</div>
                        </div>
                      </div>
                    </div>
                  </CollapsiblePanel>

                  {/* Help Section */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">💡</div>
                      <div>
                        <h3 className="font-semibold text-blue-900 mb-2">도움말</h3>
                        <p className="text-sm text-blue-800 mb-3">
                          각 탭을 클릭하여 다양한 관리 기능에 접근할 수 있습니다. 
                          아이콘 위에 마우스를 올리면 추가 정보를 확인할 수 있습니다.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs bg-white text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                            💾 자동 저장
                          </span>
                          <span className="text-xs bg-white text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                            🔄 실시간 미리보기
                          </span>
                          <span className="text-xs bg-white text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                            📱 반응형 디자인
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'content' && (
                <div className="animate-fadeIn">
                  <ContentManager />
                </div>
              )}
              
              {activeTab === 'design' && (
                <div className="animate-fadeIn">
                  <DesignSystemManager />
                </div>
              )}
              
              {activeTab === 'email' && (
                <div className="animate-fadeIn">
                  <EmailSettings />
                </div>
              )}
              
              {activeTab === 'seo' && (
                <div className="animate-fadeIn">
                  <SEOStatus />
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;