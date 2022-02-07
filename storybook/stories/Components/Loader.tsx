import extractProps from './extract-props';

import { LoaderElement, LoaderElementProps } from '@equinor/fusion-wc-loader';
LoaderElement;

export const Loader = ({ children, ...props }: React.PropsWithChildren<LoaderElementProps>): JSX.Element => {
  return <fwc-loader {...extractProps<LoaderElementProps>(props)}>{children}</fwc-loader>;
};

export default Loader;
