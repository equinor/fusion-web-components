import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import test from 'node:test';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const previewHead = readFileSync(new URL('./preview-head.html', import.meta.url), 'utf8');
const markup = previewHead.replace(/<!--[\s\S]*?-->/g, '');
const edsVariablesPath = require.resolve('@equinor/eds-tokens/css/variables');
const edsVariables = readFileSync(edsVariablesPath, 'utf8');
// The token JSON files are not reachable through the package's export map from Node.
const readEdsTokens = (scheme) =>
  JSON.parse(
    readFileSync(
      new URL(
        `../json/color/color-scheme/flat/${scheme}-semantic.json`,
        pathToFileURL(edsVariablesPath),
      ),
      'utf8',
    ),
  );
const lightTokens = readEdsTokens('light');
const darkTokens = readEdsTokens('dark');

test('preview selects the EDS light colour scheme on <html>', () => {
  const htmlTags = markup.match(/<html\b[^>]*>/g) ?? [];
  assert.deepEqual(htmlTags, ['<html data-color-scheme="light">']);
  assert.doesNotMatch(markup, /<script|<\/html>|color-scheme:|prefers-color-scheme/);
});

/** Render an EDS colour variable in a dark-preferring page, as Storybook's preview iframe would. */
const renderEdsColor = async (browser, head, variable) => {
  const page = await browser.newPage({ colorScheme: 'dark' });
  try {
    await page.route('**/*', (route) => route.abort());
    await page.setContent(
      `<!doctype html><html lang="en"><head>${head}<style>${edsVariables}</style></head>` +
        `<body><div id="probe" style="background-color: var(${variable})"></div></body></html>`,
    );
    return await page.$eval('#probe', (el) => getComputedStyle(el).backgroundColor);
  } finally {
    await page.close();
  }
};

const toRgb = (hex) => {
  const [r, g, b] = hex.match(/[0-9a-f]{2}/gi).map((part) => Number.parseInt(part, 16));
  return `rgb(${r}, ${g}, ${b})`;
};

test('EDS CSS variables render their light values when the browser prefers dark', async () => {
  const light = toRgb(lightTokens['bg-neutral-canvas']);
  const dark = toRgb(darkTokens['bg-neutral-canvas']);
  assert.notEqual(light, dark);

  const browser = await chromium.launch();
  try {
    assert.equal(await renderEdsColor(browser, '', '--eds-color-bg-canvas'), dark);
    assert.equal(await renderEdsColor(browser, previewHead, '--eds-color-bg-canvas'), light);
  } finally {
    await browser.close();
  }
});
