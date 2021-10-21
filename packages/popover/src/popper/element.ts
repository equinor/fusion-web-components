import { html, TemplateResult } from 'lit';
import style from './element.css';

export type PopperElementProps = {};

/**
 * Element wrapper for Tippy.js
 */
export class PopperElement extends HTMLDivElement implements PopperElementProps {
  static styles = [style];

  render(): TemplateResult {
    return html`<div><slot></slot></div>`;
  }
}

export default PopperElement;
