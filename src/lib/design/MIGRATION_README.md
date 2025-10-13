# Design Settings Migration Utility

## Overview

The migration utility provides a safe and automated way to migrate design settings from older formats to the current schema. It includes automatic backup creation, version tracking, and rollback capabilities.

## Features

- **Automatic Backup**: Creates a backup before any migration
- **Version Tracking**: Tracks migration history and versions
- **Rollback Support**: Restore from backups if needed
- **Safe Migration**: Validates settings before and after migration
- **Expiring Backups**: Backups automatically expire after 30 days

## Usage

### Programmatic Usage

```typescript
import { migrateDesignSettings, restoreFromBackup } from '@/lib/design/migration';

// Run migration
const result = await migrateDesignSettings('admin');
console.log(result.message);
console.log('Backup ID:', result.backupId);

// Restore from backup
const restoreResult = await restoreFromBackup(backupId, 'admin');
console.log(restoreResult.message);
```

### API Usage

#### Trigger Migration

```bash
POST /api/admin/design-settings/migrate
Content-Type: application/json

{
  "action": "migrate"
}
```

Response:
```json
{
  "success": true,
  "message": "Successfully migrated from 0.0.0 to 1.0.0",
  "fromVersion": "0.0.0",
  "toVersion": "1.0.0",
  "backupId": "1234567890-abc123"
}
```

#### Restore from Backup

```bash
POST /api/admin/design-settings/migrate
Content-Type: application/json

{
  "action": "restore",
  "backupId": "1234567890-abc123"
}
```

#### Get Migration Status

```bash
GET /api/admin/design-settings/migrate
```

Response:
```json
{
  "metadata": {
    "lastMigration": "legacy-to-v1",
    "fromVersion": "0.0.0",
    "toVersion": "1.0.0",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "backupId": "1234567890-abc123"
  },
  "backups": [
    {
      "id": "1234567890-abc123",
      "timestamp": "2024-01-15T10:30:00.000Z"
    }
  ],
  "hasMetadata": true
}
```

### UI Component Usage

Add the MigrationUtility component to your admin dashboard:

```tsx
import MigrationUtility from '@/components/admin/design/MigrationUtility';

export default function AdminPage() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <MigrationUtility />
    </div>
  );
}
```

## Migration Process

### 1. Detection

The utility automatically detects the current version of settings:
- No version field → Legacy format (0.0.0)
- Version 1.0.0 → Current format (no migration needed)

### 2. Backup Creation

Before any migration:
1. Current settings are saved to a backup key
2. Backup ID is generated with timestamp
3. Backup expires after 30 days
4. Backup ID is returned for potential rollback

### 3. Migration

The migration process:
1. Loads current settings
2. Transforms to new schema based on version
3. Validates migrated settings
4. Updates version number
5. Saves to storage
6. Creates history entry

### 4. Validation

After migration:
- Checks required fields exist
- Validates structure matches schema
- Ensures all sections are present
- Verifies data types are correct

## Legacy Format Support

The utility supports migrating from these legacy formats:

### Old ContentManager Format

```typescript
{
  sections: {
    hero: {
      title: string,
      subtitle: string,
      backgroundImage?: string,
      backgroundColor?: string
    },
    about: {
      title: string,
      description: string,
      backgroundColor?: string
    },
    // ... other sections
  },
  colors: {
    primary?: string,
    secondary?: string,
    accent?: string,
    text?: string,
    background?: string
  },
  fonts: {
    heading?: string,
    body?: string
  }
}
```

### Migration Mapping

| Legacy Field | New Schema Field |
|-------------|------------------|
| `sections.hero.backgroundImage` | `sections.hero.background.value` (type: 'image') |
| `sections.hero.backgroundColor` | `sections.hero.background.value` (type: 'color') |
| `colors.primary` | `sections.*.colors.accent.value` |
| `colors.text` | `sections.*.colors.text.value` |
| `fonts.heading` | `sections.*.fonts.heading.family` |
| `fonts.body` | `sections.*.fonts.body.family` |

## Version History

### Version 1.0.0 (Current)

- Full design system schema
- Section-level design controls
- Product card customization
- Product detail page styling
- Font management system
- Responsive sizing
- Color configuration with contrast
- Background controls (color, image, gradient, video)

### Version 0.0.0 (Legacy)

- Basic section backgrounds
- Simple color configuration
- Basic font settings
- No responsive controls
- No product-specific styling

## Error Handling

The migration utility handles errors gracefully:

1. **Migration Failure**: Returns error message, keeps current settings
2. **Backup Failure**: Logs error but continues (backup is not critical)
3. **Validation Failure**: Rolls back to previous settings
4. **Storage Failure**: Falls back to default settings

## Best Practices

### Before Migration

1. **Review Current Settings**: Check what customizations exist
2. **Test in Development**: Run migration in dev environment first
3. **Document Changes**: Note any custom configurations
4. **Backup Manually**: Export current settings as JSON

### After Migration

1. **Verify Settings**: Check that all sections look correct
2. **Test Functionality**: Ensure design controls work properly
3. **Review History**: Confirm history entry was created
4. **Save Backup ID**: Keep backup ID for potential rollback

### Rollback Procedure

If migration causes issues:

1. Get backup ID from migration response
2. Call restore API with backup ID
3. Verify settings are restored
4. Report issue for investigation

## Storage Keys

The migration utility uses these Vercel KV keys:

- `design:settings:current` - Current design settings
- `design:migration:metadata` - Migration metadata
- `design:backup:{id}` - Backup snapshots (30-day TTL)
- `design:history:entries` - History entry IDs
- `design:history:{id}` - Individual history entries

## Future Migrations

When adding new versions:

1. Add version constant to `MIGRATION_VERSIONS`
2. Create migration function (e.g., `migrateV1ToV2`)
3. Add version check in `migrateDesignSettings`
4. Update documentation
5. Test migration path thoroughly

Example:

```typescript
export const MIGRATION_VERSIONS = {
  LEGACY: '0.0.0',
  V1_0_0: '1.0.0',
  V2_0_0: '2.0.0', // New version
  CURRENT: '2.0.0',
} as const;

async function migrateV1ToV2(v1Settings: DesignSettings): Promise<DesignSettings> {
  // Migration logic here
}
```

## Troubleshooting

### Migration Not Running

- Check admin authentication
- Verify Vercel KV is configured
- Check console for error messages
- Ensure settings exist in storage

### Backup Not Created

- Check Vercel KV storage limits
- Verify KV credentials are correct
- Check backup expiration settings
- Review error logs

### Settings Not Applied

- Clear browser cache
- Check cache invalidation
- Verify settings were saved
- Review API response

### Rollback Failed

- Verify backup ID is correct
- Check backup hasn't expired (30 days)
- Ensure backup exists in storage
- Try manual restore from export

## Support

For issues or questions:

1. Check error logs in console
2. Review migration metadata
3. Export current settings for analysis
4. Contact development team with:
   - Migration metadata
   - Error messages
   - Backup ID (if available)
   - Current settings export
