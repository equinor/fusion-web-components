import extractProps from './extract-props';

import { IconElement, IconElementProps } from '@equinor/fusion-wc-icon';
IconElement;

export const Icon = (props: IconElementProps): JSX.Element => <fwc-icon {...extractProps<IconElementProps>(props)} />;

export default Icon;
