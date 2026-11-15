import { html, LitElement, type PropertyValues, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import colorSchemeAliases from './color-scheme-aliases.css';
import style from './element.css';

const FONT_ID = 'FUSION_EQUINOR_FONT';

const DARK_QUERY = '(prefers-color-scheme: dark)';

/** Colour scheme requested for `<fwc-theme>`; `system` follows the operating system preference. */
export type ColorScheme = 'light' | 'dark' | 'system';

/** Colour scheme written to the host `data-color-scheme` attribute. */
export type ResolvedColorScheme = Exclude<ColorScheme, 'system'>;

/**
 * Provides Fusion theme variables, the Equinor font and an EDS colour scheme to its children.
 *
 * Requires `@equinor/eds-tokens/css/variables` to be loaded in the document.
 * Without a `color-scheme` attribute the element inherits the colour scheme from the document
 * or an ancestor `data-color-scheme`. With the attribute it writes the resolved scheme to its own
 * `data-color-scheme` attribute so that EDS colour variables (`var(--eds-color-…)`) resolve to
 * light or dark values inside it.
 *
 * @tag fwc-theme
 *
 * @attribute {'light' | 'dark' | 'system'} color-scheme - Colour scheme for children. Omit to inherit.
 *
 * REMARKS - might unload font on disconnect
 */
export default class ThemeElement extends LitElement {
  static styles = [colorSchemeAliases, style];

  /**
   * Colour scheme for children. `system` follows `prefers-color-scheme` and updates when it changes.
   * When unset (or set to an unknown value), the scheme is inherited from the document or an ancestor.
   */
  @property({ type: String, reflect: true, attribute: 'color-scheme' })
  colorScheme?: ColorScheme;

  #mediaQuery?: MediaQueryList;

  /** Whether `data-color-scheme` was written by this element, so inheriting only removes its own value. */
  #ownsSchemeAttribute = false;

  #onSystemSchemeChange = (): void => {
    this.#applyColorScheme();
  };

  get FontLink(): HTMLLinkElement | null {
    return document.head.querySelector<HTMLLinkElement>(`link#${FONT_ID}`);
  }

  /** Colour scheme this element applies to its children, or `undefined` when it inherits. */
  get resolvedColorScheme(): ResolvedColorScheme | undefined {
    switch (this.colorScheme) {
      case 'light':
      case 'dark':
        return this.colorScheme;
      case 'system':
        return this.#mediaQuery?.matches ? 'dark' : 'light';
      default:
        return undefined;
    }
  }

  /** @override */
  connectedCallback(): void {
    super.connectedCallback();
    this.#syncColorScheme();
    !this.FontLink && this.injectFont();
  }

  /** @override */
  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#unobserveSystemScheme();
  }

  /** @override */
  protected willUpdate(changes: PropertyValues<this>): void {
    super.willUpdate(changes);
    if (changes.has('colorScheme') && this.isConnected) {
      this.#syncColorScheme();
    }
  }

  /** Observes the system preference only while `color-scheme="system"`, then applies the scheme. */
  #syncColorScheme(): void {
    if (this.colorScheme === 'system') {
      this.#observeSystemScheme();
    } else {
      this.#unobserveSystemScheme();
    }
    this.#applyColorScheme();
  }

  #observeSystemScheme(): void {
    if (this.#mediaQuery || typeof window.matchMedia !== 'function') {
      return;
    }
    this.#mediaQuery = window.matchMedia(DARK_QUERY);
    this.#mediaQuery.addEventListener('change', this.#onSystemSchemeChange);
  }

  #unobserveSystemScheme(): void {
    this.#mediaQuery?.removeEventListener('change', this.#onSystemSchemeChange);
    this.#mediaQuery = undefined;
  }

  /** Writes the resolved scheme where the EDS stylesheet expects it, or removes it to inherit. */
  #applyColorScheme(): void {
    const scheme = this.resolvedColorScheme;
    if (!scheme) {
      if (this.#ownsSchemeAttribute) {
        this.removeAttribute('data-color-scheme');
        this.#ownsSchemeAttribute = false;
      }
      return;
    }
    if (this.getAttribute('data-color-scheme') !== scheme) {
      this.setAttribute('data-color-scheme', scheme);
    }
    this.#ownsSchemeAttribute = true;
  }

  /**
   * Inject font to head of current document
   */
  protected injectFont(): void {
    const link = document.createElement('link');
    link.id = FONT_ID;
    link.href = 'https://cdn.eds.equinor.com/font/equinor-font.css';
    link.rel = 'stylesheet';
    document.head.append(link);
  }

  render(): TemplateResult {
    return html`<slot></slot>`;
  }
}
