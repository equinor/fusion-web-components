import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isFailedAvatarUrl, resolveFailedAvatarUrl } from '../lib/utils.js';

test('a custom failed avatar stays fixed even when its colour matches the resolved default', () => {
  const danger = 'var(--test-danger)';
  globalThis.document = { documentElement: {} };
  globalThis.getComputedStyle = () => ({
    getPropertyValue: (variable) =>
      variable === '--eds-color-bg-danger-fill-emphasis-default' ? danger : 'var(--test-surface)',
  });

  const customUrl = resolveFailedAvatarUrl(danger);
  const defaultUrl = resolveFailedAvatarUrl();

  assert.equal(isFailedAvatarUrl(customUrl), false);
  assert.equal(isFailedAvatarUrl(defaultUrl), true);
});
