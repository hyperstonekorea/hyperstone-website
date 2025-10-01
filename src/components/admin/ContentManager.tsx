'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AdminSettings, SectionConfig } from '@/types';
import { emitBackgroundConfigUpdate } from '@/hooks/useBackgroundConfig';

export default function ContentManager() {
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const sectionLabels = {
    hero: '메인 히어로 섹션',
    about: '회사 소개 섹션',
    products: '제품 소개 섹션',
    contact: '연락처 섹션'
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      } else {
        throw new Error('설정을 불러올 수 없습니다.');
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
      setMessage({ type: 'error', text: '설정을 불러오는데 실패했습니다.' });
    } finally {
      setIsLoading(false);
    }
  };

  const updateSectionConfig = (sectionId: string, updates: Partial<SectionConfig>) => {
    if (!settings) return;

    const updatedConfigs = settings.sectionConfigs.map(config =>
      config.sectionId === sectionId ? { ...config, ...updates } : config
    );

    const updatedSettings = {
      ...settings,
      sectionConfigs: updatedConfigs
    };

    setSettings(updatedSettings);

    // Emit real-time update for the specific section
    const updatedConfig = updatedConfigs.find(config => config.sectionId === sectionId);
    if (updatedConfig) {
      emitBackgroundConfigUpdate(sectionId, updatedConfig);
    }
  };

  const handleImageUpload = async (sectionId: string, file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('section', sectionId);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        updateSectionConfig(sectionId, {
          backgroundType: 'image',
          backgroundValue: data.url
        });
        setMessage({ type: 'success', text: '이미지가 업로드되었습니다.' });
      } else {
        throw new Error('이미지 업로드에 실패했습니다.');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      setMessage({ type: 'error', text: '이미지 업로드에 실패했습니다.' });
    }
  };

  const saveSettings = async () => {
    if (!settings) return;

    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        // Emit update events for each section to trigger real-time updates
        settings.sectionConfigs.forEach(config => {
          emitBackgroundConfigUpdate(config.sectionId, config);
        });
        setMessage({ type: 'success', text: '설정이 저장되었습니다.' });
      } else {
        throw new Error('설정 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Save settings error:', error);
      setMessage({ type: 'error', text: '설정 저장에 실패했습니다.' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg">설정을 불러오는 중...</div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-800">설정을 불러올 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">콘텐츠 관리</h2>
        <Button
          variant="primary"
          onClick={saveSettings}
          disabled={isSaving}
        >
          {isSaving ? '저장 중...' : '설정 저장'}
        </Button>
      </div>

      {message && (
        <div className={`p-4 rounded-md ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-800'
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid gap-6">
        {settings.sectionConfigs.map((config) => (
          <div key={config.sectionId} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">
              {sectionLabels[config.sectionId as keyof typeof sectionLabels] || config.sectionId}
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Background Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  배경 타입
                </label>
                <select
                  value={config.backgroundType}
                  onChange={(e) => updateSectionConfig(config.sectionId, {
                    backgroundType: e.target.value as 'video' | 'image' | 'color'
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="color">색상</option>
                  <option value="image">이미지</option>
                  <option value="video">동영상</option>
                </select>
              </div>

              {/* Background Value Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {config.backgroundType === 'color' && '배경 색상'}
                  {config.backgroundType === 'image' && '이미지'}
                  {config.backgroundType === 'video' && '동영상 URL'}
                </label>

                {config.backgroundType === 'color' && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={config.backgroundValue}
                      onChange={(e) => updateSectionConfig(config.sectionId, {
                        backgroundValue: e.target.value
                      })}
                      className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.backgroundValue}
                      onChange={(e) => updateSectionConfig(config.sectionId, {
                        backgroundValue: e.target.value
                      })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="#000000"
                    />
                  </div>
                )}

                {config.backgroundType === 'image' && (
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageUpload(config.sectionId, file);
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {config.backgroundValue && (
                      <div className="text-sm text-gray-600">
                        현재 이미지: {config.backgroundValue}
                      </div>
                    )}
                  </div>
                )}

                {config.backgroundType === 'video' && (
                  <input
                    type="url"
                    value={config.backgroundValue}
                    onChange={(e) => updateSectionConfig(config.sectionId, {
                      backgroundValue: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="https://example.com/video.mp4"
                  />
                )}
              </div>

              {/* Opacity Slider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  투명도: {config.opacity}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={config.opacity}
                  onChange={(e) => updateSectionConfig(config.sectionId, {
                    opacity: parseInt(e.target.value)
                  })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Tone Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  톤 설정
                </label>
                <select
                  value={config.tone}
                  onChange={(e) => updateSectionConfig(config.sectionId, {
                    tone: e.target.value as 'light' | 'dark' | 'auto'
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="light">밝은 톤</option>
                  <option value="dark">어두운 톤</option>
                  <option value="auto">자동</option>
                </select>
              </div>
            </div>

            {/* Preview */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                미리보기
              </label>
              <div 
                className="w-full h-20 rounded-md border border-gray-300 flex items-center justify-center text-sm text-gray-600"
                style={{
                  backgroundColor: config.backgroundType === 'color' ? config.backgroundValue : '#f3f4f6',
                  backgroundImage: config.backgroundType === 'image' ? `url(${config.backgroundValue})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: config.opacity / 100
                }}
              >
                {config.backgroundType === 'video' && '동영상 배경'}
                {config.backgroundType === 'image' && !config.backgroundValue && '이미지를 업로드하세요'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}