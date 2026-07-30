import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, test } from '@playwright/test';

interface StoryIndexEntry {
  id: string;
  title: string;
  name: string;
  type: string;
}

interface StoryIndex {
  entries: Record<string, StoryIndexEntry>;
}

const indexPath = resolve(__dirname, '../../storybook-static/index.json');
const index = JSON.parse(readFileSync(indexPath, 'utf-8')) as StoryIndex;

// Docs-only entries have no renderable story; only snapshot actual stories.
const stories = Object.values(index.entries).filter((entry) => entry.type === 'story');

// These stories render non-deterministic content (real-time relative dates, or
// faker-generated data combined with live picsum.photos network images) and
// cannot produce a stable pixel baseline until the underlying story data is
// seeded/mocked. They're still smoke-tested for render, just not screenshotted.
const nonDeterministicStoryIds = new Set([
  'data-display-chip--filled',
  'data-display-daterange--relative',
  'person-people-picker--resolve-ids',
  'person-people-viewer--resolve-ids',
  'person-people-viewer--people',
  'person-people-viewer--interactive-picker',
  'person-list-item--default',
  'person-table-cell--sizes',
]);

for (const story of stories) {
  test(`${story.title} > ${story.name}`, async ({ page }) => {
    // Avoid flaky diffs from real network images (e.g. picsum.photos avatars).
    await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (route) => route.abort());

    await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);
    // Some stories (e.g. closed menus/popovers) render their root hidden by design.
    await page.waitForSelector('#storybook-root', { state: 'attached' });
    await page.waitForLoadState('networkidle');

    if (nonDeterministicStoryIds.has(story.id)) {
      return;
    }

    await expect(page).toHaveScreenshot(`${story.id}.png`);
  });
}
