'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';
import DynamicBackground from '@/components/ui/DynamicBackground';
import { useOptimizedAnimation, optimizedVariants } from '@/hooks/useOptimizedAnimation';
import { Locale } from '@/types';

interface HeroSectionProps {
  locale: Locale;
}

export function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations();
  const { config: animationConfig, styles: hardwareAcceleration, isMobile } = useOptimizedAnimation({
    duration: 1.2,
    ease: "easeOut"
  });

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <DynamicBackground 
      sectionId="hero"
      className="min-h-screen flex items-center justify-center overflow-hidden"
      fallbackConfig={{
        backgroundType: 'color',
        backgroundValue: 'linear-gradient(135deg, #0082FB 0%, #0064E0 100%)',
        opacity: 100,
        tone: 'dark'
      }}
    >
      <section id="hero" className="relative w-full h-full flex items-center justify-center">
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <AnimatedSection animation="fadeIn" delay={0.2}>
          <motion.div
            variants={isMobile ? optimizedVariants.mobileScale : optimizedVariants.scaleIn}
            initial="initial"
            animate="animate"
            transition={{
              duration: animationConfig.duration,
              ease: animationConfig.ease as any,
              delay: animationConfig.delay
            }}
            className="mb-8"
            style={hardwareAcceleration}
          >
            <h1 className={`font-bold text-white mb-4 tracking-tight ${
              isMobile ? 'text-4xl' : 'text-6xl lg:text-8xl'
            }`}>
              HYPERSTONE
            </h1>
            <div className="w-24 h-1 bg-white mx-auto mb-6 rounded-full" />
          </motion.div>
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={0.6}>
          <h2 className={`font-light text-white/90 mb-6 max-w-4xl mx-auto leading-relaxed ${
            isMobile ? 'text-lg' : 'text-2xl lg:text-4xl'
          }`}>
            {t('hero.subtitle')}
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={0.9}>
          <p className={`text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed ${
            isMobile ? 'text-base mb-8' : 'text-lg lg:text-xl mb-12'
          }`}>
            {t('hero.description')}
          </p>
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={1.2}>
          <div className={`flex gap-4 justify-center items-center ${
            isMobile ? 'flex-col mb-12' : 'flex-col sm:flex-row mb-16'
          }`}>
            <Button 
              variant="primary" 
              size={isMobile ? "md" : "lg"}
              className={`bg-white text-[#0082FB] hover:bg-white/90 hover:text-[#0064E0] shadow-2xl ${
                isMobile ? 'w-full max-w-xs' : ''
              }`}
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('products.title')}
            </Button>
            <Button 
              variant="outline" 
              size={isMobile ? "md" : "lg"}
              className={`border-white text-white hover:bg-white hover:text-[#0082FB] ${
                isMobile ? 'w-full max-w-xs' : ''
              }`}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('contact.title')}
            </Button>
          </div>
        </AnimatedSection>

        {/* Scroll indicator */}
        <AnimatedSection animation="fadeIn" delay={1.5}>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
            onClick={scrollToNext}
          >
            <div className="flex flex-col items-center text-white/70 hover:text-white transition-colors">
              <span className="text-sm mb-2 font-medium">
                {t('hero.scrollDown')}
              </span>
              <ChevronDownIcon className="w-6 h-6" />
            </div>
          </motion.div>
        </AnimatedSection>
      </div>

      {/* Floating elements for visual interest - optimized for performance */}
      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear",
              repeatType: "loop"
            }}
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full"
            style={{ 
              ...hardwareAcceleration,
              willChange: 'transform'
            }}
          />
          <motion.div
            animate={{ 
              x: [0, -80, 0],
              y: [0, 100, 0],
              rotate: [0, -180, -360]
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear",
              repeatType: "loop"
            }}
            className="absolute top-3/4 right-1/3 w-3 h-3 bg-white/15 rounded-full"
            style={{ 
              ...hardwareAcceleration,
              willChange: 'transform'
            }}
          />
          <motion.div
            animate={{ 
              x: [0, 60, 0],
              y: [0, -80, 0],
              rotate: [0, 90, 180]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              ease: "linear",
              repeatType: "loop"
            }}
            className="absolute top-1/2 right-1/4 w-1 h-1 bg-white/25 rounded-full"
            style={{ 
              ...hardwareAcceleration,
              willChange: 'transform'
            }}
          />
        </div>
      )}
      </section>
    </DynamicBackground>
  );
}

export default HeroSection;