import { CSSResult, css } from 'lit';
import { styles as buttonStyle } from '../button/element.css';

const style: CSSResult = css`
  :host {
  }
`;

export const styles = [buttonStyle, style];

export default styles;
