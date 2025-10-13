# Migration Utility Implementation Guide

## Overview

The migration utility has been successfully implemented for the admin design system. This guide explains how to integrate it into the admin dashboard.

## What Was Implemented

### 1. Core Migration Logic (`src/lib/design/migration.ts`)

- **`migrateDesignSettings()`**: Main migration function
  - Detects current version
  - Creates automatic backup
  - Transforms old settings to new schema
  - Updates version tracking
  - Saves migration metadata

- **`restoreFromBackup()`**: Rollback functionality
  - Restores settings from backup
  - Creates history entry for rollback

- **`getMigrationMetadata()`**: Get migration history
- **`listBackups()`**: List available backups

### 2. API Endpoints (`src/app/api/admin/design-settings/migrate/route.ts`)

- **POST** `/api/admin/design-settings/migrate`
  - Action: `migrate` - Run migration
  - Action: `restore` - Restore from backup
  - Requires admin authentication

- **GET** `/api/admin/design-settings/migrate`
  - Get migration status and metadata
  - List available backups

### 3. UI Component (`src/components/admin/design/MigrationUtility.tsx`)

- Displays migration status
- Shows migration metadata
- Lists available backups
- Provides "Run Migration" button
- Provides "Restore" buttons for backups
- Shows success/error messages
- Handles loading states

### 4. Documentation

- **`MIGRATION_README.md`**: Comprehensive migration documentation
- **`migration.test.md`**: Test plan and test cases
- Updated main `README.md` with migration info

## Integration Steps

### Step 1: Add to Admin Dashboard

Open `src/app/admin/page.tsx` and add the MigrationUtility component:

```tsx
import MigrationUtility from '@/components/admin/design/MigrationUtility';

export default function AdminPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Add Migration Utility */}
      <div className="mb-8">
        <MigrationUtility />
      </div>
      
      {/* Other admin components */}
      <DesignSystemManager />
    </div>
  );
}
```

### Step 2: Add to DesignSystemManager (Optional)

If you want to integrate it into the design system manager, add it as a tab:

```tsx
// In DesignSystemManager.tsx
import MigrationUtility from './MigrationUtility';

// Add to tabs
const tabs = [
  { id: 'sections', label: 'Sections' },
  { id: 'cards', label: 'Product Cards' },
  { id: 'products', label: 'Product Details' },
  { id: 'history', label: 'History' },
  { id: 'migration', label: 'Migration' }, // New tab
];

// In render
{activeTab === 'migration' && <MigrationUtility />}
```

### Step 3: Run Initial Migration

After deployment, run the migration to initialize settings:

1. Navigate to admin dashboard
2. Find the Migration Utility section
3. Click "Run Migration"
4. Confirm the action
5. Wait for completion
6. Verify success message

## Features

### Automatic Backup

- Backup created before every migration
- Stored in Vercel KV with 30-day TTL
- Backup ID returned for reference
- Can restore from backup at any time

### Version Tracking

- Current version: `1.0.0`
- Legacy version: `0.0.0`
- Migration metadata saved with:
  - From/to versions
  - Timestamp
  - Backup ID
  - Migration type

### Legacy Format Support

The migration utility can transform these legacy formats:

```typescript
// Old ContentManager format
{
  sections: {
    hero: {
      backgroundImage: '/images/hero.jpg',
      backgroundColor: '#667eea'
    }
  },
  colors: {
    primary: '#667eea',
    text: '#111827'
  },
  fonts: {
    heading: 'Arial',
    body: 'Helvetica'
  }
}
```

Transforms to:

```typescript
// New design system format
{
  version: '1.0.0',
  sections: {
    hero: {
      background: {
        type: 'image',
        value: '/images/hero.jpg'
      },
      colors: {
        accent: { value: '#667eea' },
        text: { value: '#111827' }
      },
      fonts: {
        heading: {
          family: 'Arial',
          source: 'system',
          weight: 700,
          size: { mobile: '2rem', tablet: '3rem', desktop: '4rem' }
        }
      }
    }
  }
}
```

## API Usage Examples

### Trigger Migration

```bash
curl -X POST https://your-domain.com/api/admin/design-settings/migrate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{"action": "migrate"}'
```

