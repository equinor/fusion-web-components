---
"@equinor/fusion-wc-people": minor
"@equinor/fusion-wc-person": minor
---

- **New package**: Added `@equinor/fusion-wc-people` - A comprehensive web component library for selecting and viewing people with advanced search functionality, pill display, and list/table management
- **New components**: Introduced `PeoplePickerElement` for person selection with search, `PeopleViewerElement` for displaying people in list or table format, and supporting components like `PeopleListElement`, `PeoplePillElement`, `PeopleSearchElement`, `PeopleListItemElement`, and `PeopleAvatarElement`
- **Enhanced tasks**: Added `PersonSuggestTask` and `PersonResolveTask` to `@equinor/fusion-wc-person` package for improved person suggestion and resolution functionality
- **New features**: Implemented keyboard navigation, debounced search, preselected people support, avatar customization with colors, service principal type rendering, and enhanced error handling
- **UI improvements**: Added view mode selection (list/table), improved responsive design, copyable names, application badges, and better loading states
- **Technical enhancements**: Integrated `@lit/context` for better state management, added `NavigateController` for keyboard navigation, `ClickOutsideController` for UX improvements, `ResolvedController` for data resolution, and enhanced `SelectedController` for person selection logic
- **Updated dependencies**: Added `@equinor/fusion-wc-searchable-dropdown` and `@lit/task` to person package dependencies, plus comprehensive dependencies for the new people package including `@equinor/fusion-wc-badge`, `@equinor/fusion-wc-button`, `@equinor/fusion-wc-progress-indicator`, and `@lit/context`
- **Workspace configuration**: Added `components/**` to pnpm workspace configuration to support the new component structure
- **Build and tooling updates**: Updated Node.js engine requirements to `^22 || ^24`, upgraded pnpm to `>=10`, added new TypeScript configurations for the people package
- **Documentation**: Added comprehensive Storybook stories for `PeoplePickerElement` and `PeopleViewerElement`, updated existing stories, and added documentation for all new components and features
- **Infrastructure**: Added GitHub Actions workflow updates, updated `.gitignore`, and added `.npmignore` for the new package
