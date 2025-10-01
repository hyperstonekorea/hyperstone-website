'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';
import { Locale, ContactFormData } from '@/types';

interface ContactFormProps {
  locale: Locale;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

interface FormStatus {
  type: 'idle' | 'submitting' | 'success' | 'error';
  message?: string;
}

export function ContactForm({ locale }: ContactFormProps) {
  const t = useTranslations();
  const { deviceInfo, touchOptimizations } = useMobileOptimization();
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Korean phone number format: 010-1234-5678 or 02-123-4567 or international format
    const phoneRegex = /^(\+82|0)([0-9]{1,2})-?([0-9]{3,4})-?([0-9]{4})$/;
    const cleanPhone = phone.replace(/\s/g, '');
    return phoneRegex.test(cleanPhone) || /^[\d\s\-\+\(\)]{8,15}$/.test(cleanPhone);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = t('contact.form.nameRequired');
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = t('contact.form.phoneRequired');
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = locale === 'ko' 
        ? '올바른 전화번호 형식을 입력해주세요' 
        : 'Please enter a valid phone number';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.emailRequired');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('contact.form.emailInvalid');
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = t('contact.form.messageRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setStatus({ type: 'submitting' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ 
          type: 'success', 
          message: t('contact.form.success')
        });
        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: ''
        });
      } else {
        setStatus({ 
          type: 'error', 
          message: result.message || t('contact.form.error')
        });
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: t('contact.form.error')
      });
    }
  };

  // Mobile-optimized input styles
  const inputBaseStyles = `w-full border rounded-lg focus:ring-2 focus:ring-[#0082FB] focus:border-transparent transition-colors ${
    deviceInfo.isMobile ? 'px-4 py-4 text-base' : 'px-4 py-3 text-sm'
  }`;

  return (
    <div className={`bg-white rounded-2xl shadow-xl ${deviceInfo.isMobile ? 'p-6' : 'p-8'}`}>
      <h3 className={`font-bold text-[#1C2B33] mb-6 ${deviceInfo.isMobile ? 'text-xl' : 'text-2xl'}`}>
        {t('contact.form.title')}
      </h3>

      {status.type === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
        >
          <p className="text-green-800 text-sm font-medium">
            {status.message}
          </p>
        </motion.div>
      )}

      {status.type === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <p className="text-red-800 text-sm font-medium">
            {status.message}
          </p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className={deviceInfo.isMobile ? 'space-y-5' : 'space-y-6'}>
        {/* Name Field */}
        <div>
          <label 
            htmlFor="name" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t('contact.form.name')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`${inputBaseStyles} ${
              errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            style={{
              fontSize: touchOptimizations.preventZoom.fontSize,
              WebkitTapHighlightColor: 'transparent'
            }}
            placeholder={t('contact.form.name')}
            disabled={status.type === 'submitting'}
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600"
            >
              {errors.name}
            </motion.p>
          )}
        </div>

        {/* Phone and Email Fields */}
        <div className={`grid gap-4 ${deviceInfo.isMobile ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
          <div>
            <label 
              htmlFor="phone" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t('contact.form.phone')} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="tel"
              autoComplete="tel"
              inputMode="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`${inputBaseStyles} ${
                errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              style={{
                fontSize: touchOptimizations.preventZoom.fontSize,
                WebkitTapHighlightColor: 'transparent'
              }}
              placeholder={locale === 'ko' ? '010-1234-5678' : '+82-10-1234-5678'}
              disabled={status.type === 'submitting'}
            />
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-600"
              >
                {errors.phone}
              </motion.p>
            )}
          </div>

          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t('contact.form.email')} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`${inputBaseStyles} ${
                errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              style={{
                fontSize: touchOptimizations.preventZoom.fontSize,
                WebkitTapHighlightColor: 'transparent'
              }}
              placeholder="example@email.com"
              disabled={status.type === 'submitting'}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-600"
              >
                {errors.email}
              </motion.p>
            )}
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label 
            htmlFor="message" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t('contact.form.message')} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={deviceInfo.isMobile ? 4 : 5}
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className={`${inputBaseStyles} resize-vertical ${
              errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            style={{
              fontSize: touchOptimizations.preventZoom.fontSize,
              WebkitTapHighlightColor: 'transparent',
              minHeight: deviceInfo.isMobile ? '120px' : '140px'
            }}
            placeholder={t('contact.form.message')}
            disabled={status.type === 'submitting'}
          />
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600"
            >
              {errors.message}
            </motion.p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={status.type === 'submitting'}
        >
          {status.type === 'submitting' 
            ? t('contact.form.submitting') 
            : t('contact.form.submit')
          }
        </Button>
      </form>
    </div>
  );
}

export default ContactForm;