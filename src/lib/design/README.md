# Design System Infrastructure

This directory contains the core infrastructure for the HYPERSTONE Admin Design System.

## Overview

The design system allows administrators to customize the visual appearance of the website without code changes. It provides granular control over backgrounds, colors, fonts, and styling for each section.

## Components

### Types (`types.ts`)
Defines all TypeScript interfaces for the design system:
- `DesignSettings`: Main settings structure
- `SectionDesignConfig`: Section-specific design
- `ProductCardDesignConfig`: Product card styling
- `ProductDetailDesignConfig`: Product detail page styling
- `FontConfig`, `ColorConfig`, `BackgroundConfig`: Granular controls

### Defaults (`defaults.ts`)
Contains `DEFAULT_DESIGN_SETTINGS` with sensible defaults for:
- Hero, About, Products, and Contact sections
- Product cards
- Global fonts (Pretendard, Gmarket Sans, Roboto Mono)

### Storage (`storage.ts`)
`DesignStorageService` class for Vercel KV operations:
- `saveSettings()`: Save design settings with history
- `loadSettings()`: Load settings with fallback to defaults
- `loadHistory()`: Get design change history
- `rollback()`: Restore previous version
- `exportSettings()`: Export as JSON
- `importSettings()`: Import from JSON

### Migration (`migration.ts`)
Migration utility for transforming old settings to new schema:
- `migrateDesignSettings()`: Migrate settings to latest version
- `restoreFromBackup()`: Restore from migration backup
- `getMigrationMetadata()`: Get migration history
- `listBackups()`: List available backups
- Automatic backup creation before migration
- Version tracking and validation
- 30-day backup retention

See [MIGRATION_README.md](./MIGRATION_README.md) for detailed documentation.

## Setup

### 1. Install Dependencies
```bash
npm install @vercel/kv
```

### 2. Configure Environment Variables
Add to `.env.local`:
```bash
KV_URL=
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=
```

Get these values from: Vercel Dashboard > Storage > KV

### 3. Usage Example

```typescript
import { designStorage, DEFAULT_DESIGN_SETTINGS } from '@/lib/design';

// Load settings
const settings = await designStorage.loadSettings();

// Save settings
await designStorage.saveSettings(settings, 'admin', 'Updated hero section');

// Load history
const history = await designStorage.loadHistory(20);

// Rollback
await designStorage.rollback('history-id', 'admin');

// Export
const json = await designStorage.exportSettings();

// Import
await designStorage.importSettings(json, 'admin');
```

## Storage Structure

### Vercel KV Keys
- `design:settings:current`: Current design settings
- `design:history:entries`: List of history entry IDs
- `design:history:{id}`: Individual history entry
- `design:migration:metadata`: Migration metadata and version tracking
- `design:backup:{id}`: Migration backups (30-day TTL)
- `fonts:cache:{family}`: Font cache (future use)

### History Management
- Maximum 50 history entries
- Automatic cleanup of old entries
- Each save creates a history entry
- Rollback creates a new history entry

## Fallback Behavior

If Vercel KV is unavailable or not configured:
- `loadSettings()` returns `DEFAULT_DESIGN_SETTINGS`
- Errors are logged but don't crash the application
- History operations fail gracefully

## Requirements

Implements requirements:
- **1.6**: Design Settings Persistence
- **1.8**: Design History and Rollback

## Next Steps

See `tasks.md` for remaining implementation tasks:
- API endpoints (task 3-4)
- Font management (task 5)
- Validation utilities (task 6)
- UI components (task 7-13)
