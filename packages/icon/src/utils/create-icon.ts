import { svg, SVGTemplateResult } from 'lit';
import * as edsIcons from '@equinor/eds-icons';
import { IconData } from '@equinor/eds-icons';

export type IconName = keyof typeof edsIcons | string;

export const iconNames = Object.keys(edsIcons);

export enum IconType {
  EDS = 'eds',
}

export const createSvg = ({ height, width, svgPathData }: IconData): SVGTemplateResult => svg`
  <svg viewBox="0 0 ${width} ${height}">
    <path fill-rule="evenodd" clip-rule="evenodd" d="${svgPathData}"></path>
  </svg>
`;

export const createIcon = (name: IconName, type: IconType = IconType.EDS): SVGTemplateResult => {
  switch (type) {
    case IconType.EDS:
      return createSvg(edsIcons[name as keyof typeof edsIcons]);
  }
};

export default createIcon;
