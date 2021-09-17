import { PropsWithChildren, FC } from 'react';
import extractProps from './extract-props';
import { RippleElement, RippleElementProps } from '@equinor/fusion-wc-ripple';
RippleElement;

export const RippleBox: FC = ({ children }) => {
  return <div style={{ width: '5rem', height: '5rem', background: '#ddd', position: 'relative' }}>{children}</div>;
};

export const Ripple = ({ children, ...props }: PropsWithChildren<RippleElementProps>): JSX.Element => (
  <RippleBox>
    <fwc-ripple {...extractProps<RippleElementProps>(props)}>{children}</fwc-ripple>
  </RippleBox>
);

export default Ripple;
