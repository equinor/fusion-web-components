---
"@equinor/fusion-wc-people": minor
"@equinor/fusion-wc-person": minor
---

- **New package**: Added `@equinor/fusion-wc-people` - A comprehensive web component library for selecting and viewing people with advanced search functionality, pill display, and list/table management
- **New components**: Introduced `PeoplePickerElement` for person selection with search, `PeopleViewerElement` for displaying people in list or table format, and supporting components like `PeopleListElement`, `PeoplePillElement`, and `PeopleSearchElement`
- **Enhanced tasks**: Added `PersonSuggestTask` and `PersonResolveTask` to `@equinor/fusion-wc-person` package for improved person suggestion and resolution functionality
- **New features**: Implemented keyboard navigation, debounced search, preselected people support, avatar customization with colors, service principal type rendering, and enhanced error handling
- **UI improvements**: Added view mode selection (list/table), improved responsive design, copyable names, application badges, and better loading states
- **Technical enhancements**: Integrated `@lit/context` for better state management, added `NavigateController` for keyboard navigation, and enhanced `SelectedController` for person selection logic
- **Updated dependencies**: Added `@equinor/fusion-wc-searchable-dropdown` and `@lit/task` to person package dependencies
- **Documentation**: Updated Storybook stories and documentation for all new components and features
