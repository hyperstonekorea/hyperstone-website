'use client';

import { useMemo } from 'react';
import { DesignSettings, ValidationWarning, ValidationError } from '@/lib/design/types';
import { DesignValidator } from '@/lib/design/validator';

interface AccessibilityValidationProps {
  settings: DesignSettings;
}

export default function AccessibilityValidation({ settings }: AccessibilityValidationProps) {
  const validator = useMemo(() => new DesignValidator(), []);

  const validationResult = useMemo(() => {
    return validator.validateSettings(settings);
  }, [settings, validator]);

  const { warnings, errors } = validationResult;

  // Group warnings by type
  const contrastWarnings = warnings.filter(w => w.message.includes('contrast'));
  const fontSizeWarnings = warnings.filter(w => w.message.includes('Font size'));
  const otherWarnings = warnings.filter(w => 
    !w.message.includes('contrast') && !w.message.includes('Font size')
  );

  if (warnings.length === 0 && errors.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 text-2xl">✅</div>
          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-1">
              Accessibility Check Passed
            </h3>
            <p className="text-sm text-green-700">
              Your design settings meet accessibility standards. No issues detected.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 text-2xl">
          {errors.length > 0 ? '❌' : '⚠️'}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Accessibility Validation
          </h3>
          <p className="text-sm text-gray-600">
            {errors.length > 0 
              ? `${errors.length} critical error${errors.length > 1 ? 's' : ''} found`
              : `${warnings.length} warning${warnings.length > 1 ? 's' : ''} found`
            }
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Critical Errors */}
        {errors.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-red-800 flex items-center gap-2">
              <span>🚨</span>
              Critical Errors
            </h4>
            {errors.map((error, index) => (
              <ErrorItem key={index} error={error} />
            ))}
          </div>
        )}

        {/* Contrast Ratio Warnings */}
        {contrastWarnings.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-amber-800 flex items-center gap-2">
              <span>🎨</span>
              Color Contrast Issues ({contrastWarnings.length})
            </h4>
            <p className="text-xs text-gray-600 mb-2">
              WCAG AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.
            </p>
            {contrastWarnings.map((warning, index) => (
              <WarningItem key={index} warning={warning} />
            ))}
          </div>
        )}

        {/* Font Size Warnings */}
        {fontSizeWarnings.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-amber-800 flex items-center gap-2">
              <span>📏</span>
              Font Size Issues ({fontSizeWarnings.length})
            </h4>
            <p className="text-xs text-gray-600 mb-2">
              Minimum recommended sizes: 16px (1rem) for body text, 24px (1.5rem) for headings.
            </p>
            {fontSizeWarnings.map((warning, index) => (
              <WarningItem key={index} warning={warning} />
            ))}
          </div>
        )}

        {/* Other Warnings */}
        {otherWarnings.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-amber-800 flex items-center gap-2">
              <span>ℹ️</span>
              Other Issues ({otherWarnings.length})
            </h4>
            {otherWarnings.map((warning, index) => (
              <WarningItem key={index} warning={warning} />
            ))}
          </div>
        )}

        {/* Accessibility Tips */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <span>💡</span>
            Accessibility Tips
          </h4>
          <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
            <li>Use high contrast between text and background colors</li>
            <li>Ensure font sizes are readable on all devices</li>
            <li>Test your design with screen readers</li>
            <li>Provide alternative text for images</li>
            <li>Use semantic HTML elements</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ErrorItem({ error }: { error: ValidationError }) {
  return (
    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-start gap-2">
        <div className="flex-shrink-0 mt-0.5">
          <span className="text-red-600 font-bold">✕</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-red-900">{error.field}</p>
          <p className="text-sm text-red-700 mt-1">{error.message}</p>
        </div>
      </div>
    </div>
  );
}

function WarningItem({ warning }: { warning: ValidationWarning }) {
  return (
    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
      <div className="flex items-start gap-2">
        <div className="flex-shrink-0 mt-0.5">
          <span className="text-amber-600 font-bold">⚠</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-amber-900">{warning.field}</p>
          <p className="text-sm text-amber-700 mt-1">{warning.message}</p>
          {warning.suggestion && (
            <div className="mt-2 p-2 bg-white rounded border border-amber-300">
              <p className="text-xs font-medium text-amber-900 mb-1">💡 Suggestion:</p>
              <p className="text-xs text-amber-800">{warning.suggestion}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
