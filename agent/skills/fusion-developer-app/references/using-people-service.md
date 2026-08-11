# Using the Fusion People Service

Fusion People API: people discovery, person details, integration.

**Source**: `@equinor/fusion-react-person` + Fusion Framework people service
**Storybook**: [equinor.github.io/fusion-react-components — person](https://equinor.github.io/fusion-react-components/?path=/docs/person-docs--docs)

## When to use the people service

Use when:
- search/pick people (assignees, owners, reviewers)
- display name, avatar, department, role
- show manager/reporting relationship
- person column in AG Grid

Most cases: `@equinor/fusion-react-person` components handle it — provide `azureId`, they resolve the rest.

## The preferred path: let components resolve people

Components resolve via `azureId` (preferred) or `upn`. `azureId` is stable, unambiguous.

```typescript
import { PersonAvatar, PersonCard, PersonListItem } from '@equinor/fusion-react-person';

// Correct — pass azureId, let the component resolve the rest
<PersonAvatar azureId={item.ownerAzureId} />
<PersonCard azureId={item.ownerAzureId} />
<PersonListItem azureId={item.ownerAzureId} />
```

Don't fetch person data manually and pass as props — components handle loading, caching, errors.

See `references/using-fusion-react-components.md` for full component usage examples (pickers, card, list item, ag-grid cell).

## Storing person references

Store only `azureId` in data model. Resolve display at render via components.

```typescript
// Data layer — store azureId only
interface WorkItem {
  id: string;
  title: string;
  ownerAzureId: string; // Azure AD object ID (UUID)
}

// UI layer — resolve at render time
<PersonCard azureId={item.ownerAzureId} />
```

Don't cache or persist resolved `PersonInfo` objects — components re-resolve from the API.

## People search via PersonPicker / PeoplePicker

For user selection, use picker components — query API automatically on input.

```typescript
import { PersonPicker, type PersonInfo } from '@equinor/fusion-react-person';
import { useState } from 'react';

// Single-person picker
const AssigneeField = ({
  onSelect,
}: {
  onSelect: (azureId: string) => void;
}) => {
  const [person, setPerson] = useState<PersonInfo | null>(null);
  return (
    <PersonPicker
      person={person}
      placeholder="Search for a person…"
      subtitle="jobTitle"
      onPersonAdded={(e) => {
        setPerson(e.detail);
        onSelect(e.detail.azureId);
      }}
      onPersonRemoved={() => {
        setPerson(null);
        onSelect('');
      }}
    />
  );
};
```

> **Event pattern**: picker components use custom DOM events (`PersonAddedEvent`, `PersonRemovedEvent`). Access the person via `e.detail`, not the argument directly.

## Integration points

| Need | Component / hook |
|---|---|
| Display a person (avatar, hover details) | `PersonAvatar` |
| Full person detail (card, panel) | `PersonCard` |
| Person in a list row | `PersonListItem` |
| Person in an AG Grid column | `PersonCell` |
| Let user pick one person | `PersonPicker` or `PersonSelect` |
| Let user pick multiple people | `PeoplePicker` |
| Display a selected collection | `PeopleViewer` |

## System accounts

Person search excludes system accounts by default. To include (e.g. service principals):

```typescript
<PersonPicker
  systemAccounts={true}
  onPersonAdded={(e) => onSelect(e.detail.azureId)}
  onPersonRemoved={() => onSelect('')}
/>
```

## Non-goals

- **Do not** build a custom people API client using `useHttpClient` — the framework and components handle this internally.
- **Do not** manage people search state manually — the picker components handle input, debouncing, and results.
- **Do not** pass `PersonInfo` objects directly into non-picker components — pass `azureId` and let the component resolve.
