# styled-components Patterns

How to use styled-components for custom styling in a Fusion Framework app.

## The `Styled` object pattern

Co-locate styled components at the top of the file in a `Styled` namespace object:

```typescript
import { styled } from 'styled-components';
import { Typography } from '@equinor/eds-core-react';

const Styled = {
  Root: styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
  `,
  Title: styled(Typography)`
    color: var(--eds-color-text-neutral-strong);
  `,
};
```

Then use in the component:

```typescript
const MyComponent = () => (
  <Styled.Root>
    <Styled.Title variant="h2">Hello</Styled.Title>
  </Styled.Root>
);
```

**Why this pattern:**
- Groups all styled elements visually at the top
- Clear namespace avoids collision with imported components
- Easy to scan which elements have custom styling

## Using EDS tokens in styled-components

### CSS custom properties (preferred)

```typescript
const Styled = {
  Card: styled.div`
    background: var(--eds-color-bg-neutral-surface);
    border-radius: var(--eds-shape-corners-border-radius);
    padding: var(--eds-spacing-comfortable-medium);
  `,
};
```

### JS token imports

```typescript
import { tokens } from '@equinor/eds-tokens';

const Styled = {
  Card: styled.div`
    background: ${tokens.colors.ui.background__default.rgba};
    border-radius: ${tokens.shape.corners.borderRadius};
    padding: ${tokens.spacings.comfortable.medium};
    box-shadow: ${tokens.elevation.raised};
  `,
};
```

## Extending EDS components

Wrap EDS components with `styled()` when you need additional layout or theme tweaks:

```typescript
import { Button, Dialog } from '@equinor/eds-core-react';

const Styled = {
  WideButton: styled(Button)`
    min-width: 200px;
  `,
  FullWidthDialog: styled(Dialog)`
    width: 90vw;
    max-width: 800px;
  `,
};
```

## Responsive design

Use standard CSS media queries inside styled-components:

```typescript
const Styled = {
  Grid: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
    }
  `,
};
```

## What NOT to do

- **No CSS Modules** (`.module.css` files) unless the project explicitly uses them
- **No global CSS files** (`.css` imports) for component styling
- **No Tailwind or utility-class libraries** unless the project adopts them
- **No Emotion, Stitches, or other CSS-in-JS alternatives** in Fusion apps
- **No inline styles for reusable patterns** — extract to `Styled` object instead
- **No hardcoded colors or spacing** — use EDS tokens (see `styling-with-eds.md`)
