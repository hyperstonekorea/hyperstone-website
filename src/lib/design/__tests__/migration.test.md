# Migration Utility Test Plan

## Overview

This document outlines the test plan for the design settings migration utility.

## Test Cases

### 1. Initial Migration (No Existing Settings)

**Scenario**: First-time setup with no existing settings

**Steps**:
1. Clear all design settings from Vercel KV
2. Call `migrateDesignSettings()`
3. Verify default settings are created

**Expected Result**:
- Settings initialized with `DEFAULT_DESIGN_SETTINGS`
- Version set to `1.0.0`
- Success message returned
- No backup created (nothing to backup)

### 2. Migration from Legacy Format

**Scenario**: Migrate from old ContentManager format

**Setup**:
```typescript
const legacySettings = {
  sections: {
    hero: {
      title: 'Welcome',
      subtitle: 'Test subtitle',
      backgroundImage: '/images/hero.jpg',
      backgroundColor: '#667eea'
    },
    about: {
      title: 'About Us',
      description: 'Test description',
      backgroundColor: '#ffffff'
    }
  },
  colors: {
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#fbbf24',
    text: '#111827'
  },
  fonts: {
    heading: 'Arial',
    body: 'Helvetica'
  }
};
```

**Steps**:
1. Save legacy settings to Vercel KV
2. Call `migrateDesignSettings()`
3. Verify migration completed

**Expected Result**:
- Backup created with legacy settings
- Settings migrated to v1.0.0 schema
- Background image preserved in `sections.hero.background`
- Colors mapped to section color configs
- Fonts mapped to section font configs
- Version updated to `1.0.0`
- Migration metadata saved

### 3. No Migration Needed

**Scenario**: Settings already at current version

**Setup**:
- Settings with `version: '1.0.0'`

**Steps**:
1. Call `migrateDesignSettings()`
2. Verify no changes made

**Expected Result**:
- No backup created
- Settings unchanged
- Message: "No migration needed - already at current version"

### 4. Backup Creation

**Scenario**: Verify backup is created before migration

**Steps**:
1. Set up legacy settings
2. Call `migrateDesignSettings()`
3. Verify backup exists in Vercel KV

**Expected Result**:
- Backup key created: `design:backup:{id}`
- Backup contains original settings
- Backup ID returned in response
- Backup has 30-day TTL

### 5. Restore from Backup

**Scenario**: Rollback to previous settings

**Steps**:
1. Run migration and get backup ID
2. Make changes to current settings
3. Call `restoreFromBackup(backupId)`
4. Verify settings restored

**Expected Result**:
- Settings restored to backup state
- New history entry created
- Success message returned

### 6. Invalid Backup ID

**Scenario**: Attempt to restore from non-existent backup

**Steps**:
1. Call `restoreFromBackup('invalid-id')`

**Expected Result**:
- Error message: "Backup not found"
- Current settings unchanged

### 7. Migration Metadata

**Scenario**: Verify migration metadata is saved

**Steps**:
1. Run migration
2. Call `getMigrationMetadata()`

**Expected Result**:
- Metadata contains:
  - `lastMigration`: 'legacy-to-v1'
  - `fromVersion`: '0.0.0'
  - `toVersion`: '1.0.0'
  - `timestamp`: ISO date string
  - `backupId`: backup identifier

### 8. List Backups

**Scenario**: Retrieve list of available backups

**Steps**:
1. Run migration (creates backup)
2. Call `listBackups()`

**Expected Result**:
- Array contains backup entry
- Each entry has `id` and `timestamp`

### 9. Validation

**Scenario**: Ensure migrated settings are valid

**Steps**:
1. Migrate legacy settings
2. Verify structure matches schema

**Expected Result**:
- All required sections present
- All required fields populated
- Data types correct
- No missing properties

### 10. API Endpoint - POST Migration

**Scenario**: Trigger migration via API

