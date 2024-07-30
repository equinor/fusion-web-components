---
'@equinor/fusion-wc-person': major
'@equinor/fusion-wc-storybook': minor
---

**New web component `fwc-person-table-cell`**

Component to display peson avatar and person details in table cell
 - Display data with azureId, upn or dataSource
 - Availability to show/hide avatar
 - Choose which details should be displayed in in both rows
 - Can use HTML as retun value displayed data
 - Choose the size of component

 ```jsx
  <fwc-person-table-cell 
    azureId="bb463b8b-b76c-4f6a-a972-665ab5730b69"
    size="medium" 
    .heading=${(person: TableCellData) => person.name`
    .subHeading=${(person: TableCellData) => `<a href="mailto:${person.mail}">${person.mail}</a>`
    showAvatar />
```
