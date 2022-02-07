import extractProps from './extract-props';

import { LoaderElement, LoaderElementProps } from '@equinor/fusion-wc-loader';
LoaderElement;

export const Divider = ({ children, ...props }: React.PropsWithChildren<LoaderElementProps>): JSX.Element => {
  console.log(props);
  return <fwc-loader {...extractProps<LoaderElementProps>(props)}>{children}</fwc-loader>;
};

export default Divider;
