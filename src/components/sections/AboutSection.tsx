'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import DynamicBackground from '@/components/ui/DynamicBackground';
import { useDesignSettings } from '@/hooks/useDesignSettings';
import { applyColorValue, createSectionStyles } from '@/lib/design/apply-styles';
import { Locale } from '@/types';
import { 
  BuildingOffice2Icon, 
  CogIcon, 
  ShieldCheckIcon, 
  TrophyIcon 
} from '@heroicons/react/24/outline';

interface AboutSectionProps {
  locale: Locale;
}

export function AboutSection({ locale }: AboutSectionProps) {
  const t = useTranslations();
  const { settings, loading } = useDesignSettings();
  
  // Get about section design settings
  const aboutConfig = settings.sections.about;

  const features = [
    {
      icon: BuildingOffice2Icon,
      titleKey: 'about.expertise',
      descriptionKey: 'about.expertiseText',
      delay: 0.2
    },
    {
      icon: CogIcon,
      titleKey: 'about.innovation',
      descriptionKey: 'about.innovationText',
      delay: 0.4
    },
    {
      icon: ShieldCheckIcon,
      titleKey: 'about.quality',
      descriptionKey: 'about.qualityText',
      delay: 0.6
    },
    {
      icon: TrophyIcon,
      titleKey: 'about.excellence',
      descriptionKey: 'about.excellenceText',
      delay: 0.8
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  const mapBackgroundType = (type: string): 'video' | 'image' | 'color' => {
    if (type === 'gradient') return 'color';
    if (type === 'video' || type === 'image') return type;
    return 'color';
  };

  return (
    <>
      <style jsx>{createSectionStyles('about', aboutConfig)}</style>
      
      <DynamicBackground 
        sectionId="about"
        className="min-h-screen flex items-center justify-center py-20"
        fallbackConfig={{
          backgroundType: mapBackgroundType(aboutConfig.background.type),
          backgroundValue: aboutConfig.background.value,
          opacity: 100,
          tone: 'light'
        }}
      >
        <section id="about" className="relative w-full">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <AnimatedSection animation="slideUp" delay={0.1}>
              <h2 className="section-heading text-5xl lg:text-6xl font-bold mb-6">
                {t('about.title')}
              </h2>
              <div 
                className="w-24 h-1 mx-auto mb-8 rounded-full section-accent"
                style={{ backgroundColor: applyColorValue(aboutConfig.colors.accent) }}
              />
              <p className="section-body text-xl max-w-3xl mx-auto leading-relaxed">
                {t('about.subtitle')}
              </p>
            </AnimatedSection>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            <AnimatedSection animation="slideLeft" delay={0.3}>
              <motion.div 
                className="bg-white p-8 lg:p-12 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 group"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center mb-6">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ 
                      background: `linear-gradient(to bottom right, ${applyColorValue(aboutConfig.colors.accent)}, ${applyColorValue(aboutConfig.colors.heading)})` 
                    }}
                  >
                    <BuildingOffice2Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 
                    className="text-3xl font-bold"
                    style={{ color: applyColorValue(aboutConfig.colors.accent) }}
                  >
                    {t('about.vision')}
                  </h3>
                </div>
                <p className="section-body text-lg leading-relaxed">
                  {t('about.visionText')}
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection animation="slideRight" delay={0.5}>
              <motion.div 
                className="bg-white p-8 lg:p-12 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 group"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center mb-6">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ 
                      background: `linear-gradient(to bottom right, ${applyColorValue(aboutConfig.colors.heading)}, ${applyColorValue(aboutConfig.colors.accent)})` 
                    }}
                  >
                    <TrophyIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 
                    className="text-3xl font-bold"
                    style={{ color: applyColorValue(aboutConfig.colors.accent) }}
                  >
                    {t('about.mission')}
                  </h3>
                </div>
                <p className="section-body text-lg leading-relaxed">
                  {t('about.missionText')}
                </p>
              </motion.div>
            </AnimatedSection>
          </div>

          {/* Core Values Grid */}
          <AnimatedSection animation="slideUp" delay={0.7}>
            <div className="text-center mb-12">
              <h3 className="section-heading text-3xl lg:text-4xl font-bold mb-4">
                {t('about.coreValues')}
              </h3>
              <p className="section-body text-lg max-w-2xl mx-auto">
                {t('about.coreValuesText')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <AnimatedSection 
                  key={feature.titleKey} 
                  animation="slideUp" 
                  delay={feature.delay}
                >
                  <motion.div
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group cursor-pointer"
                    whileHover={{ 
                      y: -8,
                      scale: 1.02
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                      style={{ 
                        background: `linear-gradient(to bottom right, ${applyColorValue(aboutConfig.colors.accent)}, ${applyColorValue(aboutConfig.colors.heading)})` 
                      }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h4 
                      className="text-xl font-semibold mb-3 transition-colors section-heading"
                      style={{ 
                        color: applyColorValue(aboutConfig.colors.heading)
                      }}
                    >
                      {t(feature.titleKey)}
                    </h4>
                    <p className="section-body text-sm leading-relaxed">
                      {t(feature.descriptionKey)}
                    </p>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Company Stats */}
          <AnimatedSection animation="fadeIn" delay={1.0}>
            <div 
              className="mt-20 rounded-2xl p-8 lg:p-12 text-white"
              style={{ 
                background: `linear-gradient(to right, ${applyColorValue(aboutConfig.colors.accent)}, ${applyColorValue(aboutConfig.colors.heading)})` 
              }}
            >
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-4xl lg:text-5xl font-bold mb-2">
                    {t('about.stats.experience')}
                  </div>
                  <div className="text-lg opacity-90">
                    {t('about.stats.experienceLabel')}
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-4xl lg:text-5xl font-bold mb-2">
                    {t('about.stats.projects')}
                  </div>
                  <div className="text-lg opacity-90">
                    {t('about.stats.projectsLabel')}
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-4xl lg:text-5xl font-bold mb-2">
                    {t('about.stats.satisfaction')}
                  </div>
                  <div className="text-lg opacity-90">
                    {t('about.stats.satisfactionLabel')}
                  </div>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>
        </div>
        </section>
      </DynamicBackground>
    </>
  );
}

export default AboutSection;