'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { ContactForm } from '@/components/forms/ContactForm';
import DynamicBackground from '@/components/ui/DynamicBackground';
import { useDesignSettings } from '@/hooks/useDesignSettings';
import { applyColorValue, createSectionStyles } from '@/lib/design/apply-styles';
import { Locale } from '@/types';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ClockIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

interface ContactSectionProps {
  locale: Locale;
}

interface ContactInfoItemProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: string | string[];
  delay: number;
  accentColor: string;
  headingColor: string;
  textColor: string;
}

function ContactInfoItem({ icon: Icon, title, content, delay, accentColor, headingColor, textColor }: ContactInfoItemProps) {
  return (
    <AnimatedSection animation="slideUp" delay={delay}>
      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-start space-x-4">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            style={{ 
              background: `linear-gradient(to bottom right, ${accentColor}, ${headingColor})` 
            }}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 
              className="text-lg font-semibold mb-2 transition-colors"
              style={{ color: headingColor }}
            >
              {title}
            </h4>
            {Array.isArray(content) ? (
              <div className="space-y-1">
                {content.map((item, index) => (
                  <p key={index} className="text-sm" style={{ color: textColor }}>
                    {item}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-sm" style={{ color: textColor }}>
                {content}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

export function ContactSection({ locale }: ContactSectionProps) {
  const t = useTranslations();
  const { settings, loading } = useDesignSettings();
  
  // Get contact section design settings
  const contactConfig = settings.sections.contact;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const mapBackgroundType = (type: string): 'video' | 'image' | 'color' => {
    if (type === 'gradient') return 'color';
    if (type === 'video' || type === 'image') return type;
    return 'color';
  };

  // Generate section styles
  const sectionStyles = createSectionStyles('contact', contactConfig);

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: t('contact.phone'),
      content: '+82-2-1234-5678',
      delay: 0.2
    },
    {
      icon: EnvelopeIcon,
      title: t('contact.email'),
      content: 'info@hyperstone.co.kr',
      delay: 0.3
    },
    {
      icon: MapPinIcon,
      title: t('contact.address'),
      content: locale === 'ko' 
        ? ['서울특별시 강남구 테헤란로 123', '하이퍼스톤 빌딩 10층']
        : ['10th Floor, Hyperstone Building', '123 Teheran-ro, Gangnam-gu, Seoul'],
      delay: 0.4
    },
    {
      icon: ClockIcon,
      title: t('contact.hours'),
      content: locale === 'ko'
        ? ['평일: 09:00 - 18:00', '토요일: 09:00 - 13:00', '일요일 및 공휴일 휴무']
        : ['Weekdays: 09:00 - 18:00', 'Saturday: 09:00 - 13:00', 'Closed on Sundays and holidays'],
      delay: 0.5
    }
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: sectionStyles }} />
      
      <DynamicBackground 
        sectionId="contact"
        className="min-h-screen flex items-center justify-center py-20"
        fallbackConfig={{
          backgroundType: mapBackgroundType(contactConfig.background.type),
          backgroundValue: contactConfig.background.value,
          opacity: 90,
          tone: 'dark'
        }}
      >
        <section id="contact" className="relative w-full">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0082FB]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0064E0]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <AnimatedSection animation="slideUp" delay={0.1}>
              <h2 className="section-heading text-5xl lg:text-6xl font-bold mb-6">
                {t('contact.title')}
              </h2>
              <div 
                className="w-24 h-1 mx-auto mb-8 rounded-full"
                style={{ backgroundColor: applyColorValue(contactConfig.colors.accent) }}
              />
              <p className="section-body text-xl max-w-3xl mx-auto leading-relaxed">
                {t('contact.subtitle')}
              </p>
            </AnimatedSection>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <div>
              <AnimatedSection animation="slideLeft" delay={0.2}>
                <h3 className="section-heading text-3xl font-bold mb-8">
                  {t('contact.info.title')}
                </h3>
              </AnimatedSection>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <ContactInfoItem
                    key={index}
                    icon={info.icon}
                    title={info.title}
                    content={info.content}
                    delay={info.delay}
                    accentColor={applyColorValue(contactConfig.colors.accent)}
                    headingColor={applyColorValue(contactConfig.colors.heading)}
                    textColor={applyColorValue(contactConfig.colors.text)}
                  />
                ))}
              </div>

              {/* Company Information */}
              <AnimatedSection animation="slideUp" delay={0.6}>
                <div 
                  className="mt-8 p-6 rounded-xl text-white"
                  style={{ 
                    background: `linear-gradient(to right, ${applyColorValue(contactConfig.colors.accent)}, ${applyColorValue(contactConfig.colors.heading)})` 
                  }}
                >
                  <div className="flex items-center mb-4">
                    <BuildingOfficeIcon className="w-6 h-6 mr-3" />
                    <h4 className="text-lg font-semibold">HYPERSTONE</h4>
                  </div>
                  <div className="space-y-2 text-sm opacity-90">
                    <p>{t('footer.businessNumber')}: 123-45-67890</p>
                    <p>{t('footer.ceo')}: {locale === 'ko' ? '김대표' : 'CEO Kim'}</p>
                    <p>{t('contact.established')}: 2024</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Form and Map */}
            <div className="space-y-8">
              {/* Contact Form */}
              <AnimatedSection animation="slideRight" delay={0.3}>
                <ContactForm locale={locale} />
              </AnimatedSection>

              {/* Map Placeholder */}
              <AnimatedSection animation="slideUp" delay={0.5}>
                <div className="bg-white p-6 rounded-2xl shadow-xl">
                  <h3 
                    className="text-xl font-bold mb-4"
                    style={{ color: applyColorValue(contactConfig.colors.heading) }}
                  >
                    {t('contact.location')}
                  </h3>
                  <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center" style={{ color: applyColorValue(contactConfig.colors.text) }}>
                      <MapPinIcon 
                        className="w-12 h-12 mx-auto mb-4"
                        style={{ color: applyColorValue(contactConfig.colors.accent) }}
                      />
                      <p 
                        className="text-lg font-medium mb-2"
                        style={{ color: applyColorValue(contactConfig.colors.heading) }}
                      >
                        {locale === 'ko' ? '지도가 여기에 표시됩니다' : 'Map will be displayed here'}
                      </p>
                      <p className="text-sm">
                        {locale === 'ko' 
                          ? 'Google Maps 또는 Naver Map 연동 예정' 
                          : 'Google Maps or Naver Map integration coming soon'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Call to Action */}
          <AnimatedSection animation="fadeIn" delay={0.8}>
            <div className="mt-16 text-center bg-white p-8 lg:p-12 rounded-2xl shadow-xl">
              <h3 
                className="text-2xl lg:text-3xl font-bold mb-4"
                style={{ color: applyColorValue(contactConfig.colors.heading) }}
              >
                {t('contact.cta.title')}
              </h3>
              <p 
                className="mb-6 max-w-2xl mx-auto"
                style={{ color: applyColorValue(contactConfig.colors.text) }}
              >
                {t('contact.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="tel:+82-2-1234-5678"
                  className="inline-flex items-center justify-center px-6 py-3 text-white rounded-lg font-medium transition-colors"
                  style={{ 
                    backgroundColor: applyColorValue(contactConfig.colors.accent)
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PhoneIcon className="w-5 h-5 mr-2" />
                  {t('contact.callNow')}
                </motion.a>
                <motion.a
                  href="mailto:info@hyperstone.co.kr"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 rounded-lg font-medium transition-colors"
                  style={{ 
                    borderColor: applyColorValue(contactConfig.colors.accent),
                    color: applyColorValue(contactConfig.colors.accent)
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <EnvelopeIcon className="w-5 h-5 mr-2" />
                  {t('contact.sendEmail')}
                </motion.a>
              </div>
            </div>
          </AnimatedSection>
        </div>
        </section>
      </DynamicBackground>
    </>
  );
}

export default ContactSection;