'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AdminSettings } from '@/types';

export default function EmailSettings() {
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
        setEmailRecipient(data.emailRecipient);
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

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (email: string) => {
    setEmailRecipient(email);
    
    if (email && !validateEmail(email)) {
      setEmailError('올바른 이메일 형식을 입력해주세요.');
    } else {
      setEmailError('');
    }
  };

  const saveEmailSettings = async () => {
    if (!settings || !emailRecipient) return;

    if (!validateEmail(emailRecipient)) {
      setEmailError('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      const updatedSettings = {
        ...settings,
        emailRecipient
      };

      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSettings),
      });

      if (response.ok) {
        setSettings(updatedSettings);
        setMessage({ type: 'success', text: '이메일 설정이 저장되었습니다.' });
      } else {
        throw new Error('설정 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Save email settings error:', error);
      setMessage({ type: 'error', text: '이메일 설정 저장에 실패했습니다.' });
    } finally {
      setIsSaving(false);
    }
  };

  const sendTestEmail = async () => {
    if (!emailRecipient || !validateEmail(emailRecipient)) {
      setEmailError('올바른 이메일 주소를 입력해주세요.');
      return;
    }

    setIsTesting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: emailRecipient,
          testMessage: '이것은 HYPERSTONE 관리자 패널에서 발송된 테스트 이메일입니다.'
        }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: '테스트 이메일이 발송되었습니다.' });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || '테스트 이메일 발송에 실패했습니다.');
      }
    } catch (error) {
      console.error('Test email error:', error);
      setMessage({ type: 'error', text: '테스트 이메일 발송에 실패했습니다.' });
    } finally {
      setIsTesting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg">설정을 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">이메일 설정</h2>
        <p className="text-gray-600 mt-1">문의 양식으로 접수된 내용을 받을 이메일 주소를 설정합니다.</p>
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

      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          {/* Current Email Display */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              현재 설정된 이메일
            </label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700">
              {settings?.emailRecipient || '설정되지 않음'}
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="emailRecipient" className="block text-sm font-medium text-gray-700 mb-2">
              문의 수신 이메일 주소 *
            </label>
            <input
              type="email"
              id="emailRecipient"
              value={emailRecipient}
              onChange={(e) => handleEmailChange(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                emailError ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="admin@hyperstone.co.kr"
            />
            {emailError && (
              <p className="mt-1 text-sm text-red-600">{emailError}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              웹사이트 문의 양식으로 접수된 내용이 이 이메일 주소로 발송됩니다.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              onClick={saveEmailSettings}
              disabled={isSaving || !!emailError || !emailRecipient}
            >
              {isSaving ? '저장 중...' : '설정 저장'}
            </Button>
            
            <Button
              variant="outline"
              onClick={sendTestEmail}
              disabled={isTesting || !!emailError || !emailRecipient}
            >
              {isTesting ? '발송 중...' : '테스트 이메일 발송'}
            </Button>
          </div>

          {/* Email Configuration Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <h4 className="text-sm font-medium text-blue-800 mb-2">📧 이메일 설정 정보</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 문의 양식 제출 시 설정된 이메일로 자동 발송됩니다</li>
              <li>• 테스트 이메일을 통해 이메일 발송이 정상 작동하는지 확인할 수 있습니다</li>
              <li>• 이메일 발송에 문제가 있는 경우 환경변수 설정을 확인해주세요</li>
            </ul>
          </div>

          {/* SMTP Configuration Guide */}
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
            <h4 className="text-sm font-medium text-gray-800 mb-2">⚙️ SMTP 설정 가이드</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <p>이메일 발송을 위해 다음 환경변수가 설정되어야 합니다:</p>
              <div className="bg-white p-3 rounded border font-mono text-xs">
                <div>EMAIL_HOST=smtp.gmail.com</div>
                <div>EMAIL_PORT=587</div>
                <div>EMAIL_USER=your-email@gmail.com</div>
                <div>EMAIL_PASS=your-app-password</div>
              </div>
              <p className="text-xs">
                Gmail 사용 시 앱 비밀번호를 생성하여 EMAIL_PASS에 설정해주세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}