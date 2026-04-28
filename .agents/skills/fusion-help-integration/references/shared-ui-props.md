# Shared UI Props Reference

Documents the `@fra/ui` component interfaces relevant to Fusion Help integration. These components are already implemented — **do not modify them**. This reference helps understand the prop contract.

## PageHeaderProps

Defined in `shared/ui/src/components/layout/page-layout/components/page-header/PageHeaderUtil.ts`.

```typescript
export interface PageHeaderProps {
    title: string;
    subtitle?: string;
    description?: string;
    openHelpArticle?: () => void;
    openReleaseNotes?: () => void;
    helpTooltipText?: string;
    breadcrumbs?: Breadcrumb[];
    hideDescription?: boolean;
    setHideDescription?: (hide: boolean) => void;
    collapsed?: boolean;
    covering?: boolean;
    children?: ReactNode;
}
```

### Help-relevant props

| Prop | Type | Description |
|------|------|-------------|
| `openHelpArticle` | `() => void` | Callback to open a help article. When provided, renders a `FusionHelpButton` in the header actions area. When `undefined`, no help button appears. |
| `openReleaseNotes` | `() => void` | Callback to open release notes. When provided, renders a `WhatsNewButton` in the header (only visible when header is not collapsed). |
| `helpTooltipText` | `string` | Optional tooltip text for the help button. Passed through to `FusionHelpButton`. |

### Behavior

- `PageLayout` extends `PageHeaderProps` and passes these props through to `PageHeader`
- `PageHeader` conditionally renders `FusionHelpButton` only when `openHelpArticle` is truthy
- `PageHeader` conditionally renders `WhatsNewButton` only when `openReleaseNotes` is truthy and the header is not collapsed
- The help button is wrapped in a feature announcement anchor (`fusion-help`) for the `@fra/announcements` system

## FusionHelpButtonProps

Defined in `shared/ui/src/components/common/fusion-help-button/FusionHelpButtonUtil.ts`.

```typescript
type ButtonDensity = 'comfortable' | 'compact';

export interface FusionHelpButtonProps {
    tooltipText?: string;
    openHelpArticle?: () => void;
    density?: ButtonDensity;
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tooltipText` | `string` | `''` | Tooltip shown on hover. |
| `openHelpArticle` | `() => void` | — | Click handler. When `undefined`, the button shows `no-pointer` cursor style. |
| `density` | `ButtonDensity` | `'comfortable'` | EDS density variant. |

### Visual

- Renders as a ghost icon button with the `info_circle` icon from `@equinor/eds-icons`
- Icon color: `theme.colors.interactive.primary__resting` (Equinor blue)
- Wrapped in an `EdsProvider` to apply density
- Wrapped in a `Tooltip` from `@equinor/eds-core-react`

## useHelpCenter Hook

Provided by `@equinor/fusion-framework-react-app/help-center` (external — not part of this monorepo).

```typescript
import { useHelpCenter } from '@equinor/fusion-framework-react-app/help-center';

const { openArticle, openReleaseNotes } = useHelpCenter();
```

| Return | Type | Description |
|--------|------|-------------|
| `openArticle` | `(slug: string) => void` | Opens the Fusion Help sidesheet and navigates to the article matching the slug. |
| `openReleaseNotes` | `() => void` | Opens the Fusion Help sidesheet on the release notes view. |

### Important notes

- The hook must be called inside a component that is a descendant of the Fusion Framework app shell (`makeComponent` / `renderApp`)
- `openArticle` requires a slug argument — always wrap it: `() => openArticle(slug)`
- If the slug doesn't match a published article, the sidesheet opens but shows no content (silent failure)
- The hook is available in all apps that depend on `@equinor/fusion-framework-react-app` (all apps in this monorepo)
