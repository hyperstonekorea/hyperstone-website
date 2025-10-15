/**
 * BrandText Component
 * 
 * Automatically applies brand-specific fonts to HYPERSTONE and DULITE text
 */

import React from 'react';

interface BrandTextProps {
  children: string;
  className?: string;
}

export function BrandText({ children, className = '' }: BrandTextProps) {
  // Split text and wrap brand names with appropriate styling
  const processText = (text: string) => {
    const parts: (string | React.ReactElement)[] = [];
    let lastIndex = 0;
    
    // Match HYPERSTONE (case-insensitive)
    const hyperstoneRegex = /HYPERSTONE/gi;
    const duliteRegex = /DULITE/gi;
    
    // Combine all matches and sort by position
    const matches: Array<{ index: number; text: string; type: 'hyperstone' | 'dulite' }> = [];
    
    let match;
    while ((match = hyperstoneRegex.exec(text)) !== null) {
      matches.push({ index: match.index, text: match[0], type: 'hyperstone' });
    }
    
    while ((match = duliteRegex.exec(text)) !== null) {
      matches.push({ index: match.index, text: match[0], type: 'dulite' });
    }
    
    // Sort by position
    matches.sort((a, b) => a.index - b.index);
    
    // Build the result
    matches.forEach((match, idx) => {
      // Add text before this match
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      // Add the styled brand name
      if (match.type === 'hyperstone') {
        parts.push(
          <span key={`hyperstone-${idx}`} className="brand-hyperstone">
            {match.text}
          </span>
        );
      } else {
        parts.push(
          <span key={`dulite-${idx}`} className="brand-dulite">
            {match.text}
          </span>
        );
      }
      
      lastIndex = match.index + match.text.length;
    });
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts.length > 0 ? parts : text;
  };
  
  return <span className={className}>{processText(children)}</span>;
}
