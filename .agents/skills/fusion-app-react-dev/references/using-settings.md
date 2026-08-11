# Using App Settings

How to persist per-user application settings in a Fusion Framework app.

## When app settings are the right fit

Use app settings for:
- preferences that belong to one user and should survive between sessions
- view options that are not meant to be shared via a bookmark URL
- application-specific toggles such as density, preferred tab, or optional UI panels

Do not use app settings for:
- deployment or environment-specific values, which belong in `app.config.ts`
- shareable or support-reproducible view state, which belongs in bookmarks
- secrets, access tokens, or large cached API responses

## Basic hook

```typescript
import { useAppSetting } from '@equinor/fusion-framework-react-app/settings';

const ToggleFunMode = () => {
  const [funMode, setFunMode] = useAppSetting('fun_mode', false);

  return (
    <Button onClick={() => setFunMode((current) => !current)}>
      {funMode ? 'No more fun' : 'Have more fun'}
    </Button>
  );
};
```

Pass a default value when the setting may not exist yet. The stored value is scoped per user per app.

## Read all settings

```typescript
import { useAppSettings } from '@equinor/fusion-framework-react-app/settings';

const SettingsDebug = () => {
  const [settings] = useAppSettings();
  return <pre>{JSON.stringify(settings, null, 2)}</pre>;
};
```

## Where settings fit in the app model

| Concern | Store it in |
|---|---|
| Per-user preference that should persist between sessions | App settings |
| Shareable view state for support or collaboration | Bookmarks |
| Deployment-specific URLs, scopes, log levels | `app.config.ts` |
| Temporary component state | React state |

## Design guidance

- Keep keys stable. Existing user settings survive releases, so renaming keys needs a migration plan.
- Keep values JSON-serializable and small.
- Define defaults in code so new users and older stored payloads both work.
- Treat the stored shape as an app contract. If the shape changes, handle missing or legacy fields defensively.
- Only the current user can read and update their own app settings. Do not model shared workflow state here.

## Review questions

When reviewing a settings change, ask:
- Should this be a bookmark instead of a setting?
- Is the setting truly per-user, or is it runtime config?
- What happens if the setting is missing or comes from an older stored shape?

## Relevant sources

- Fusion docs app settings guide and hook examples
- Fusion docs app service user-settings behavior