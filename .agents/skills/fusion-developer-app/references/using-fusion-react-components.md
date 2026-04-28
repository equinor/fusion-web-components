# Fusion React Components

Domain-specific React components from the `@equinor/fusion-react-components` monorepo that complement EDS. These components integrate with Fusion platform APIs and provide functionality not covered by `@equinor/eds-core-react`.

**Repository**: [equinor/fusion-react-components](https://github.com/equinor/fusion-react-components)
**Storybook**: [equinor.github.io/fusion-react-components](https://equinor.github.io/fusion-react-components/)

## When to use

Use `@equinor/fusion-react-*` packages when the feature requires **Fusion-specific** UI that EDS does not provide — for example, person/people selection backed by the Fusion People API. Always check `@equinor/eds-core-react` first; reach for fusion-react only when EDS has no equivalent.

## Packages

| Package | Purpose |
|---|---|
| `@equinor/fusion-react-person` | Person display, search, and selection (People API integration) |
| `@equinor/fusion-react-side-sheet` | Slide-over side panel |
| `@equinor/fusion-react-progress-indicator` | Progress / loading indicators |

## Person components (`@equinor/fusion-react-person`)

The most commonly used package. All components resolve person data via the **Fusion People API** — pass an `azureId` or `upn` and the component handles fetching.

### Component catalog

| Component | Use for |
|---|---|
| `PersonAvatar` | Profile image with account-type border; hover/click shows details |
| `PersonCard` | Full person info — department, positions, tasks, manager |
| `PersonListItem` | Compact person row with optional action buttons |
| `PersonSelect` | Searchable dropdown to pick a single person |
| `PeoplePicker` | Multi-person search & selection (pills or table display) |
| `PersonPicker` | Single-person variant of `PeoplePicker` |
| `PeopleViewer` | Display and manage a collection of selected people |

### Key types

```typescript
import type {
  PersonInfo,
  PersonAddedEvent,
  PersonRemovedEvent,
} from '@equinor/fusion-react-person';
```

### Usage examples

#### Display a person avatar

```typescript
import { PersonAvatar } from '@equinor/fusion-react-person';

<PersonAvatar azureId="00000000-0000-0000-0000-000000000000" />
```

#### Single person picker

```typescript
import { PersonPicker, type PersonInfo } from '@equinor/fusion-react-person';
import { useState } from 'react';

const ManagerField = () => {
  const [manager, setManager] = useState<PersonInfo | null>(null);

  return (
    <PersonPicker
      person={manager}
      placeholder="Search for a manager…"
      subtitle="jobTitle"
      onPersonAdded={(e) => setManager(e.detail)}
      onPersonRemoved={() => setManager(null)}
    />
  );
};
```

#### Multi-person picker with viewer

```typescript
import {
  PeoplePicker,
  PeopleViewer,
  type PersonInfo,
  type PersonAddedEvent,
  type PersonRemovedEvent,
} from '@equinor/fusion-react-person';
import { useCallback, useState } from 'react';

const TeamBuilder = () => {
  const [people, setPeople] = useState<PersonInfo[]>([]);

  const handleAdded = useCallback(
    (e: PersonAddedEvent) => setPeople((prev) => [...prev, e.detail]),
    [],
  );

  const handleRemoved = useCallback(
    (e: PersonRemovedEvent) =>
      setPeople((prev) => prev.filter((p) => p.azureId !== e.detail.azureId)),
    [],
  );

  return (
    <>
      <PeoplePicker
        people={people}
        placeholder="Search for team members…"
        multiple={true}
        showSelectedPeople={false}
        subtitle="department"
        onPersonAdded={handleAdded}
        onPersonRemoved={handleRemoved}
      />
      <PeopleViewer
        people={people}
        subtitle="department"
        display="list"
        displayToggle={true}
        onPersonRemoved={handleRemoved}
      />
    </>
  );
};
```

### PeoplePicker props reference

| Prop | Type | Description |
|---|---|---|
| `people` | `PersonInfo[]` | Currently selected people |
| `placeholder` | `string` | Input placeholder text |
| `multiple` | `boolean` | Allow selecting more than one person |
| `showSelectedPeople` | `boolean` | Show selection inline below the input |
| `subtitle` | `string` | Field shown as subtitle (`jobTitle`, `department`, etc.) |
| `secondarySubtitle` | `string` | Optional secondary subtitle field |
| `systemAccounts` | `boolean` | Include system accounts in search |
| `display` | `'list' \| 'table'` | Layout for selected people |
| `displayToggle` | `boolean` | Show toggle between list and table views |
| `tableColumns` | `string[]` | Columns for table view |
| `noResultTitle` | `string` | Empty-state heading |
| `noResultSubtitle` | `string` | Empty-state subtext |
| `onPersonAdded` | `(e: PersonAddedEvent) => void` | Fired when a person is selected |
| `onPersonRemoved` | `(e: PersonRemovedEvent) => void` | Fired when a person is deselected |

### Event pattern

Person components use **custom DOM events**, not standard React callback signatures:

```typescript
// The event detail carries the PersonInfo object
<PersonPicker
  onPersonAdded={(e: PersonAddedEvent) => {
    const person: PersonInfo = e.detail;
    console.log(person.azureId, person.name);
  }}
/>
```

## Decision guide: EDS vs Fusion React

| Need | Use |
|---|---|
| Buttons, inputs, dialogs, typography, icons | `@equinor/eds-core-react` |
| Design tokens (colors, spacing) | `@equinor/eds-tokens` or EDS CSS variables |
| Person avatars, cards, pickers | `@equinor/fusion-react-person` |
| Fusion-specific side sheets | `@equinor/fusion-react-side-sheet` |
