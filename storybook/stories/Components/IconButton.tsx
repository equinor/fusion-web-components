import { createComponent } from '@equinor/fusion-react-utils';

import { IconButtonElement, IconButtonElementProps, tag } from '@equinor/fusion-wc-button/icon-button';

IconButtonElement;

export const IconButton = createComponent<IconButtonElement, IconButtonElementProps>(IconButtonElement, tag);
export type IconButtonProps = React.ComponentProps<typeof IconButton>;

export default IconButton;
