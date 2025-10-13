/**
 * API endpoint for design settings migration
 * POST /api/admin/design-settings/migrate
 * Requirements: 1.6
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateAdminAccess } from '@/lib/auth-middleware';
import {
  migrateDesignSettings,
  restoreFromBackup,
  getMigrationMetadata,
  listBackups,
} from '@/lib/design/migration';

/**
 * POST - Trigger migration
 */
export async function POST(request: NextRequest) {
  try {
    // Validate admin access
    const authResult = await validateAdminAccess(request);
    if (!authResult.valid) {
      return authResult.response || NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action, backupId } = body;

    if (action === 'migrate') {
      // Perform migration
      const result = await migrateDesignSettings('admin');

      return NextResponse.json({
        success: result.success,
        message: result.message,
        fromVersion: result.fromVersion,
        toVersion: result.toVersion,
        backupId: result.backupId,
      });
    } else if (action === 'restore' && backupId) {
      // Restore from backup
      const result = await restoreFromBackup(
        backupId,
        'admin'
      );

      return NextResponse.json({
        success: result.success,
        message: result.message,
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid action. Use "migrate" or "restore"' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Migration API error:', error);
    return NextResponse.json(
      {
        error: 'Migration failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET - Get migration status and metadata
 */
export async function GET(request: NextRequest) {
  try {
    // Validate admin access
    const authResult = await validateAdminAccess(request);
    if (!authResult.valid) {
      return authResult.response || NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const metadata = await getMigrationMetadata();
    const backups = await listBackups();

    return NextResponse.json({
      metadata,
      backups,
      hasMetadata: !!metadata,
    });
  } catch (error) {
    console.error('Failed to get migration metadata:', error);
    return NextResponse.json(
      {
        error: 'Failed to get migration metadata',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
