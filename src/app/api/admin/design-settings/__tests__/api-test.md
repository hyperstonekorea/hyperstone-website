# Design Settings API Test Plan

## Manual Testing Checklist

### Prerequisites
- [ ] Admin authentication is working
- [ ] Vercel KV is configured with environment variables
- [ ] Server is running locally or deployed

### Test 1: GET /api/admin/design-settings
**Expected:** Returns default settings on first call

```bash
curl -X GET http://localhost:3000/api/admin/design-settings \
  -H "Cookie: admin-token=YOUR_TOKEN"
```

**Verify:**
- [ ] Status code: 200
- [ ] Response has `success: true`
- [ ] Response has `data` object with version, sections, productCards, etc.
- [ ] Cache-Control header is present

### Test 2: PUT /api/admin/design-settings
**Expected:** Saves settings and creates history entry

```bash
curl -X PUT http://localhost:3000/api/admin/design-settings \
  -H "Content-Type: application/json" \
  -H "Cookie: admin-token=YOUR_TOKEN" \
  -d '{
    "settings": {
      "version": "1.0.0",
      "lastUpdated": "2025-02-10T00:00:00.000Z",
      "sections": {
        "hero": {
          "sectionId": "hero",
          "background": {"type": "color", "value": "#000000"},
          "fonts": {
            "heading": {
              "family": "Pretendard",
              "source": "pretendard",
              "weight": 700,
              "size": {"mobile": "2rem", "tablet": "3rem", "desktop": "4rem"}
            },
            "body": {
              "family": "Pretendard",
              "source": "pretendard",
              "weight": 400,
              "size": {"mobile": "1rem", "tablet": "1rem", "desktop": "1rem"}
            }
          },
          "colors": {
            "text": {"value": "#ffffff"},
            "heading": {"value": "#ffffff"},
            "accent": {"value": "#fbbf24"},
            "background": {"value": "transparent"}
          },
          "spacing": {
            "padding": {"mobile": "4rem 1rem", "tablet": "6rem 2rem", "desktop": "8rem 4rem"},
            "margin": {"mobile": "0", "tablet": "0", "desktop": "0"}
          }
        }
      },
      "productCards": {
        "background": {"type": "color", "value": "#ffffff"},
        "border": {
          "width": 1,
          "color": {"value": "#e5e7eb"},
          "radius": 12,
          "style": "solid"
        },
        "shadow": {
          "default": "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
          "hover": "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
        },
        "fonts": {
          "title": {
            "family": "Pretendard",
            "source": "pretendard",
            "weight": 600,
            "size": {"mobile": "1.25rem", "tablet": "1.5rem", "desktop": "1.5rem"}
          },
          "description": {
            "family": "Pretendard",
            "source": "pretendard",
            "weight": 400,
            "size": {"mobile": "0.875rem", "tablet": "1rem", "desktop": "1rem"}
          },
          "metadata": {
            "family": "Pretendard",
            "source": "pretendard",
            "weight": 400,
            "size": {"mobile": "0.75rem", "tablet": "0.875rem", "desktop": "0.875rem"}
          }
        },
        "colors": {
          "title": {"value": "#111827"},
          "description": {"value": "#6b7280"},
          "metadata": {"value": "#9ca3af"},
          "background": {"value": "#ffffff"}
        },
        "hover": {
          "transform": "translateY(-4px)",
          "transition": "all 0.3s ease"
        },
        "spacing": {
          "padding": "1.5rem",
          "gap": "1rem"
        }
      },
      "productDetails": {},
      "globalFonts": {
        "primary": {
          "family": "Pretendard",
          "source": "pretendard",
          "weight": 400,
          "size": {"mobile": "1rem", "tablet": "1rem", "desktop": "1rem"}
        },
        "secondary": {
          "family": "Gmarket Sans",
          "source": "gmarket",
          "weight": "Medium",
          "size": {"mobile": "1rem", "tablet": "1rem", "desktop": "1rem"}
        },
        "monospace": {
          "family": "Roboto Mono",
          "source": "google",
          "weight": 400,
          "size": {"mobile": "0.875rem", "tablet": "0.875rem", "desktop": "0.875rem"}
        }
      }
    },
    "author": "test-admin",
    "description": "Test settings update"
  }'
```

