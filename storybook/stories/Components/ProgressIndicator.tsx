import extractProps from './extract-props';

import { StarProgressElement, StarProgressElementProps } from '@equinor/fusion-wc-progress-indicator';
StarProgressElement;

export const StarIndicator = ({ children, ...props }: React.PropsWithChildren<StarProgressElement>): JSX.Element => {
  return <fwc-star-progress {...extractProps<StarProgressElementProps>(props)}>{children}</fwc-star-progress>;
};