**Request**:
```bash
POST /api/admin/design-settings/migrate
Content-Type: application/json
Authorization: Bearer {admin-token}

{
  "action": "migrate"
}
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Successfully migrated from 0.0.0 to 1.0.0",
  "fromVersion": "0.0.0",
  "toVersion": "1.0.0",
  "backupId": "1234567890-abc123"
}
```

### 11. API Endpoint - GET Status

**Scenario**: Get migration status via API

**Request**:
```bash
GET /api/admin/design-settings/migrate
Authorization: Bearer {admin-token}
```

**Expected Response**:
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

### 12. API Endpoint - POST Restore

**Scenario**: Restore from backup via API

**Request**:
```bash
POST /api/admin/design-settings/migrate
Content-Type: application/json
Authorization: Bearer {admin-token}

{
  "action": "restore",
  "backupId": "1234567890-abc123"
}
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Successfully restored from backup created at 2024-01-15T10:30:00.000Z"
}
```

### 13. UI Component - Display Status

**Scenario**: Migration utility component shows current status

**Steps**:
1. Render `<MigrationUtility />`
2. Verify status display

**Expected Result**:
- Shows migration metadata if available
- Shows "No migration performed" if no metadata
- Displays backup list if available
- Shows loading state while fetching

### 14. UI Component - Run Migration

**Scenario**: User triggers migration from UI

**Steps**:
1. Click "Run Migration" button
2. Confirm dialog
3. Wait for completion

**Expected Result**:
- Confirmation dialog appears
- Loading state shown during migration
- Success message displayed
- Status refreshed automatically

### 15. UI Component - Restore Backup

**Scenario**: User restores from backup via UI

**Steps**:
1. Click "Restore" button on backup
2. Confirm dialog
3. Wait for completion

**Expected Result**:
- Confirmation dialog appears
- Loading state shown during restore
- Success message displayed
- Status refreshed automatically

## Manual Testing Checklist

- [ ] Test initial migration with no settings
- [ ] Test migration from legacy format
- [ ] Test migration when already at current version
- [ ] Verify backup creation
- [ ] Test restore from backup
- [ ] Test invalid backup ID handling
- [ ] Verify migration metadata saved
- [ ] Test list backups functionality
- [ ] Verify migrated settings structure
- [ ] Test POST /api/admin/design-settings/migrate (migrate)
- [ ] Test POST /api/admin/design-settings/migrate (restore)
- [ ] Test GET /api/admin/design-settings/migrate
- [ ] Test UI component rendering
- [ ] Test UI migration trigger
- [ ] Test UI restore trigger
- [ ] Verify error handling
- [ ] Test authentication on API endpoints
- [ ] Verify backup expiration (30 days)

## Integration Testing

### Test with Real Vercel KV

1. Set up test Vercel KV instance
2. Run migration with test data
3. Verify data in KV storage
4. Test backup retrieval
5. Test restore functionality
6. Verify TTL on backups

### Test with Admin Dashboard

1. Add MigrationUtility to admin page
2. Test full workflow in browser
3. Verify UI updates correctly
4. Test error scenarios
5. Verify success messages

## Error Scenarios

### 1. Vercel KV Unavailable

**Expected**: Graceful fallback, error message displayed

### 2. Invalid Settings Format

**Expected**: Validation error, settings not saved

### 3. Backup Creation Fails

**Expected**: Warning logged, migration continues

### 4. Network Error During API Call

**Expected**: Error message in UI, retry option

### 5. Unauthorized Access

**Expected**: 401 response, access denied message

## Performance Testing

- [ ] Test migration with large settings object
- [ ] Test with multiple backups
- [ ] Verify API response times
- [ ] Check UI responsiveness during operations

## Security Testing

- [ ] Verify admin authentication required
- [ ] Test with invalid tokens
- [ ] Verify backup access control
- [ ] Test input sanitization

## Notes

- All tests should be run in development environment first
- Backup production settings before testing in production
- Monitor Vercel KV storage usage
- Document any issues or edge cases discovered