**Verify:**
- [ ] Status code: 200
- [ ] Response has `success: true`
- [ ] Response has updated `data` with new lastUpdated timestamp
- [ ] Cache-Control header indicates no-cache

### Test 3: GET after PUT
**Expected:** Returns the saved settings

```bash
curl -X GET http://localhost:3000/api/admin/design-settings \
  -H "Cookie: admin-token=YOUR_TOKEN"
```

**Verify:**
- [ ] Returns the settings saved in Test 2
- [ ] lastUpdated timestamp is recent

### Test 4: POST /api/admin/design-settings/export
**Expected:** Downloads settings as JSON file

```bash
curl -X POST http://localhost:3000/api/admin/design-settings/export \
  -H "Cookie: admin-token=YOUR_TOKEN" \
  -o exported-settings.json
```

**Verify:**
- [ ] Status code: 200
- [ ] File is downloaded
- [ ] File contains valid JSON
- [ ] JSON matches current settings
- [ ] Filename includes timestamp

### Test 5: POST /api/admin/design-settings/import
**Expected:** Imports settings from JSON

```bash
# First, prepare the JSON string (escape quotes properly)
curl -X POST http://localhost:3000/api/admin/design-settings/import \
  -H "Content-Type: application/json" \
  -H "Cookie: admin-token=YOUR_TOKEN" \
  -d '{"jsonString": "{\"version\":\"1.0.0\",\"sections\":{...}}", "author": "test-admin"}'
```

**Verify:**
- [ ] Status code: 200
- [ ] Response has `success: true`
- [ ] Settings are imported and saved
- [ ] History entry is created with "Imported from JSON" description

### Test 6: Error Handling - Invalid JSON
**Expected:** Returns 400 error

```bash
curl -X POST http://localhost:3000/api/admin/design-settings/import \
  -H "Content-Type: application/json" \
  -H "Cookie: admin-token=YOUR_TOKEN" \
  -d '{"jsonString": "invalid json"}'
```

**Verify:**
- [ ] Status code: 400
- [ ] Response has `success: false`
- [ ] Error message indicates invalid JSON

### Test 7: Error Handling - Missing Required Fields
**Expected:** Returns 400 error

```bash
curl -X PUT http://localhost:3000/api/admin/design-settings \
  -H "Content-Type: application/json" \
  -H "Cookie: admin-token=YOUR_TOKEN" \
  -d '{"settings": {"version": "1.0.0"}}'
```

**Verify:**
- [ ] Status code: 400
- [ ] Response has `success: false`
- [ ] Error message indicates missing required fields

### Test 8: Error Handling - Unauthorized Access
**Expected:** Returns 401 error

```bash
curl -X GET http://localhost:3000/api/admin/design-settings
```

**Verify:**
- [ ] Status code: 401
- [ ] Response indicates unauthorized

## Integration Testing

### Test with Admin UI
1. [ ] Open admin dashboard
2. [ ] Navigate to design settings (when UI is implemented)
3. [ ] Verify settings load correctly
4. [ ] Make changes and save
5. [ ] Verify changes persist after page reload
6. [ ] Export settings and verify file download
7. [ ] Import settings and verify they apply

### Test with Public Pages
1. [ ] Update design settings via API
2. [ ] Visit public pages
3. [ ] Verify design changes are applied
4. [ ] Check responsive behavior on different devices

## Performance Testing

### Cache Behavior
1. [ ] Make GET request and note response time
2. [ ] Make second GET request within 60 seconds
3. [ ] Verify response is cached (faster response)
4. [ ] Make PUT request to update settings
5. [ ] Make GET request and verify cache is invalidated

### Concurrent Updates
1. [ ] Make multiple PUT requests simultaneously
2. [ ] Verify all updates are processed correctly
3. [ ] Check history entries are created for each update

## Notes
- Replace `YOUR_TOKEN` with actual admin token from cookies
- Replace `localhost:3000` with actual deployment URL if testing on Vercel
- All tests require valid admin authentication
