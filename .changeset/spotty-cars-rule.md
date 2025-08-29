---
'@equinor/fusion-wc-person': patch
'@equinor/fusion-wc-storybook': patch
---

Update `pictureSrc` logic so that setting it to an empty string disables the image and shows only the letter avatar, regardless of `azureId` or `upn`.
