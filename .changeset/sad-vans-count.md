---
"@equinor/fusion-wc-people": major
"@equinor/fusion-wc-person": minor
---

## New Package: @equinor/fusion-wc-people

- **Purpose**: Comprehensive web component library for selecting and viewing people with advanced search functionality
- **Components**: `fwc-people-picker` for person selection with search, `fwc-people-viewer` for displaying people in list or table format, plus supporting sub-components
- **Features**: Keyboard navigation, debounced search, preselected people support, avatar customization with colors, service principal support, list/table view modes, responsive design, copyable names, application badges

## Enhanced Package: @equinor/fusion-wc-person

### New Tasks
- `PersonSuggestTask` with `PersonSuggestControllerHost` - For person/system account suggestions
- `PersonResolveTask` with `PersonResolveControllerHost` - For resolving person identifiers

### New Events
- `RequestResolvePersonSuggestEvent` - Fired to request person suggestions
- `RequestResolvePersonResolveEvent` - Fired to request person resolution

### Type System Enhancements
- New types: `PersonSuggestResult`, `PersonSuggestResults`, `PersonResolveResult`, `PersonResolveResults`
- New enums: `ServicePrincipalType`, `PersonSuggestResultAccountType`, `PersonSuggestResultPersonAccountType`
- Enhanced `PersonInfo` type with: `isExpired`, `avatarUrl`, `avatarColor`, `applicationId`, `applicationName`, `servicePrincipalType`, `employeeNumber`
- Enhanced `PersonResolver` interface with optional methods: `suggest()`, `resolve()`

### Component Improvements
- **Card**: Enhanced UI with additional info sections, improved styling, SVG enhancements
- **Exported tasks**: All tasks now exported from main index for better accessibility

### Best Practices
- Updated all type exports to use `type` keyword for better TypeScript semantics

## Configuration Changes
- Added `components/**` to pnpm workspace configuration
- Updated Node.js engine requirements to `^22 || ^24`
- Upgraded pnpm requirement to `>=10`

## No Breaking Changes

All changes are backward compatible. New types, tasks, and properties have been added without modifying existing APIs or removing previously exported functionality.
