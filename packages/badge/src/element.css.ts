import { css, unsafeCSS } from 'lit-element';
import { styles as theme } from '@equinor/fusion-web-theme';

export const style = css`
  :host {
    position: absolute;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    overflow: hidden;
    color: #fff;
    z-index: 1;
  }
  :host([size='small']:not([icon])) {
    padding: 0 0.2rem;
  }
  :host([size='medium']:not([icon])) {
    padding: 0 0.35rem;
  }
  :host([size='large']:not([icon])) {
    padding: 0 0.5rem;
  }
  :host([size='small']) {
    min-width: 1rem;
    height: 1rem;
    font-size: 0.5rem;
    border-radius: 0.5rem;
  }
  :host([size='medium']) {
    min-width: 1.5rem;
    height: 1.5rem;
    font-size: 0.75rem;
    border-radius: 0.75rem;
  }
  :host([size='large']) {
    min-width: 2rem;
    height: 2rem;
    font-size: 1rem;
    border-radius: 1rem;
  }
  :host([position='top-left']:not([circular])) {
    transform: scale(1) translate(-25%, -25%);
  }
  :host([position='top-right']:not([circular])) {
    transform: scale(1) translate(25%, -25%);
  }
  :host([position='bottom-left']:not([circular])) {
    transform: scale(1) translate(-25%, 25%);
  }
  :host([position='bottom-right']:not([circular])) {
    transform: scale(1) translate(25%, 25%);
  }
  :host([position='top-left'][circular]) {
    transform: scale(1) translate(-15%, -15%);
  }
  :host([position='top-right'][circular]) {
    transform: scale(1) translate(15%, -15%);
  }
  :host([position='bottom-left'][circular]) {
    transform: scale(1) translate(-15%, 15%);
  }
  :host([position='bottom-right'][circular]) {
    transform: scale(1) translate(15%, 15%);
  }
  :host([position='top-left']) {
    top: 0;
    left: 0;
    transform-origin: 0% 0%;
  }
  :host([position='top-right']) {
    top: 0;
    right: 0;
    transform-origin: 0% 100%;
  }
  :host([position='bottom-left']) {
    bottom: 0;
    left: 0;
    transform-origin: 0% 100%;
  }
  :host([position='bottom-right']) {
    bottom: 0;
    right: 0;
    transform-origin: 100% 100%;
  }
  :host([color='primary']) {
    background-color: ${unsafeCSS(theme.colors.interactive.primary__resting.getVariable('color'))};
  }
  :host([color='secondary']) {
    background-color: ${unsafeCSS(theme.colors.infographic.primary__energy_red_100.getVariable('color'))};
  }
`;

export default style;
