# Wiring Pattern Reference

Canonical code patterns extracted from the three apps that have integrated Fusion Help.

## Constants File

Each app defines a `FUSION_HELP_ARTICLES` object mapping page concepts to slug strings.

### Prefixed convention (recommended for new apps)

```typescript
// apps/fra-access-manager/src/constants/fusionHelpArticles.ts
export const FUSION_HELP_ARTICLES = {
    ACCESS_GROUP: 'fra-access-manager-access-groups',
    ASSIGNMENTS: 'fra-access-manager-assignments',
    ROLE_DEFINITIONS: 'fra-access-manager-role-definitions',
};
```

```typescript
// apps/personnel-allocation/src/pages/helpArticles.ts
export const FUSION_HELP_ARTICLES = {
    OVERVIEW: 'personnel-allocation-overview',
    CHANGE_NOTIFICATIONS: 'personnel-allocation-change-notifications',
    PERSONNEL: 'personnel-allocation-personnel',
    RELEVANT_REQUEST: 'personnel-allocation-relevant-requests',
    RELEVANT_UNITS: 'personnel-allocation-relevant-units',
    RELEVANT_SUMMARY_REPORTS: 'personnel-allocation-relevant-summary-reports',
    ROUTING: 'personnel-allocation-request-routing',
    REQUESTS: 'personnel-allocation-requests',
    SECOND_OPINION: 'personnel-allocation-second-opinion',
    SELECT_DEPARTMENT: 'personnel-allocation-select-department',
    SUMMARY_REPORTS: 'personnel-allocation-summary-reports',
    UNASSIGNED_REQUESTS: 'personnel-allocation-unassigned-requests',
    ACCESS_RESPONSIBILITY: 'personnel-allocation-access-responsibility',
    DEPARTMENT_GROUPS: 'personnel-allocation-department-groups',
    NEW_DEPARTMENT_GROUP: 'personnel-allocation-new-department-group',
    DEPARTMENT_GROUP_OVERVIEW: 'personnel-allocation-department-group-overview',
};
```

### Unprefixed convention (existing in fra-app-management)

```typescript
// apps/fra-app-management/src/constants/helpArticles.ts
export const FUSION_HELP_ARTICLES = {
    OVERVIEW: 'overview',
    REQUESTS: 'requests',
    REQUEST: 'request',
    PERSON: 'person',
    WORKDAY: 'workday',
    PIMS: 'pims',
    PIMS_PROJECT_SYNC_LOG: 'pims-project-sync-log',
    ORPHANED_REQUESTS: 'orphaned-requests',
    ORPHANED_TASKS: 'orphaned-tasks',
    PROJECTS: 'projects',
    PROJECT: 'project',
    DEPARTMENTS: 'departments',
    DEPARTMENT: 'department',
    TASKS: 'tasks',
    TASK: 'task',
    TASKS_IMPORT: 'tasks-import',
    DRAFTS: 'drafts',
    PROJECTS_CONFIGURATIONS: 'projects-configurations',
};
```

## Page Component Wiring

### Full example (with release notes)

```tsx
import { useHelpCenter } from '@equinor/fusion-framework-react-app/help-center';
import { type FC } from 'react';

import { PageLayout } from '@fra/ui';

import { FUSION_HELP_ARTICLES } from '@/constants/helpArticles';

const OverviewPage: FC = () => {
    const { openArticle, openReleaseNotes } = useHelpCenter();

    return (
        <PageLayout
            title="Overview"
            description="High-level summary of resource allocation activity."
            openHelpArticle={() => openArticle(FUSION_HELP_ARTICLES.OVERVIEW)}
            openReleaseNotes={openReleaseNotes}
        >
            {/* page content */}
        </PageLayout>
    );
};

export default OverviewPage;
```

### Without release notes

```tsx
import { useHelpCenter } from '@equinor/fusion-framework-react-app/help-center';
import { type FC } from 'react';

import { PageLayout } from '@fra/ui';

import { FUSION_HELP_ARTICLES } from '@/constants/fusionHelpArticles';

const AccessGroupsPage: FC = () => {
    const { openArticle } = useHelpCenter();

    return (
        <PageLayout
            title="Access Groups"
            openHelpArticle={() => openArticle(FUSION_HELP_ARTICLES.ACCESS_GROUP)}
        >
            {/* page content */}
        </PageLayout>
    );
};

export default AccessGroupsPage;
```

### With breadcrumbs and error handling (real-world complexity)

```tsx
import { useHelpCenter } from '@equinor/fusion-framework-react-app/help-center';
import { type FC } from 'react';

import { PageLayout } from '@fra/ui';

import { FUSION_HELP_ARTICLES } from '@/constants/helpArticles';

const TasksPage: FC = () => {
    const { openArticle, openReleaseNotes } = useHelpCenter();

    // ... data fetching hooks, breadcrumbs, etc.

    return (
        <PageLayout
            title="Tasks"
            openReleaseNotes={openReleaseNotes}
            breadcrumbs={breadcrumbs}
            openHelpArticle={() => openArticle(FUSION_HELP_ARTICLES.TASKS)}
            fullPageError={tasksError || projectsError}
            resetErrorBoundary={tasksError && refetchTasks}
            description="Manage tasks across projects."
        >
            {/* page content */}
        </PageLayout>
    );
};

export default TasksPage;
```

## Import Order

Per project ESLint rules (`simple-import-sort`), imports must be grouped:

```typescript
// 1. External packages
import { useHelpCenter } from '@equinor/fusion-framework-react-app/help-center';
import { type FC } from 'react';

// 2. Internal shared packages
import { PageLayout } from '@fra/ui';

// 3. Path-aliased local imports
import { FUSION_HELP_ARTICLES } from '@/constants/helpArticles';

// 4. Relative imports
import styles from './MyPage.module.css';
```

Each group separated by a blank line. Use inline `type` keyword for type-only imports.

## Key Rules

1. **`openHelpArticle` must be a callback wrapper**: `() => openArticle(slug)`, not `openArticle` directly
2. **Slugs must match published articles** — use `fhelp` CLI or the Help API to verify
3. **One `useHelpCenter()` call per page** — destructure at the top of the component
4. **`PageLayout` conditionally renders the help button** — if `openHelpArticle` is `undefined`, no button appears
