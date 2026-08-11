# Using App Settings

Per-user app settings in Fusion Framework.

## When app settings are the right fit

Use for:
- per-user preferences that survive sessions
- view options not shared via bookmark URL
- app toggles (density, preferred tab, optional panels)

Don't use for:
- deployment/environment values — use `app.config.ts`
- shareable view state — use bookmarks
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

Default value required; stored per user per app.

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

- Stable keys — renaming needs migration plan
- JSON-serializable, small values
- Define defaults in code for new users and legacy payloads
- Stored shape is app contract; handle missing/legacy fields defensively
- Only current user can read/update own settings; don't model shared workflow state

## Review questions

When reviewing settings changes:
- Should this be a bookmark instead?
- Truly per-user, or runtime config?
- What happens if setting is missing or from older stored shape?

## Relevant sources

- Fusion docs app settings guide and hook examples
- Fusion docs app service user-settings behavior