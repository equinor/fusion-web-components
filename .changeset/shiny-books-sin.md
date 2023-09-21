---
'@equinor/fusion-wc-person': major
---

re-align person component

## Highlight

> all elements can resolve by either providing `azureId` or `upn`
>
> _note, missing setting photo source by data source_

- **all elements can resolve by either providing `azureId` or `upn`**
- **only resolve when intersected in the DOM**
- **major rework of styling**

## Components

### Avatar
element which renders a person avatar.
by default when hovering an avatar the person card is shown

### Card
element which shows detailed information about a user

### List item
element to display a user as a list item

### search
Drop down selector of person element

### Task
added tasks for rendering person data source async. These jobs emits events that are handled by the closes provider

- info
- detail
- photo
- search

### Provider

element which listens for task events to process, this element should have a `resolver` which executes the query of the event dispatcher.

```ts
export interface PersonResolver {
  getDetails?: (args: ResolverArgs<AzureIdOrUpnObj>) => ResolverResult<PersonDetails>;
  getInfo?: (args: ResolverArgs<AzureIdOrUpnObj>) => ResolverResult<PersonInfo>;
  getPhoto?: (args: ResolverArgs<AzureIdOrUpnObj>) => ResolverResult<string>;
  search?: (args: ResolverArgs<{ search: string }>) => ResolverResult<PersonSearchResult>;
}
```