'use client';

import { useState, useEffect, useMemo } from 'react';
import { Variants } from 'framer-motion';

interface AnimationConfig {
  duration: number;
  ease: number[] | string;
  stagger?: number;
  delay?: number;
}

interface OptimizedAnimationHook {
  config: AnimationConfig;
  styles: React.CSSProperties;
  isMobile: boolean;
  shouldReduceMotion: boolean;
}

interface UseOptimizedAnimationProps {
  duration?: number;
  ease?: string | number[];
  stagger?: number;
  delay?: number;
  respectMotionPreference?: boolean;
}

// Predefined optimized animation variants
export const optimizedVariants: Record<string, Variants> = {
  fadeIn: {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth animation
      }
    }
  },
  
  slideUp: {
    hidden: { 
      opacity: 0,
      y: 60,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },
  
  slideInLeft: {
    hidden: { 
      opacity: 0,
      x: -60,
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },
  
  slideInRight: {
    hidden: { 
      opacity: 0,
      x: 60,
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },
  
  scaleIn: {
    hidden: { 
      opacity: 0,
      scale: 0.8,
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },
  
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  },
  
  staggerItem: {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },
  
  // Reduced motion variants for accessibility
  reducedMotion: {
    hidden: { 
      opacity: 0,
    },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.2,
      }
    }
  },
  
  // Mobile-optimized variants
  mobileScale: {
    initial: { 
      opacity: 0,
      scale: 0.95,
    },
    animate: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  }
};

export function useOptimizedAnimation({
  duration = 0.6,
  ease = [0.25, 0.46, 0.45, 0.94],
  stagger = 0.1,
  delay = 0,
  respectMotionPreference = true,
}: UseOptimizedAnimationProps = {}): OptimizedAnimationHook {
  // Initialize with SSR-safe defaults
  const [isMobile, setIsMobile] = useState(false);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    // Skip if not in browser
    if (typeof window === 'undefined') return;

    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check for reduced motion preference
    const checkReducedMotion = () => {
      if (respectMotionPreference) {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setShouldReduceMotion(mediaQuery.matches);
        
        const handleChange = (e: MediaQueryListEvent) => {
          setShouldReduceMotion(e.matches);
        };
        
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      }
    };

    checkMobile();
    const cleanup = checkReducedMotion();

    const handleResize = () => {
      checkMobile();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (cleanup) cleanup();
    };
  }, [respectMotionPreference]);

  // Optimize animation config based on device and preferences
  const config = useMemo((): AnimationConfig => {
    if (shouldReduceMotion) {
      return {
        duration: 0.2,
        ease: 'linear',
        stagger: 0,
        delay: 0,
      };
    }

    // Reduce animation complexity on mobile for better performance
    if (isMobile) {
      return {
        duration: Math.max(duration * 0.8, 0.3), // Slightly faster on mobile
        ease: typeof ease === 'string' ? ease : [0.25, 0.46, 0.45, 0.94], // Simpler easing
        stagger: stagger * 0.8, // Faster stagger
        delay: delay * 0.8, // Shorter delay
      };
    }

    return {
      duration,
      ease,
      stagger,
      delay,
    };
  }, [duration, ease, stagger, delay, isMobile, shouldReduceMotion]);

  // Hardware acceleration styles for better performance
  const styles = useMemo((): React.CSSProperties => {
    if (shouldReduceMotion) {
      return {};
    }

    return {
      willChange: 'transform, opacity',
      transform: 'translateZ(0)', // Force hardware acceleration
      backfaceVisibility: 'hidden' as const,
      perspective: 1000,
    };
  }, [shouldReduceMotion]);

  return {
    config,
    styles,
    isMobile,
    shouldReduceMotion,
  };
}