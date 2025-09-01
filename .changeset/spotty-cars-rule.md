---
'@equinor/fusion-wc-person': minor
'@equinor/fusion-wc-storybook': patch
---

- Added a new `showLetter` boolean property to `PersonAvatarElement`.
- When `showLetter` is true, the avatar displays the first letter of the person's name instead of an image.
- Updated storybook on the following property

**Usage Example:**
```html
<fwc-person-avatar showLetter ...></fwc-person-avatar>
```
