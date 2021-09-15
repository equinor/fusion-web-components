import extractProps from './extract-props';

import { DividerElement, DividerElementProps } from '@equinor/fusion-wc-divider';
DividerElement;

export const Divider = (props: DividerElementProps): JSX.Element => (
  <div
    style={
      props.orientation === 'vertical'
        ? {
            height: '2rem',
            display: 'flex',
          }
        : {}
    }
  >
    <fwc-divider {...extractProps<DividerElementProps>(props)} />
  </div>
);

export default Divider;
