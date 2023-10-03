import { createComponent } from '@equinor/fusion-react-utils';

import { IconButtonElement, IconButtonElementProps, iconButtonTag } from '@equinor/fusion-wc-button';

IconButtonElement;

export const IconButton = createComponent<IconButtonElement, IconButtonElementProps>(IconButtonElement, iconButtonTag);
export type IconButtonProps = React.ComponentProps<typeof IconButton>;

export default IconButton;
