'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, href, asChild = false, ...props }, ref) => {
    const { deviceInfo, touchOptimizations, performanceOptimizations } = useMobileOptimization();
    
    const baseStyles = cn(
      'inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      // Mobile optimizations
      deviceInfo.isTouchDevice && 'touch-manipulation',
      performanceOptimizations.shouldReduceAnimations ? 'duration-100' : 'duration-200'
    );
    
    const variants = {
      primary: cn(
        'bg-brand-primary text-white hover:bg-brand-secondary shadow-lg',
        !performanceOptimizations.shouldReduceAnimations && 'hover:shadow-xl transform hover:-translate-y-0.5'
      ),
      secondary: cn(
        'bg-brand-secondary text-white hover:bg-brand-primary shadow-lg',
        !performanceOptimizations.shouldReduceAnimations && 'hover:shadow-xl transform hover:-translate-y-0.5'
      ),
      outline: 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white',
      ghost: 'text-brand-primary hover:bg-brand-light hover:text-brand-secondary',
    };

    // Mobile-optimized sizes with minimum touch targets
    const sizes = {
      sm: cn(
        'px-4 py-2 text-sm',
        deviceInfo.isMobile ? 'h-12 min-w-[44px]' : 'h-9' // Ensure 44px minimum on mobile
      ),
      md: cn(
        'px-6 py-3 text-base',
        deviceInfo.isMobile ? 'h-12 min-w-[44px]' : 'h-11'
      ),
      lg: cn(
        'px-8 py-4 text-lg',
        deviceInfo.isMobile ? 'h-14 min-w-[44px]' : 'h-14'
      ),
    };

    const buttonClasses = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    );

    // Mobile-specific styles
    const mobileStyles = deviceInfo.isTouchDevice ? {
      WebkitTapHighlightColor: 'transparent',
      touchAction: 'manipulation' as const,
      minHeight: touchOptimizations.minTouchTarget,
      fontSize: deviceInfo.isMobile ? touchOptimizations.preventZoom.fontSize : undefined
    } : {};

    if (href && !asChild) {
      return (
        <a
          href={href}
          className={buttonClasses}
          style={mobileStyles}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        className={buttonClasses}
        style={mobileStyles}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };