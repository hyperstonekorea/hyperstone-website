# Design System API Documentation

## Overview

This document provides technical documentation for the HYPERSTONE Design System API endpoints. All endpoints require admin authentication.

## Base URL

```
/api/admin
```

## Authentication

All endpoints require a valid admin session token. Include the token in the request headers or cookies.

```http
Cookie: admin-token=<your-token>
```

### Authentication Errors

```json
{
  "error": "Unauthorized",
  "message": "Admin authentication required"
}
```

---

## Design Settings Endpoints

### Get Design Settings

Retrieve current design settings.

**Endpoint**: `GET /api/admin/design-settings`

**Response**: `200 OK`

```json
{
  "version": "1.0.0",
  "lastUpdated": "2025-01-13T10:30:00Z",
  "sections": {
    "hero": {
      "sectionId": "hero",
      "background": {
        "type": "gradient",
        "value": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      },
      "fonts": {
        "heading": {
          "family": "Pretendard",
          "source": "pretendard",
          "weight": 700,
          "size": {
            "mobile": "2rem",
            "tablet": "3rem",
            "desktop": "4rem"
          }
        },
        "body": {
          "family": "Pretendard",
          "source": "pretendard",
          "weight": 400,
          "size": {
            "mobile": "1rem",
            "tablet": "1.125rem",
            "desktop": "1.25rem"
          }
        }
      },
      "colors": {
        "text": { "value": "#ffffff", "opacity": 1 },
        "heading": { "value": "#ffffff", "opacity": 1 },
        "accent": { "value": "#fbbf24", "opacity": 1 },
        "background": { "value": "transparent", "opacity": 1 }
      },
      "spacing": {
        "padding": {
          "mobile": "4rem 1rem",
          "tablet": "6rem 2rem",
          "desktop": "8rem 4rem"
        },
        "margin": {
          "mobile": "0",
          "tablet": "0",
          "desktop": "0"
        }
      }
    }
  },
  "productCards": {
    "background": {
      "type": "color",
      "value": "#ffffff"
    },
    "border": {
      "width": 1,
      "color": { "value": "#e5e7eb", "opacity": 1 },
      "radius": 12,
      "style": "solid"
    },
    "shadow": {
      "default": "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      "hover": "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
    }
  },
  "productDetails": {},
  "globalFonts": {
    "primary": {
      "family": "Pretendard",
      "source": "pretendard",
      "weight": 400,
      "size": {
        "mobile": "1rem",
        "tablet": "1rem",
        "desktop": "1rem"
      }
    }
  }
}
```

**Cache Headers**:
```
Cache-Control: public, s-maxage=60, stale-while-revalidate=300
```

**Error Responses**:

```json
// 500 Internal Server Error
{
  "error": "Failed to load design settings",
  "message": "Error details..."
}
```

---

### Update Design Settings

Update design settings.

**Endpoint**: `PUT /api/admin/design-settings`

**Request Body**:

```json
{
  "version": "1.0.0",
  "sections": {
    "hero": {
      // Section configuration
    }
  },
  "productCards": {
    // Product card configuration
  },
  "productDetails": {
    // Product detail configurations
  },
  "globalFonts": {
    // Global font configurations
  }
}
```

**Response**: `200 OK`

```json
{
  "success": true,
  "message": "Design settings updated successfully",
  "settings": {
    // Updated settings object
  },
  "historyId": "hist_1234567890"
}
```

**Validation Errors**: `400 Bad Request`

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "sections.hero.colors.text",
      "message": "Insufficient contrast ratio (2.1:1). Minimum required: 4.5:1",
      "suggestion": "Use #1f2937 for better contrast"
    },
    {
      "field": "sections.hero.fonts.body.size.mobile",
      "message": "Font size too small (12px). Minimum recommended: 16px"
    }
  ]
}
```

**Rate Limiting**: 10 requests per minute

```json
{
  "error": "Rate limit exceeded",
  "message": "Too many requests. Please try again in 60 seconds."
}
```

---

### Export Design Settings

Export design settings as JSON file.

**Endpoint**: `POST /api/admin/design-settings/export`

**Request Body** (optional):

```json
{
  "sections": ["hero", "about"],  // Optional: specific sections
  "includeProductCards": true,
  "includeProductDetails": false
}
```

**Response**: `200 OK`

```
Content-Type: application/json
Content-Disposition: attachment; filename="hyperstone-design-2025-01-13.json"

{
  // Full design settings object
}
```

**Error Responses**:

```json
// 500 Internal Server Error
{
  "error": "Export failed",
  "message": "Error details..."
}
```

---

### Import Design Settings

Import design settings from JSON file.

**Endpoint**: `POST /api/admin/design-settings/import`

**Request Body**:

```json
{
  "settings": {
    // Design settings object
  },
  "mode": "replace",  // "replace" or "merge"
  "validate": true
}
```

**Response**: `200 OK`

```json
{
  "success": true,
  "message": "Design settings imported successfully",
  "imported": {
    "sections": 4,
    "productCards": 1,
    "productDetails": 4
  },
  "warnings": [
    {
      "field": "sections.contact.colors.text",
      "message": "Low contrast ratio (3.8:1). Consider improving."
    }
  ]
}
```

**Validation Errors**: `400 Bad Request`

```json
{
  "error": "Import validation failed",
  "details": [
    {
      "line": 45,
      "field": "sections.hero.background.type",
      "message": "Invalid background type: 'invalid'. Must be one of: color, image, gradient, video"
    }
  ]
}
```

---

## Design History Endpoints

### Get Design History

Retrieve design change history.

**Endpoint**: `GET /api/admin/design-history`

**Query Parameters**:
- `limit` (optional): Number of entries to return (default: 20, max: 50)
- `offset` (optional): Pagination offset (default: 0)

**Example**: `GET /api/admin/design-history?limit=10&offset=0`

**Response**: `200 OK`

```json
{
  "entries": [
    {
      "id": "hist_1705147800000",
      "timestamp": "2025-01-13T10:30:00Z",
      "author": "admin@hyperstone.com",
      "description": "Updated hero section colors",
      "settings": {
        // Full settings snapshot
      }
    },
    {
      "id": "hist_1705144200000",
      "timestamp": "2025-01-13T09:30:00Z",
      "author": "admin@hyperstone.com",
      "description": "Modified product card shadows",
      "settings": {
        // Full settings snapshot
      }
    }
  ],
  "total": 45,
  "limit": 20,
  "offset": 0
}
```

**Cache Headers**:
```
Cache-Control: private, s-maxage=300, stale-while-revalidate=3600
```

---

### Rollback to History Entry

Restore a previous design configuration.

**Endpoint**: `POST /api/admin/design-history/rollback`

**Request Body**:

```json
{
  "historyId": "hist_1705144200000",
  "description": "Rollback to previous version"  // Optional
}
```

**Response**: `200 OK`

```json
{
  "success": true,
  "message": "Successfully rolled back to previous version",
  "settings": {
    // Restored settings
  },
  "newHistoryId": "hist_1705151400000"
}
```

**Error Responses**:

```json
// 404 Not Found
{
  "error": "History entry not found",
  "message": "No history entry with ID: hist_invalid"
}

// 500 Internal Server Error
{
  "error": "Rollback failed",
  "message": "Error details..."
}
```

---

## Font Endpoints

### Get Available Fonts

Retrieve list of available fonts.

**Endpoint**: `GET /api/admin/fonts`

**Response**: `200 OK`

```json
{
  "fonts": [
    {
      "family": "Pretendard",
      "source": "pretendard",
      "weights": [100, 200, 300, 400, 500, 600, 700, 800, 900],
      "category": "sans-serif",
      "preview": "The quick brown fox jumps over the lazy dog"
    },
    {
      "family": "Gmarket Sans",
      "source": "gmarket",
      "weights": ["Light", "Medium", "Bold"],
      "category": "sans-serif",
      "preview": "The quick brown fox jumps over the lazy dog"
    },
    {
      "family": "Noto Sans KR",
      "source": "google",
      "weights": [100, 300, 400, 500, 700, 900],
      "category": "sans-serif",
      "preview": "The quick brown fox jumps over the lazy dog"
    }
  ],
  "categories": ["sans-serif", "serif", "monospace", "display", "handwriting"]
}
```

**Cache Headers**:
```
Cache-Control: public, s-maxage=86400, stale-while-revalidate=604800
```

---

### Search Google Fonts

Search Google Fonts API.

**Endpoint**: `GET /api/admin/fonts/google/search`

**Query Parameters**:
- `q` (required): Search query
- `category` (optional): Font category filter
- `limit` (optional): Number of results (default: 20, max: 50)

**Example**: `GET /api/admin/fonts/google/search?q=roboto&category=sans-serif&limit=10`

**Response**: `200 OK`

```json
{
  "results": [
    {
      "family": "Roboto",
      "source": "google",
      "weights": [100, 300, 400, 500, 700, 900],
      "category": "sans-serif",
      "variants": ["regular", "italic", "700", "700italic"],
      "preview": "The quick brown fox jumps over the lazy dog"
    }
  ],
  "total": 1,
  "query": "roboto"
}
```

**Error Responses**:

```json
// 400 Bad Request
{
  "error": "Missing required parameter",
  "message": "Query parameter 'q' is required"
}

// 503 Service Unavailable
{
  "error": "Google Fonts API unavailable",
  "message": "Unable to reach Google Fonts API. Please try again later."
}
```

---

## Preview Endpoint

### Generate Design Preview

Generate a preview of design settings without saving.

**Endpoint**: `POST /api/admin/design-preview`

**Request Body**:

```json
{
  "settings": {
    // Temporary design settings to preview
  },
  "section": "hero",  // Optional: specific section to preview
  "device": "desktop"  // Optional: mobile, tablet, or desktop
}
```

**Response**: `200 OK`

```json
{
  "previewUrl": "/api/admin/design-preview/render?id=preview_1705147800000",
  "expiresAt": "2025-01-13T11:30:00Z",
  "validation": {
    "valid": true,
    "warnings": [
      {
        "field": "sections.hero.colors.text",
        "message": "Contrast ratio is 4.6:1. Consider improving to 7:1 for AAA compliance.",
        "level": "warning"
      }
    ],
    "errors": []
  }
}
```

**Validation Errors**: `400 Bad Request`

```json
{
  "error": "Preview validation failed",
  "details": [
    {
      "field": "sections.hero.colors.text",
      "message": "Insufficient contrast ratio (2.1:1). Minimum required: 4.5:1",
      "level": "error"
    }
  ]
}
```

---

## Image Upload Endpoint

### Upload Background Image

Upload and optimize background images.

**Endpoint**: `POST /api/admin/upload`

**Request**: `multipart/form-data`

```
Content-Type: multipart/form-data

file: [binary image data]
optimize: true  // Optional: enable optimization
maxWidth: 1920  // Optional: max width in pixels
quality: 85     // Optional: JPEG quality (1-100)
```

**Response**: `200 OK`

```json
{
  "success": true,
  "url": "/uploads/backgrounds/image-1705147800000.jpg",
  "optimized": {
    "originalSize": 2048576,
    "optimizedSize": 512000,
    "reduction": "75%"
  },
  "dimensions": {
    "width": 1920,
    "height": 1080
  }
}
```

**Error Responses**:

```json
// 400 Bad Request - Invalid file type
{
  "error": "Invalid file type",
  "message": "Only JPEG, PNG, and WebP images are allowed"
}

// 413 Payload Too Large
{
  "error": "File too large",
  "message": "Maximum file size is 5MB"
}

