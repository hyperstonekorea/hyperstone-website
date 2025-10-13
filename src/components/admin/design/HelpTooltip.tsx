'use client';

import React, { useState } from 'react';
import { getHelpContent } from '@/lib/design/inline-help';

interface HelpTooltipProps {
  helpKey: string;
  children?: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

/**
 * HelpTooltip Component
 * 
 * Displays contextual help information when user hovers over or clicks
 * the help icon. Uses inline-help.ts for content.
 * 
 * @example
 * <HelpTooltip helpKey="background.color">
 *   <label>Background Color</label>
 * </HelpTooltip>
 */
export function HelpTooltip({ 
  helpKey, 
  children, 
  position = 'top',
  className = '' 
}: HelpTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const helpContent = getHelpContent(helpKey);
  
  if (!helpContent) {
    // No help content available, just render children
    return <>{children}</>;
  }
  
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };
  
  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-900 border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-900 border-t-transparent border-b-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-gray-900 border-t-transparent border-b-transparent border-l-transparent',
  };
  
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {children}
      
      <div className="relative inline-block">
        <button
          type="button"
          className="inline-flex items-center justify-center w-5 h-5 text-xs text-gray-500 hover:text-gray-700 transition-colors rounded-full border border-gray-300 hover:border-gray-400"
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
          onClick={() => setIsVisible(!isVisible)}
          aria-label="Help"
        >
          ?
        </button>
        
        {isVisible && (
          <div
            className={`absolute z-50 w-72 ${positionClasses[position]}`}
            role="tooltip"
          >
            <div className="bg-gray-900 text-white text-sm rounded-lg shadow-lg p-4">
              <div className="font-semibold mb-2">{helpContent.title}</div>
              <div className="text-gray-200 mb-2">{helpContent.description}</div>
              {helpContent.example && (
                <div className="text-xs text-gray-400 mt-2 pt-2 border-t border-gray-700">
                  <span className="font-medium">Example:</span> {helpContent.example}
                </div>
              )}
              {helpContent.link && (
                <a
                  href={helpContent.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:text-blue-300 mt-2 inline-block"
                >
                  Learn more →
                </a>
              )}
            </div>
            
            {/* Arrow */}
            <div
              className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`}
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Inline help text without icon
 * Displays help text directly below a form field
 */
export function HelpText({ helpKey, className = '' }: { helpKey: string; className?: string }) {
  const helpContent = getHelpContent(helpKey);
  
  if (!helpContent) {
    return null;
  }
  
  return (
    <p className={`text-sm text-gray-600 mt-1 ${className}`}>
      {helpContent.description}
      {helpContent.example && (
        <span className="block text-xs text-gray-500 mt-1">
          Example: {helpContent.example}
        </span>
      )}
    </p>
  );
}

/**
 * Help icon only (no children)
 * Can be placed anywhere independently
 */
export function HelpIcon({ helpKey, position = 'top', className = '' }: Omit<HelpTooltipProps, 'children'>) {
  return (
    <HelpTooltip helpKey={helpKey} position={position} className={className} />
  );
}
