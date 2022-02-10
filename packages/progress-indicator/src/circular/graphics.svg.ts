import { css, svg } from 'lit';

export const styles = css`
  svg {
    height: calc(var(--fwc-progress-indicator-size) * 1px);
    width: calc(var(--fwc-progress-indicator-size) / 1.2px);
  }
  circle {
    cx: calc(var(--fwc-progress-indicator-size) * 1px);
    cy: calc(var(--fwc-progress-indicator-size) / 1.2px);
  }
  .graphics path {
    animation: indicator_animation 1.3s linear infinite;
  }

  @keyframes indicator_animation {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const graphics = svg`
  <svg 
    viewBox="24 24 48 48" 
    role="progressbar" 
    preserveAspectRatio="xMidYMid meet" 
    class="CircularProgress__Svg"
  >
    <circle 
      cx="48" 
      cy="48" 
      r="22" 
      fill="none" 
      stroke-width="4" 
      stroke="var(--eds_infographic_primary__moss_green_13, rgba(222, 237, 238, 1))" 
      class="CircularProgress__TrackCircle">
    </circle>
    <circle 
      cx="48" 
      cy="48" 
      r="22" 
      fill="none" 
      stroke-linecap="round" 
      stroke-width="4" 
      stroke-dasharray="48" 
      stroke="var(--eds_infographic_primary__moss_green_100, rgba(0, 112, 121, 1))" 
      class="CircularProgress__ProgressCircle">
    </circle>
  </svg>
`;

export default graphics;