// 500 Internal Server Error
{
  "error": "Upload failed",
  "message": "Error details..."
}
```

**Rate Limiting**: 5 requests per minute

---

## Error Codes

### HTTP Status Codes

- `200 OK`: Request successful
- `400 Bad Request`: Invalid request data or validation failure
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `413 Payload Too Large`: Request body too large
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error
- `503 Service Unavailable`: Service temporarily unavailable

### Error Response Format

All error responses follow this format:

```json
{
  "error": "Error type",
  "message": "Human-readable error message",
  "details": [
    // Optional: Additional error details
  ],
  "code": "ERROR_CODE",  // Optional: Machine-readable error code
  "timestamp": "2025-01-13T10:30:00Z"
}
```

---

## Rate Limiting

### Limits by Endpoint

| Endpoint | Limit | Window |
|----------|-------|--------|
| GET /design-settings | 60 requests | 1 minute |
| PUT /design-settings | 10 requests | 1 minute |
| POST /design-settings/export | 3 requests | 1 minute |
| POST /design-settings/import | 3 requests | 1 minute |
| GET /design-history | 30 requests | 1 minute |
| POST /design-history/rollback | 5 requests | 1 minute |
| GET /fonts | 60 requests | 1 minute |
| GET /fonts/google/search | 20 requests | 1 minute |
| POST /design-preview | 30 requests | 1 minute |
| POST /upload | 5 requests | 1 minute |

### Rate Limit Headers

```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 7
X-RateLimit-Reset: 1705147860
```

### Rate Limit Exceeded Response

```json
{
  "error": "Rate limit exceeded",
  "message": "Too many requests. Please try again in 45 seconds.",
  "retryAfter": 45
}
```

---

## Caching Strategy

### Cache Headers

Different endpoints use different caching strategies:

**Design Settings** (frequently updated):
```
Cache-Control: public, s-maxage=60, stale-while-revalidate=300
```

**Font List** (rarely changes):
```
Cache-Control: public, s-maxage=86400, stale-while-revalidate=604800
```

**Design History** (user-specific):
```
Cache-Control: private, s-maxage=300, stale-while-revalidate=3600
```

### Cache Invalidation

Caches are automatically invalidated when:
- Design settings are updated (PUT /design-settings)
- Settings are imported (POST /design-settings/import)
- Rollback is performed (POST /design-history/rollback)

---

## Webhooks (Future)

Webhook support for design changes is planned for a future release.

**Planned Events**:
- `design.settings.updated`
- `design.settings.imported`
- `design.history.rollback`

---

## SDK Examples

### JavaScript/TypeScript

```typescript
// Fetch design settings
async function getDesignSettings() {
  const response = await fetch('/api/admin/design-settings', {
    credentials: 'include'
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch design settings');
  }
  
  return await response.json();
}

// Update design settings
async function updateDesignSettings(settings: DesignSettings) {
  const response = await fetch('/api/admin/design-settings', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(settings)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  
  return await response.json();
}

// Export design settings
async function exportDesignSettings() {
  const response = await fetch('/api/admin/design-settings/export', {
    method: 'POST',
    credentials: 'include'
  });
  
  if (!response.ok) {
    throw new Error('Failed to export design settings');
  }
  
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `hyperstone-design-${Date.now()}.json`;
  a.click();
}

// Upload image
async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('optimize', 'true');
  formData.append('maxWidth', '1920');
  
  const response = await fetch('/api/admin/upload', {
    method: 'POST',
    credentials: 'include',
    body: formData
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  
  return await response.json();
}
```

### React Hook Example

```typescript
import { useState, useEffect } from 'react';

export function useDesignSettings() {
  const [settings, setSettings] = useState<DesignSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await getDesignSettings();
        setSettings(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchSettings();
  }, []);
  
  const updateSettings = async (newSettings: DesignSettings) => {
    try {
      const data = await updateDesignSettings(newSettings);
      setSettings(data.settings);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };
  
  return { settings, loading, error, updateSettings };
}
```

---

## Versioning

API Version: `v1`

The API version is included in the response headers:

```
X-API-Version: v1
```

Breaking changes will result in a new API version (v2, v3, etc.).

---

## Support

For API support:
- Review this documentation
- Check the troubleshooting guide
- Contact your system administrator

---

**Version**: 1.0.0  
**Last Updated**: 2025-01-13
