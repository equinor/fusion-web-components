import extractProps from './extract-props';

import {
  StarProgressElement,
  StarProgressElementProps,
  DotsProgressElement,
  DotsProgressElementProps,
  CircularProgressElement,
  CircularProgressElementProps,
} from '@equinor/fusion-wc-progress-indicator';
StarProgressElement;

export const StarIndicator = ({ children, ...props }: React.PropsWithChildren<StarProgressElement>): JSX.Element => {
  return <fwc-star-progress {...extractProps<StarProgressElementProps>(props)}>{children}</fwc-star-progress>;
};

export const DotsIndicator = ({ children, ...props }: React.PropsWithChildren<DotsProgressElement>): JSX.Element => {
  return <fwc-dots-progress {...extractProps<DotsProgressElementProps>(props)}>{children}</fwc-dots-progress>;
};

export const CircularIndicator = ({
  children,
  ...props
}: React.PropsWithChildren<CircularProgressElement>): JSX.Element => {
  return (
    <fwc-circular-progress {...extractProps<CircularProgressElementProps>(props)}>{children}</fwc-circular-progress>
  );
};
