'use client';

import { useState, useEffect } from 'react';
import { DesignHistoryEntry } from '@/lib/design/types';

interface DesignHistoryProps {
  onRollback: (entryId: string) => void;
  onCompare?: (entry1: DesignHistoryEntry, entry2: DesignHistoryEntry) => void;
}

export default function DesignHistory({ onRollback, onCompare }: DesignHistoryProps) {
  const [entries, setEntries] = useState<DesignHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredEntry, setHoveredEntry] = useState<string | null>(null);
  const [selectedForCompare, setSelectedForCompare] = useState<DesignHistoryEntry[]>([]);
  const [limit] = useState(20);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/design-history?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error('Failed to load history');
      }

      const data = await response.json();
      setEntries(data.entries || []);
      setHasMore(data.pagination?.hasMore || false);
      setError(null);
    } catch (err) {
      console.error('Failed to load history:', err);
      setError('Failed to load design history');
    } finally {
      setLoading(false);
    }
  };

  const handleRollback = async (entry: DesignHistoryEntry) => {
    const confirmed = confirm(
      `Are you sure you want to rollback to the version from ${formatDate(entry.timestamp)}?\n\n` +
      `${entry.description || 'No description'}`
    );

    if (confirmed) {
      onRollback(entry.id);
    }
  };

  const handleCompareToggle = (entry: DesignHistoryEntry) => {
    if (!onCompare) return;

    const isSelected = selectedForCompare.some(e => e.id === entry.id);
    
    if (isSelected) {
      setSelectedForCompare(selectedForCompare.filter(e => e.id !== entry.id));
    } else {
      if (selectedForCompare.length >= 2) {
        // Replace the oldest selection
        setSelectedForCompare([selectedForCompare[1], entry]);
      } else {
        setSelectedForCompare([...selectedForCompare, entry]);
      }
    }
  };

  const handleCompare = () => {
    if (selectedForCompare.length === 2 && onCompare) {
      onCompare(selectedForCompare[0], selectedForCompare[1]);
    }
  };

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

  const getRelativeTime = (timestamp: string) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return formatDate(timestamp);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-600">Loading history...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-red-600 text-center">{error}</div>
        <button
          onClick={loadHistory}
          className="mt-4 mx-auto block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Design History</h3>
            <p className="text-sm text-gray-600 mt-1">
              View and restore previous design configurations
            </p>
          </div>
          <div className="flex gap-2">
            {onCompare && selectedForCompare.length === 2 && (
              <button
                onClick={handleCompare}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
              >
                Compare Selected
              </button>
            )}
            <button
              onClick={loadHistory}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              title="Refresh history"
            >
              🔄
            </button>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="divide-y divide-gray-200">
        {entries.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No history entries found. Changes will appear here after you save.
          </div>
        ) : (
          entries.map((entry) => {
            const isHovered = hoveredEntry === entry.id;
            const isSelected = selectedForCompare.some(e => e.id === entry.id);

            return (
              <div
                key={entry.id}
                className={`p-4 transition-colors ${
                  isHovered ? 'bg-gray-50' : ''
                } ${isSelected ? 'bg-blue-50' : ''}`}
                onMouseEnter={() => setHoveredEntry(entry.id)}
                onMouseLeave={() => setHoveredEntry(null)}
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Entry Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      {onCompare && (
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleCompareToggle(entry)}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          title="Select for comparison"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">
                            {getRelativeTime(entry.timestamp)}
                          </span>
                          <span className="text-xs text-gray-500">
                            by {entry.author}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {formatDate(entry.timestamp)}
                        </div>
                      </div>
                    </div>

                    {entry.description && (
                      <p className="text-sm text-gray-700 mt-2 ml-7">
                        {entry.description}
                      </p>
                    )}

                    {/* Preview on hover */}
                    {isHovered && (
                      <div className="mt-3 ml-7 p-3 bg-gray-100 rounded-lg text-xs">
                        <div className="font-medium text-gray-700 mb-2">Preview:</div>
                        <div className="space-y-1 text-gray-600">
                          <div>Version: {entry.settings.version}</div>
                          <div>
                            Sections: {Object.keys(entry.settings.sections).length}
                          </div>
                          <div>
                            Products: {Object.keys(entry.settings.productDetails).length}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRollback(entry)}
                      className="px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
                      title="Rollback to this version"
                    >
                      Rollback
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="p-4 border-t border-gray-200 text-center">
          <button
            onClick={loadHistory}
            className="text-sm text-primary hover:text-primary-dark font-medium"
          >
            Load more history
          </button>
        </div>
      )}
    </div>
  );
}
