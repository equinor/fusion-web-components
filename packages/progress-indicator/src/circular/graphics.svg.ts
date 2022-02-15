import { css, svg } from 'lit';

export const styles = css`
  svg {
    height: calc(var(--fwc-circular-progress-size) * 1px);
    width: calc(var(--fwc-circular-progress-size) / 1.2px);
    animation: spin 1.3s linear infinite;
  }
  .track {
    stroke: var(--fwc-circular-progress-track-color);
  }
  .progress {
    stroke: var(--fwc-circular-progress-color);
  }
  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const thickness = 4;

export const graphics = svg`
  <svg 
    viewBox="0 0 48 48" 
    role="progressbar" 
    preserveAspectRatio="xMidYMid meet" 
  >
    <circle 
      cx="50%" 
      cy="50%" 
      r="${(48 - thickness) / 2}"
      fill="none" 
      stroke-width="${thickness}"
      class="track">
    </circle>
    <circle 
      cx="50%" 
      cy="50%" 
      r="${(48 - thickness) / 2}"
      fill="none" 
      stroke-width="${thickness}"
      stroke-linecap="round" 
      stroke-dasharray="48" 
      class="progress">
    </circle>
  </svg>
`;

export default graphics;
