# Migration Utility - Quick Start Guide

## 🚀 Quick Integration (5 minutes)

### Step 1: Add to Admin Dashboard

Open `src/app/admin/page.tsx` and add:

```tsx
import MigrationUtility from '@/components/admin/design/MigrationUtility';

export default function AdminPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Add this */}
      <div className="mb-8">
        <MigrationUtility />
      </div>
      
      {/* Your other components */}
    </div>
  );
}
```

### Step 2: Run Migration

1. Navigate to admin dashboard
2. Find "Migration Utility" section
3. Click "Run Migration" button
4. Confirm the action
5. Done! ✅

## 📋 What It Does

- ✅ Detects if migration is needed
- ✅ Creates automatic backup (30-day retention)
- ✅ Transforms old settings to new format
- ✅ Tracks version history
- ✅ Provides rollback capability

## 🔧 API Endpoints

### Run Migration
```bash
POST /api/admin/design-settings/migrate
Body: { "action": "migrate" }
```

### Get Status
```bash
GET /api/admin/design-settings/migrate
```

### Restore Backup
```bash
POST /api/admin/design-settings/migrate
Body: { "action": "restore", "backupId": "..." }
```

## 💻 Programmatic Usage

```typescript
import { migrateDesignSettings } from '@/lib/design';

// Run migration
const result = await migrateDesignSettings('admin');
console.log(result.message);
console.log('Backup ID:', result.backupId);
```

## 📚 Full Documentation

- **Comprehensive Guide**: `MIGRATION_README.md`
- **Implementation Guide**: `MIGRATION_IMPLEMENTATION_GUIDE.md`
- **Test Plan**: `src/lib/design/__tests__/migration.test.md`
- **Summary**: `MIGRATION_UTILITY_SUMMARY.md`

## ⚠️ Important Notes

1. **Backup Created**: Every migration creates a backup automatically
2. **30-Day Retention**: Backups expire after 30 days
3. **Safe Operation**: Can rollback if needed
4. **Version Tracking**: All migrations are tracked
5. **Admin Only**: Requires admin authentication

## 🆘 Troubleshooting

### Migration button doesn't work
- Check browser console for errors
- Verify admin authentication
- Check Vercel KV configuration

### Settings not applied
- Clear browser cache
- Verify settings saved to KV
- Check API response

### Need to rollback
- Use backup ID from migration result
- Click "Restore" button in UI
- Or use API: `{ "action": "restore", "backupId": "..." }`

## ✅ That's It!

The migration utility is ready to use. Just add the component to your admin dashboard and run the migration when needed.

For detailed information, see the full documentation files.
