# Design Settings API Endpoints

This directory contains the API endpoints for managing design settings in the HYPERSTONE admin dashboard.

## Endpoints

### GET /api/admin/design-settings
Load current design settings from Vercel KV.

**Authentication:** Required (Admin)

**Response:**
```json
{
  "success": true,
  "data": {
    "version": "1.0.0",
    "lastUpdated": "2025-02-10T...",
    "sections": { ... },
    "productCards": { ... },
    "productDetails": { ... },
    "globalFonts": { ... }
  }
}
```

**Caching:** 
- `s-maxage=60` (1 minute)
- `stale-while-revalidate=300` (5 minutes)

**Fallback:** Returns default settings if none are found in KV.

---

### PUT /api/admin/design-settings
Save design settings to Vercel KV with validation and history tracking.

**Authentication:** Required (Admin)

**Request Body:**
```json
{
  "settings": { ... },
  "author": "admin",
  "description": "Optional description"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Design settings saved successfully",
  "data": { ... }
}
```

**Features:**
- Validates required fields (version, sections, productCards)
- Creates history entry automatically
- Invalidates caches
- Updates lastUpdated timestamp

---

### POST /api/admin/design-settings/export
Export current design settings as a downloadable JSON file.

**Authentication:** Required (Admin)

**Response:** 
- Content-Type: `application/json`
- Content-Disposition: `attachment; filename="hyperstone-design-settings-{timestamp}.json"`
- Body: JSON string of current settings

**Usage:**
```javascript
const response = await fetch('/api/admin/design-settings/export', {
  method: 'POST',
  credentials: 'include'
});
const blob = await response.blob();
// Download file
```

---

### POST /api/admin/design-settings/import
Import design settings from a JSON file.

**Authentication:** Required (Admin)

**Request Body:**
```json
{
  "jsonString": "{ ... }",
  "author": "admin"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Design settings imported successfully",
  "data": { ... }
}
```

**Validation:**
- Validates JSON syntax
- Checks for required fields (version, sections, productCards)
- Creates history entry with "Imported from JSON" description

**Error Responses:**
- `400`: Invalid JSON format or missing required fields
- `500`: Server error during import

---

## Implementation Details

### Storage
All endpoints use the `DesignStorageService` class from `@/lib/design/storage` which:
- Manages Vercel KV operations
- Handles history tracking (max 50 entries)
- Provides fallback to default settings
- Implements retry logic for reliability

### Authentication
All endpoints use `verifyAdminAuth()` middleware from `@/lib/auth-middleware` to ensure only authenticated admins can access these endpoints.

### Error Handling
- All endpoints include try-catch blocks
- Errors are logged to console
- User-friendly error messages returned
- Appropriate HTTP status codes (400, 401, 500)

### Requirements Satisfied
- **1.6**: Design Settings Persistence
  - Settings stored in Vercel KV
  - Export/import functionality
  - Cache invalidation on updates
  - Fallback to defaults when unavailable

## Testing

To test these endpoints, you can use:

```bash
# Get current settings
curl -X GET http://localhost:3000/api/admin/design-settings \
  -H "Cookie: admin-token=..."

# Save settings
curl -X PUT http://localhost:3000/api/admin/design-settings \
  -H "Content-Type: application/json" \
  -H "Cookie: admin-token=..." \
  -d '{"settings": {...}, "author": "admin"}'

# Export settings
curl -X POST http://localhost:3000/api/admin/design-settings/export \
  -H "Cookie: admin-token=..." \
  -o settings.json

# Import settings
curl -X POST http://localhost:3000/api/admin/design-settings/import \
  -H "Content-Type: application/json" \
  -H "Cookie: admin-token=..." \
  -d '{"jsonString": "..."}'
```

## Next Steps

The following related tasks still need to be implemented:
- Task 4: Build design history API endpoints (GET history, POST rollback)
- Task 11: Build DesignSystemManager UI component to consume these APIs
- Task 14: Integrate design system with public pages
