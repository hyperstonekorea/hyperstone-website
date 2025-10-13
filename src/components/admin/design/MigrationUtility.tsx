/**
 * Migration Utility Component
 * UI for migrating design settings and managing backups
 * Requirements: 1.6
 */

'use client';

import { useState, useEffect } from 'react';

interface MigrationMetadata {
  lastMigration: string;
  fromVersion: string;
  toVersion: string;
  timestamp: string;
  backupId?: string;
}

interface Backup {
  id: string;
  timestamp: string;
}

interface MigrationStatus {
  metadata: MigrationMetadata | null;
  backups: Backup[];
  hasMetadata: boolean;
}

export default function MigrationUtility() {
  const [status, setStatus] = useState<MigrationStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [migrating, setMigrating] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);

  // Load migration status on mount
  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/design-settings/migrate');

      if (!response.ok) {
        throw new Error('Failed to load migration status');
      }

      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error('Failed to load migration status:', error);
      setMessage({
        type: 'error',
        text: 'Failed to load migration status',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMigrate = async () => {
    if (
      !confirm(
        'This will migrate your design settings to the latest version. A backup will be created automatically. Continue?'
      )
    ) {
      return;
    }

    try {
      setMigrating(true);
      setMessage(null);

      const response = await fetch('/api/admin/design-settings/migrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'migrate' }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Migration failed');
      }

      setMessage({
        type: 'success',
        text: data.message,
      });

      // Reload status
      await loadStatus();
    } catch (error) {
      console.error('Migration failed:', error);
      setMessage({
        type: 'error',
        text:
          error instanceof Error ? error.message : 'Migration failed',
      });
    } finally {
      setMigrating(false);
    }
  };

  const handleRestore = async (backupId: string) => {
    if (
      !confirm(
        'This will restore settings from the selected backup. Current settings will be saved to history. Continue?'
      )
    ) {
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const response = await fetch('/api/admin/design-settings/migrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'restore', backupId }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Restore failed');
      }

      setMessage({
        type: 'success',
        text: data.message,
      });

      // Reload status
      await loadStatus();
    } catch (error) {
      console.error('Restore failed:', error);
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Restore failed',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !status) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Migration Utility
        </h3>
        <p className="text-sm text-gray-600">
          Migrate design settings to the latest version or restore from backups
        </p>
      </div>

      {/* Message Display */}
      {message && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : message.type === 'error'
              ? 'bg-red-50 text-red-800 border border-red-200'
              : 'bg-blue-50 text-blue-800 border border-blue-200'
          }`}
        >
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}

      {/* Migration Status */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Current Status
        </h4>

        {status?.hasMetadata && status.metadata ? (
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Last Migration:</span>
              <span className="font-medium text-gray-900">
                {status.metadata.lastMigration}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">From Version:</span>
              <span className="font-medium text-gray-900">
                {status.metadata.fromVersion}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">To Version:</span>
              <span className="font-medium text-gray-900">
                {status.metadata.toVersion}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Timestamp:</span>
              <span className="font-medium text-gray-900">
                {new Date(status.metadata.timestamp).toLocaleString()}
              </span>
            </div>
            {status.metadata.backupId && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Backup ID:</span>
                <span className="font-mono text-xs text-gray-900">
                  {status.metadata.backupId}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              No migration has been performed yet. Settings may need to be
              migrated to the latest version.
            </p>
          </div>
        )}
      </div>

      {/* Migration Action */}
      <div className="mb-6">
        <button
          onClick={handleMigrate}
          disabled={migrating || loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {migrating ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Migrating...
            </span>
          ) : (
            'Run Migration'
          )}
        </button>
        <p className="mt-2 text-xs text-gray-500 text-center">
          A backup will be created automatically before migration
        </p>
      </div>

      {/* Backups List */}
      {status?.backups && status.backups.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Available Backups
          </h4>
          <div className="space-y-2">
            {status.backups.map((backup) => (
              <div
                key={backup.id}
                className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Backup {backup.id.slice(0, 8)}...
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(backup.timestamp).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleRestore(backup.id)}
                  disabled={loading}
                  className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Restore
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h5 className="text-sm font-medium text-blue-900 mb-2">
          About Migration
        </h5>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Automatically creates a backup before migration</li>
          <li>• Transforms old settings to new schema</li>
          <li>• Preserves existing customizations where possible</li>
          <li>• Backups expire after 30 days</li>
          <li>• Version tracking ensures compatibility</li>
        </ul>
      </div>
    </div>
  );
}
