'use client';

import { useState } from 'react';
import { DesignHistoryEntry, DesignSettings } from '@/lib/design/types';

interface HistoryComparisonProps {
  entry1: DesignHistoryEntry;
  entry2: DesignHistoryEntry;
  onClose: () => void;
  onRollback?: (entryId: string) => void;
}

type DiffType = 'added' | 'removed' | 'modified' | 'unchanged';

interface Difference {
  path: string;
  type: DiffType;
  oldValue?: any;
  newValue?: any;
}

export default function HistoryComparison({ entry1, entry2, onClose, onRollback }: HistoryComparisonProps) {
  const [viewMode, setViewMode] = useState<'side-by-side' | 'unified'>('side-by-side');
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(true);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const findDifferences = (obj1: any, obj2: any, path: string = ''): Difference[] => {
    const differences: Difference[] = [];

    // Handle primitive types
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
      if (obj1 !== obj2) {
        differences.push({
          path,
          type: 'modified',
          oldValue: obj1,
          newValue: obj2
        });
      }
      return differences;
    }

    // Get all keys from both objects
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const allKeys = new Set([...keys1, ...keys2]);

    allKeys.forEach(key => {
      const newPath = path ? `${path}.${key}` : key;
      const hasKey1 = key in obj1;
      const hasKey2 = key in obj2;

      if (!hasKey1 && hasKey2) {
        differences.push({
          path: newPath,
          type: 'added',
          newValue: obj2[key]
        });
      } else if (hasKey1 && !hasKey2) {
        differences.push({
          path: newPath,
          type: 'removed',
          oldValue: obj1[key]
        });
      } else {
        // Both have the key, check for differences
        const nestedDiffs = findDifferences(obj1[key], obj2[key], newPath);
        differences.push(...nestedDiffs);
      }
    });

    return differences;
  };

  const differences = findDifferences(entry1.settings, entry2.settings);
  const displayDifferences = showOnlyDifferences 
    ? differences.filter(d => d.type !== 'unchanged')
    : differences;

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return 'null';
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    return String(value);
  };

  const getDiffColor = (type: DiffType): string => {
    switch (type) {
      case 'added': return 'bg-green-50 border-green-200';
      case 'removed': return 'bg-red-50 border-red-200';
      case 'modified': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getDiffIcon = (type: DiffType): string => {
    switch (type) {
      case 'added': return '➕';
      case 'removed': return '➖';
      case 'modified': return '✏️';
      default: return '•';
    }
  };

  const getDiffLabel = (type: DiffType): string => {
    switch (type) {
      case 'added': return 'Added';
      case 'removed': return 'Removed';
      case 'modified': return 'Modified';
      default: return 'Unchanged';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Compare Versions</h2>
              <p className="text-sm text-gray-600 mt-1">
                Comparing changes between two design configurations
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('side-by-side')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'side-by-side'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Side by Side
              </button>
              <button
                onClick={() => setViewMode('unified')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'unified'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Unified
              </button>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={showOnlyDifferences}
                onChange={(e) => setShowOnlyDifferences(e.target.checked)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              Show only differences
            </label>

            <div className="ml-auto text-sm text-gray-600">
              {displayDifferences.length} {displayDifferences.length === 1 ? 'change' : 'changes'}
            </div>
          </div>
        </div>

        {/* Version Info */}
        <div className="grid grid-cols-2 gap-4 p-6 bg-gray-50 border-b border-gray-200">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-xs font-medium text-gray-500 mb-1">Version A (Older)</div>
            <div className="text-sm font-semibold text-gray-900">{formatDate(entry1.timestamp)}</div>
            <div className="text-xs text-gray-600 mt-1">by {entry1.author}</div>
            {entry1.description && (
              <div className="text-xs text-gray-700 mt-2 italic">{entry1.description}</div>
            )}
            {onRollback && (
              <button
                onClick={() => onRollback(entry1.id)}
                className="mt-3 w-full px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-xs font-medium"
              >
                Rollback to this version
              </button>
            )}
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-xs font-medium text-gray-500 mb-1">Version B (Newer)</div>
            <div className="text-sm font-semibold text-gray-900">{formatDate(entry2.timestamp)}</div>
            <div className="text-xs text-gray-600 mt-1">by {entry2.author}</div>
            {entry2.description && (
              <div className="text-xs text-gray-700 mt-2 italic">{entry2.description}</div>
            )}
            {onRollback && (
              <button
                onClick={() => onRollback(entry2.id)}
                className="mt-3 w-full px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-xs font-medium"
              >
                Rollback to this version
              </button>
            )}
          </div>
        </div>

        {/* Differences */}
        <div className="flex-1 overflow-y-auto p-6">
          {displayDifferences.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No differences found between these versions
            </div>
          ) : (
            <div className="space-y-3">
              {viewMode === 'side-by-side' ? (
                // Side by Side View
                displayDifferences.map((diff, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg overflow-hidden ${getDiffColor(diff.type)}`}
                  >
                    <div className="px-4 py-2 bg-white bg-opacity-50 border-b border-current border-opacity-20">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getDiffIcon(diff.type)}</span>
                        <span className="text-xs font-medium text-gray-700">
                          {getDiffLabel(diff.type)}
                        </span>
                        <span className="text-xs text-gray-600 font-mono">{diff.path}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-current divide-opacity-20">
                      <div className="p-3">
                        <div className="text-xs font-medium text-gray-500 mb-1">Version A</div>
                        <pre className="text-xs text-gray-800 whitespace-pre-wrap break-words">
                          {diff.oldValue !== undefined ? formatValue(diff.oldValue) : '—'}
                        </pre>
                      </div>
                      <div className="p-3">
                        <div className="text-xs font-medium text-gray-500 mb-1">Version B</div>
                        <pre className="text-xs text-gray-800 whitespace-pre-wrap break-words">
                          {diff.newValue !== undefined ? formatValue(diff.newValue) : '—'}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // Unified View
                displayDifferences.map((diff, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 ${getDiffColor(diff.type)}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-lg flex-shrink-0">{getDiffIcon(diff.type)}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-gray-700">
                            {getDiffLabel(diff.type)}
                          </span>
                          <span className="text-xs text-gray-600 font-mono">{diff.path}</span>
                        </div>
                        {diff.type === 'modified' && (
                          <div className="space-y-2">
                            <div>
                              <div className="text-xs font-medium text-red-700 mb-1">- Old:</div>
                              <pre className="text-xs text-gray-800 whitespace-pre-wrap break-words bg-white bg-opacity-50 p-2 rounded">
                                {formatValue(diff.oldValue)}
                              </pre>
                            </div>
                            <div>
                              <div className="text-xs font-medium text-green-700 mb-1">+ New:</div>
                              <pre className="text-xs text-gray-800 whitespace-pre-wrap break-words bg-white bg-opacity-50 p-2 rounded">
                                {formatValue(diff.newValue)}
                              </pre>
                            </div>
                          </div>
                        )}
                        {diff.type === 'added' && (
                          <pre className="text-xs text-gray-800 whitespace-pre-wrap break-words bg-white bg-opacity-50 p-2 rounded">
                            {formatValue(diff.newValue)}
                          </pre>
                        )}
                        {diff.type === 'removed' && (
                          <pre className="text-xs text-gray-800 whitespace-pre-wrap break-words bg-white bg-opacity-50 p-2 rounded">
                            {formatValue(diff.oldValue)}
                          </pre>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
