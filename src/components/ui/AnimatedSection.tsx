'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { cn } from '@/lib/utils';

export interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

const AnimatedSection = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 0.6,
  className,
  threshold = 0.1,
  triggerOnce = true,
}: AnimatedSectionProps) => {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  
  // Optimize intersection observer options
  const intersectionOptions = useMemo(() => ({
    amount: threshold,
    once: triggerOnce,
    // Reduce frequency of intersection checks for better performance
    rootMargin: '0px 0px -10% 0px'
  }), [threshold, triggerOnce]);
  
  const isInView = useInView(ref, intersectionOptions);

  // Memoize animations to prevent recreation on every render
  const animations = useMemo(() => ({
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    slideUp: {
      initial: { opacity: 0, y: shouldReduceMotion ? 0 : 50 },
      animate: { opacity: 1, y: 0 },
    },
    slideLeft: {
      initial: { opacity: 0, x: shouldReduceMotion ? 0 : 50 },
      animate: { opacity: 1, x: 0 },
    },
    slideRight: {
      initial: { opacity: 0, x: shouldReduceMotion ? 0 : -50 },
      animate: { opacity: 1, x: 0 },
    },
    scaleIn: {
      initial: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 },
      animate: { opacity: 1, scale: 1 },
    },
  }), [shouldReduceMotion]);

  const selectedAnimation = animations[animation];

  // Optimize transition settings for performance
  const transition = useMemo(() => ({
    duration: shouldReduceMotion ? 0.2 : duration,
    delay: shouldReduceMotion ? 0 : delay,
  }), [shouldReduceMotion, duration, delay]);

  return (
    <motion.div
      ref={ref}
      initial={selectedAnimation.initial}
      animate={isInView ? selectedAnimation.animate : selectedAnimation.initial}
      transition={transition}
      className={cn(className)}
      // Enable hardware acceleration
      style={{ 
        willChange: isInView ? 'auto' : 'transform, opacity',
        transform: 'translateZ(0)' // Force hardware acceleration
      }}
    >
      {children}
    </motion.div>
  );
};

export { AnimatedSection };