import extractProps from './extract-props';

import {
  StarProgressElement,
  StarProgressElementProps,
  CircularProgressElement,
  CircularProgressElementProps,
} from '@equinor/fusion-wc-progress-indicator';
StarProgressElement;

export const StarIndicator = ({ children, ...props }: React.PropsWithChildren<StarProgressElement>): JSX.Element => {
  return <fwc-star-progress {...extractProps<StarProgressElementProps>(props)}>{children}</fwc-star-progress>;
};

export const CircularIndicator = ({
  children,
  ...props
}: React.PropsWithChildren<CircularProgressElement>): JSX.Element => {
  return (
    <fwc-circular-progress {...extractProps<CircularProgressElementProps>(props)}>{children}</fwc-circular-progress>
  );
};
