# Using Framework Modules

How to access Fusion Framework modules (context, auth, navigation, feature flags, settings, environment, bookmarks, analytics) in components.

## Module access patterns

Most module hooks are available from sub-path imports of `@equinor/fusion-framework-react-app`. Runtime config access is currently exposed from the package root:

```typescript
import { useAppEnvironmentVariables, useAppModule } from '@equinor/fusion-framework-react-app'; // root exports
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';       // HTTP
import { useCurrentContext } from '@equinor/fusion-framework-react-app/context'; // context
import { useCurrentAccount } from '@equinor/fusion-framework-react-app/msal';   // auth
import { useRouter } from '@equinor/fusion-framework-react-app/navigation';     // routing
import { useFeature } from '@equinor/fusion-framework-react-app/feature-flag';  // flags
import { useAppSetting } from '@equinor/fusion-framework-react-app/settings';   // settings
import { useCurrentBookmark } from '@equinor/fusion-framework-react-app/bookmark'; // bookmark
import { useTrackFeature } from '@equinor/fusion-framework-react-app/analytics'; // analytics
```

## Context

Access the current Fusion context (project, facility, etc.):

```typescript
import { useCurrentContext } from '@equinor/fusion-framework-react-app/context';

const MyComponent = () => {
  const context = useCurrentContext();
  if (!context) return <p>No context selected</p>;
  return <p>Selected: {context.title}</p>;
};
```

## Authentication (MSAL)

The MSAL module is configured by the host portal — apps only consume the hooks:

```typescript
import { useCurrentAccount, useAccessToken } from '@equinor/fusion-framework-react-app/msal';

const UserInfo = () => {
  const user = useCurrentAccount();
  const { token } = useAccessToken({ scopes: ['User.Read'] });

  if (!user) return <p>Not signed in</p>;
  return <p>Welcome, {user.name}</p>;
};
```

## Navigation

```typescript
import { useRouter, useNavigationModule } from '@equinor/fusion-framework-react-app/navigation';

const MyComponent = () => {
  const router = useRouter();
  // router.navigate('/path')
};
```

## Feature flags

```typescript
import { useFeature } from '@equinor/fusion-framework-react-app/feature-flag';

// In config.ts — enable a flag
configurator.enableFeatureFlag({ key: 'new-dashboard', title: 'New Dashboard' });

// In components — read the flag
const MyComponent = () => {
  const [isEnabled] = useFeature('new-dashboard');
  if (!isEnabled) return null;
  return <NewDashboard />;
};
```

## App settings

Per-user settings stored by the Fusion platform:

```typescript
import { useAppSetting, useAppSettings } from '@equinor/fusion-framework-react-app/settings';

const MyComponent = () => {
  const [theme, setTheme] = useAppSetting('theme', 'light');
  // theme is the current value, setTheme persists a new value
};
```

Use app settings for per-user preferences that should survive between sessions. See `using-settings.md` for how to decide between settings, bookmarks, and runtime config.

## Environment variables

Access runtime configuration from `app.config.ts`:

```typescript
import { useAppEnvironmentVariables } from '@equinor/fusion-framework-react-app';

const MyComponent = () => {
  const { value, complete, error } = useAppEnvironmentVariables();
  // value contains keys defined in app.config.ts environment: {}
};
```

Use `app.config.ts` for deployment-specific values and endpoint definitions. See `using-assets-and-environment.md` for config/file-placement guidance.

## Bookmarks

```typescript
import { useCurrentBookmark } from '@equinor/fusion-framework-react-app/bookmark';
```

Use bookmarks for shareable, restorable view state such as filters, selected tabs, and dashboard layout. Prefer `useCurrentBookmark` for new work. See `using-bookmarks.md` for module setup and payload guidance.

## Analytics

```typescript
import { useEffect } from 'react';
import { useTrackFeature } from '@equinor/fusion-framework-react-app/analytics';

const DashboardPage = () => {
  const trackFeature = useTrackFeature();

  useEffect(() => {
    trackFeature('dashboard-page-loaded');
  }, [trackFeature]);

  return null;
};
```

The portal provides analytics support out of the box. Use the hook for feature and interaction events, and see `using-analytics.md` for event design and local testing guidance.

## Generic module access

Access any module by key when a dedicated hook is not available:

```typescript
import { useAppModule, useAppModules } from '@equinor/fusion-framework-react-app';

const auth = useAppModule('auth');
const allModules = useAppModules();
```
