import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { after, before, test } from 'node:test';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const source = readFileSync(
  new URL('../../packages/people/src/components/list/element.css.ts', import.meta.url),
  'utf8',
);
const template = readFileSync(
  new URL('../../packages/people/src/components/list/element.ts', import.meta.url),
  'utf8',
);
// Exercise the production layout CSS without importing Lit or fetching person data.
// Theme interpolations only supply colours, which do not affect these geometry assertions.
const styles = source.match(/css`([\s\S]*?)`;/)?.[1].replace(/\$\{[\s\S]*?\}/g, 'transparent');
assert.ok(styles, 'Expected the people list stylesheet');
let browser;

before(async () => {
  browser = await chromium.launch();
});
after(async () => {
  await browser?.close();
});

test('the component renders the footer after, not inside, the scroll container', () => {
  assert.match(template, /<\/ul>\s*<\/div>\s*\$\{this.renderTotalCount\(\)\}/);
});

for (const count of [1, 12]) {
  for (const width of [225, 400]) {
    test(`${count} results at ${width}px leave names unobstructed by the footer`, async () => {
      const page = await browser.newPage();
      try {
        await page.route('**/*', (route) => route.abort());
        await page.setContent('<div id="host"></div>');
        await page.evaluate(({ styles, count, width }) => {
          const host = document.querySelector('#host');
          host.style.cssText = `width: ${width}px; font: 16px sans-serif;`;
          const root = host.attachShadow({ mode: 'open' });
          // Fixed-height result rows isolate the footer/scroll relationship from avatar loading.
          root.innerHTML = `<style>${styles}
            li { height: 48px; display: flex; align-items: center; }
            </style>
            <div id="root">
              <div id="list" class="active" style="max-height: 250px;">
                <ul>${Array.from({ length: count }, (_, i) =>
                  `<li><span>Service Principal ${i + 1}</span></li>`).join('')}</ul>
              </div>
              <div id="search-meta">
                <p>Displaying ${count}/${count} results</p> |
                <label title="Include system accounts in search results">
                  <input type="checkbox"> System accounts
                </label>
              </div>
            </div>`;
        }, { styles, count, width });

        const geometry = () => page.evaluate(() => {
          const root = document.querySelector('#host').shadowRoot;
          const list = root.querySelector('#list');
          const footer = root.querySelector('#search-meta');
          const row = root.querySelector('li:last-child');
          const listRect = list.getBoundingClientRect();
          const footerRect = footer.getBoundingClientRect();
          const rowRect = row.getBoundingClientRect();
          return {
            listBottom: listRect.bottom,
            footerTop: footerRect.top,
            rootBottom: root.querySelector('#root').getBoundingClientRect().bottom,
            footerBottom: footerRect.bottom,
            rowTop: rowRect.top,
            rowBottom: rowRect.bottom,
            listTop: listRect.top,
            scrollHeight: list.scrollHeight,
            clientHeight: list.clientHeight,
            rowHit: row.contains(root.elementFromPoint(
              rowRect.left + rowRect.width / 2, rowRect.top + rowRect.height / 2,
            )),
          };
        });
        const initial = await geometry();
        assert.ok(initial.footerTop >= initial.listBottom, 'Footer must not overlay the results');
        assert.ok(initial.rootBottom >= initial.footerBottom, 'Footer must reserve normal-flow space');
        assert.equal(initial.scrollHeight > initial.clientHeight, count > 1);

        await page.evaluate(() => {
          const list = document.querySelector('#host').shadowRoot.querySelector('#list');
          list.scrollTop = list.scrollHeight;
        });
        const scrolled = await geometry();
        assert.equal(scrolled.footerTop, initial.footerTop, 'Footer must stay outside the scrolling content');
        assert.ok(scrolled.rowTop >= scrolled.listTop, 'Last result must be fully visible');
        assert.ok(scrolled.rowBottom <= scrolled.listBottom, 'Last result must fit above the footer');
        assert.ok(scrolled.rowHit, 'The last result must not be covered by the footer');
      } finally {
        await page.close();
      }
    });
  }
}
