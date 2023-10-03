---
'@equinor/fusion-wc-person': minor
---

update person components

- quick update of TsDoc
- changed all avatars to person-avatars
  - added flag on avatar for `none` trigger _(prevent hover on card, select)_
  - TODO: avatars need `azureId`|`upn`, this can be resolved from `dataSource`
- minor style/css cleanup
- fixed exports from `package.json`
- created new stories
  - added FakerJS _(`azureId` as seed to persist snapshots)_
