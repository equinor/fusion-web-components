---
"@equinor/fusion-wc-person": patch
---

Fix avatar size imports and remove circular dependencies

- Removed dependency on @equinor/fusion-wc-avatar and @equinor/fusion-wc-badge packages
- Added AvatarSizeEnum to types.ts for backward compatibility (deprecated)
- Updated avatar component exports to re-export AvatarSize enum for backward compatibility
- Removed Avatar imports from table-cell, card, and list-item components
- Refactored imports in avatar types to avoid circular dependencies
- Updated main index.ts to export AvatarSize as a value instead of type for consistency
