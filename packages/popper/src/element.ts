import { LitElement, html, TemplateResult } from 'lit';
import { PopperContent } from './types';
import style from './element.css';

export type PopperElementProps = {};

/**
 * Element wrapper for Tippy.js
 */
export class PopperElement extends LitElement implements PopperElementProps {
  static styles = [style];

  content?: PopperContent;

  setContent(content: PopperContent) {
    this.content = content;
  }

  render(): TemplateResult {
    console.log('!!!render popper!!!');
    return html`HELLO`;
  }
}

export default PopperElement;
