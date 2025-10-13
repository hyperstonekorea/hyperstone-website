# Design History System

## Overview

The Design History System provides version control for design settings, allowing administrators to track changes, compare versions, and rollback to previous configurations.

## Components

### 1. DesignHistory Component

**Location:** `src/components/admin/design/DesignHistory.tsx`

**Purpose:** Displays a list of historical design configurations with timestamps, authors, and descriptions.

**Features:**
- Lists all history entries sorted by timestamp (newest first)
- Shows relative time (e.g., "2 hours ago") and absolute timestamp
- Displays entry metadata (author, description)
- Preview on hover showing version details
- Rollback button for each entry
- Checkbox selection for comparison (up to 2 entries)
- Pagination support for large history lists
- Refresh functionality

**Props:**
```typescript
interface DesignHistoryProps {
  onRollback: (entryId: string) => void;
  onCompare?: (entry1: DesignHistoryEntry, entry2: DesignHistoryEntry) => void;
}
```

**Usage:**
```tsx
<DesignHistory
  onRollback={handleRollback}
  onCompare={handleCompare}
/>
```

### 2. HistoryComparison Component

**Location:** `src/components/admin/design/HistoryComparison.tsx`

**Purpose:** Provides side-by-side or unified comparison of two design configuration versions.

**Features:**
- Two view modes: Side-by-Side and Unified
- Highlights differences with color coding:
  - 🟢 Green: Added values
  - 🔴 Red: Removed values
  - 🟡 Yellow: Modified values
- Filter to show only differences
- Displays version metadata (timestamp, author, description)
- Rollback buttons for both versions
- Deep object comparison with path tracking
- JSON formatting for complex values

**Props:**
```typescript
interface HistoryComparisonProps {
  entry1: DesignHistoryEntry;
  entry2: DesignHistoryEntry;
  onClose: () => void;
  onRollback?: (entryId: string) => void;
}
```

**Usage:**
```tsx
<HistoryComparison
  entry1={olderEntry}
  entry2={newerEntry}
  onClose={() => setComparisonEntries(null)}
  onRollback={handleRollback}
/>
```

## API Endpoints

### GET /api/admin/design-history

**Purpose:** Retrieve design history entries

