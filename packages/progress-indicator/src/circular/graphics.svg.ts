import { css, svg } from 'lit';

export const styles = css`
  svg {
    height: calc(var(--fwc-circular-progress-size) * 1px);
    width: calc(var(--fwc-circular-progress-size) / 1.2px);
    animation: spin 1.3s linear infinite;
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

export const graphics = svg`
  <svg 
    viewBox="0 0 48 48" 
    role="progressbar" 
    preserveAspectRatio="xMidYMid meet" 
  >
    <circle 
      cx="50%" 
      cy="50%" 
      r="22"
      fill="none" 
      stroke-width="4"
      stroke="var(--eds_infographic_primary__moss_green_13, rgba(222, 237, 238, 1))">
    </circle>
    <circle 
      cx="50%" 
      cy="50%" 
      r="22"
      fill="none" 
      stroke-width="4"
      stroke-linecap="round" 
      stroke-dasharray="48" 
      stroke="var(--eds_infographic_primary__moss_green_100, rgba(0, 112, 121, 1))">
    </circle>
  </svg>
`;

export default graphics;