### Get Migration Status

```bash
curl https://your-domain.com/api/admin/design-settings/migrate \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### Restore from Backup

```bash
curl -X POST https://your-domain.com/api/admin/design-settings/migrate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{"action": "restore", "backupId": "1234567890-abc123"}'
```

## Programmatic Usage

```typescript
import {
  migrateDesignSettings,
  restoreFromBackup,
  getMigrationMetadata,
} from '@/lib/design';

// Run migration
const result = await migrateDesignSettings('admin');
console.log(result.message);
console.log('Backup ID:', result.backupId);

// Get status
const metadata = await getMigrationMetadata();
console.log('Last migration:', metadata?.lastMigration);

// Restore
if (result.backupId) {
  await restoreFromBackup(result.backupId, 'admin');
}
```

## Testing

### Manual Testing

1. **Test Initial Setup**:
   - Clear design settings from Vercel KV
   - Run migration
   - Verify defaults are created

2. **Test Legacy Migration**:
   - Add legacy format settings to KV
   - Run migration
   - Verify transformation

3. **Test Backup/Restore**:
   - Run migration (creates backup)
   - Make changes to settings
   - Restore from backup
   - Verify settings restored

4. **Test UI**:
   - Load admin dashboard
   - Verify migration status displays
   - Click "Run Migration"
   - Verify success message
   - Check backup list

### Automated Testing

See `src/lib/design/__tests__/migration.test.md` for comprehensive test plan.

## Troubleshooting

### Migration Not Running

**Problem**: Migration button doesn't work

**Solutions**:
- Check browser console for errors
- Verify admin authentication
- Check Vercel KV configuration
- Review API endpoint logs

### Backup Not Created

**Problem**: No backup ID returned

**Solutions**:
- Check Vercel KV storage limits
- Verify KV credentials
- Check backup expiration settings
- Review error logs

### Settings Not Applied

**Problem**: Migrated settings don't appear

**Solutions**:
- Clear browser cache
- Check cache invalidation
- Verify settings saved to KV
- Review API response

### Rollback Failed

**Problem**: Cannot restore from backup

**Solutions**:
- Verify backup ID is correct
- Check backup hasn't expired (30 days)
- Ensure backup exists in KV
- Try manual restore from export

## Best Practices

### Before Migration

1. ✅ Export current settings as JSON backup
2. ✅ Test in development environment first
3. ✅ Review current customizations
4. ✅ Document any special configurations

### After Migration

1. ✅ Verify all sections look correct
2. ✅ Test design controls functionality
3. ✅ Review migration metadata
4. ✅ Save backup ID for reference
5. ✅ Test on different devices

### Production Deployment

1. ✅ Deploy migration code first
2. ✅ Run migration during low-traffic period
3. ✅ Monitor for errors
4. ✅ Keep backup ID accessible
5. ✅ Have rollback plan ready

## Future Enhancements

When adding new versions (e.g., v2.0.0):

1. Add version to `MIGRATION_VERSIONS`
2. Create migration function (e.g., `migrateV1ToV2`)
3. Update version check logic
4. Add tests for new migration path
5. Update documentation

Example:

```typescript
// In migration.ts
export const MIGRATION_VERSIONS = {
  LEGACY: '0.0.0',
  V1_0_0: '1.0.0',
  V2_0_0: '2.0.0', // New version
  CURRENT: '2.0.0',
} as const;

async function migrateV1ToV2(v1: DesignSettings): Promise<DesignSettings> {
  // Add new fields
  // Transform existing data
  // Return v2 format
}
```

## Support

For issues or questions:

1. Check error logs in browser console
2. Review migration metadata
3. Export current settings for analysis
4. Check Vercel KV dashboard
5. Review API endpoint logs

## Summary

The migration utility is now ready to use! It provides:

- ✅ Automatic backup before migration
- ✅ Version tracking and metadata
- ✅ Rollback capability
- ✅ UI for easy management
- ✅ API endpoints for automation
- ✅ Comprehensive documentation
- ✅ Error handling and validation

Next steps:
1. Integrate into admin dashboard
2. Run initial migration
3. Test functionality
4. Monitor for issues
