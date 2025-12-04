// focus-controller.ts
import { ReactiveController, ReactiveControllerHost } from 'lit';

type FocusableElement = HTMLElement & { disabled?: boolean };

type FocusControllerHost = ReactiveControllerHost & Element & {
  renderRoot: HTMLElement | DocumentFragment;
}

export class FocusController implements ReactiveController {
  host: FocusControllerHost;
  private previouslyFocusedElement: HTMLElement | null = null;
  private focusableElements: FocusableElement[] = [];
  private firstFocusable: FocusableElement | null = null;
  private lastFocusable: FocusableElement | null = null;

  // Optional: element to focus when trap activates
  private initialFocusElement?: () => FocusableElement | null | undefined;

  constructor(
    host: FocusControllerHost,
    options?: {
      initialFocusElement?: () => FocusableElement | null | undefined;
    }
  ) {
    this.host = host;
    this.initialFocusElement = options?.initialFocusElement;
    host.addController(this);
  }

  hostConnected() {
    // Small delay to ensure DOM is rendered
    queueMicrotask(() => this.trapFocus());
  }

  hostDisconnected() {
    this.releaseFocus();
  }

  private getFocusableElements(): FocusableElement[] {
    const selector = `
      button:not([disabled]):not([tabindex="-1"]),
      [href]:not([disabled]),
      input:not([disabled]),
      select:not([disabled]),
      textarea:not([disabled]),
      [tabindex]:not([tabindex="-1"]),
      [contenteditable]:not([disabled])
    `.replace(/\s+/g, '');

    return Array.from(this.host.renderRoot.querySelectorAll(selector))
      .filter(el => {
        const element = el as FocusableElement;
        return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement;
      }) as FocusableElement[];
  }

  private handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      this.focusableElements = this.getFocusableElements();
      if (this.focusableElements.length === 0) return;

      this.firstFocusable = this.focusableElements[0];
      this.lastFocusable = this.focusableElements[this.focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === this.firstFocusable) {
          this.lastFocusable!.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === this.lastFocusable) {
          this.firstFocusable!.focus();
          e.preventDefault();
        }
      }
    }

    // Optional: close on Escape
    if (e.key === 'Escape') {
      this.host.dispatchEvent(new CustomEvent('close-request', { bubbles: true, composed: true }));
    }
  };

  trapFocus() {
    this.previouslyFocusedElement = document.activeElement as HTMLElement;

    document.addEventListener('keydown', this.handleKeydown);

    queueMicrotask(() => {
      const elToFocus = this.initialFocusElement?.() ?? this.host;
      const focusTarget = elToFocus && 'focus' in elToFocus ? elToFocus : this.getFocusableElements()[0];
      focusTarget?.focus();
    });
  }

  releaseFocus() {
    document.removeEventListener('keydown', this.handleKeydown);
    this.previouslyFocusedElement?.focus();
    this.previouslyFocusedElement = null;
  }
}