**Query Parameters:**
- `limit` (optional): Number of entries to return (default: 20)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "entries": [
    {
      "id": "history-1234567890-abc123",
      "timestamp": "2025-10-07T10:30:00.000Z",
      "settings": { /* DesignSettings object */ },
      "author": "admin",
      "description": "Updated hero section background"
    }
  ],
  "pagination": {
    "total": 45,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

### POST /api/admin/design-history/rollback

**Purpose:** Rollback to a specific history entry

**Request Body:**
```json
{
  "entryId": "history-1234567890-abc123"
}
```

**Response:**
```json
{
  "success": true,
  "settings": { /* DesignSettings object */ },
  "message": "Successfully rolled back to previous version"
}
```

## Storage Implementation

### Automatic History Creation

History entries are automatically created whenever design settings are saved via the `PUT /api/admin/design-settings` endpoint.

**Implementation:** `src/lib/design/storage.ts`

```typescript
class DesignStorageService {
  async saveSettings(
    settings: DesignSettings,
    author: string = 'admin',
    description?: string
  ): Promise<void> {
    // Update timestamp
    settings.lastUpdated = new Date().toISOString();
    
    // Save current settings
    await kv.set(KV_KEYS.DESIGN_SETTINGS, settings);
    
    // Create history entry (automatic)
    await this.createHistoryEntry(settings, author, description);
  }
}
```

### History Limiting

The system maintains a maximum of **50 history entries**. When this limit is exceeded:

1. Older entries are automatically removed from the history list
2. Individual history entry keys are deleted from Vercel KV
3. The most recent 50 entries are preserved

**Implementation:**
```typescript
private async createHistoryEntry(
  settings: DesignSettings,
  author: string,
  description?: string
): Promise<void> {
  // Create new entry
  const historyEntry: DesignHistoryEntry = {
    id: `history-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    settings,
    author,
    description,
  };

  // Save individual entry
  await kv.set(KV_KEYS.DESIGN_HISTORY_ENTRY(historyEntry.id), historyEntry);

  // Get current history list
  const historyList = await kv.get<string[]>(KV_KEYS.DESIGN_HISTORY) || [];
  
  // Add new entry to the beginning
  historyList.unshift(historyEntry.id);

  // Trim to max entries (50)
  if (historyList.length > MAX_HISTORY_ENTRIES) {
    const removedIds = historyList.splice(MAX_HISTORY_ENTRIES);
    
    // Delete old entries
    for (const id of removedIds) {
      await kv.del(KV_KEYS.DESIGN_HISTORY_ENTRY(id));
    }
  }

  // Save updated history list
  await kv.set(KV_KEYS.DESIGN_HISTORY, historyList);
}
```

## Integration with DesignSystemManager

The history system is integrated into the main Design System Manager as a tab.

**Location:** `src/components/admin/design/DesignSystemManager.tsx`

**Features:**
- History tab in the main navigation
- Rollback functionality that updates current settings
- Comparison modal overlay
- Automatic notification on rollback success/failure
- Automatic settings reload after rollback

**Usage Flow:**

1. User clicks "History" tab
2. DesignHistory component loads and displays entries
3. User can:
   - Click "Rollback" to restore a version
   - Select 2 entries and click "Compare Selected"
4. Comparison opens in modal overlay
5. User can rollback from comparison view
6. Settings are updated and user is notified

## Data Structure

### DesignHistoryEntry

```typescript
interface DesignHistoryEntry {
  id: string;                    // Unique identifier
  timestamp: string;             // ISO 8601 timestamp
  settings: DesignSettings;      // Complete design configuration
  author: string;                // Who made the change
  description?: string;          // Optional description of changes
}
```

### Vercel KV Keys

```typescript
const KV_KEYS = {
  DESIGN_SETTINGS: 'design:settings:current',
  DESIGN_HISTORY: 'design:history:entries',           // Array of entry IDs
  DESIGN_HISTORY_ENTRY: (id: string) => `design:history:${id}`,  // Individual entries
};
```

## Best Practices

### When to Add Descriptions

Always provide meaningful descriptions when saving settings:

```typescript
await fetch('/api/admin/design-settings', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    settings,
    author: 'admin',
    description: 'Updated hero section background to gradient'
  })
});
```

### Comparison Workflow

1. Select two versions to compare (older and newer)
2. Review differences in side-by-side or unified view
3. Use "Show only differences" to focus on changes
4. Rollback to either version if needed

### Rollback Safety

- Always confirm before rolling back
- Review the version details before confirming
- Rollback creates a new history entry
- Previous state is never lost

## Error Handling

### Failed History Load

If history fails to load:
- Error message is displayed
- Retry button is provided
- System continues to function without history

### Failed Rollback

If rollback fails:
- Current settings are preserved
- Error notification is shown
- User can retry or manually adjust settings

### Storage Failures

History creation failures are logged but don't block saves:
- Settings are still saved successfully
- Error is logged to console
- User is notified of successful save

## Performance Considerations

### Caching

History API responses are cached:
```typescript
headers: {
  'Cache-Control': 'private, max-age=300, stale-while-revalidate=3600'
}
```

### Pagination

Large history lists are paginated:
- Default limit: 20 entries
- Load more on demand
- Reduces initial load time

### Comparison Optimization

- Deep comparison is performed client-side
- Only differences are highlighted
- Filter option reduces rendered content

## Future Enhancements

1. **Search and Filter**: Search history by description or date range
2. **Bulk Operations**: Delete multiple history entries
3. **Export History**: Download history as JSON
4. **Visual Diff**: Show visual preview of design changes
5. **Branching**: Create named branches for experimental designs
6. **Tags**: Tag important versions for easy reference
7. **Scheduled Rollback**: Schedule automatic rollback at specific time
8. **Diff Statistics**: Show summary of changes (X fields modified, Y added, Z removed)

## Requirements Fulfilled

This implementation fulfills **Requirement 1.8: Design History and Rollback**:

✅ Creates timestamped history entry on every save  
✅ Displays list of previous configurations with timestamps  
✅ Shows preview of historical configurations  
✅ Provides rollback functionality with confirmation  
✅ Highlights differences between configurations  
✅ Archives older entries (keeps last 50)  
✅ Maintains current settings on rollback failure  
✅ Notifies administrator of rollback status
