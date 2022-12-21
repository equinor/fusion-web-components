import { createComponent } from '@equinor/fusion-react-utils';

import { LinkButtonElement, LinkButtonElementProps, tag } from '@equinor/fusion-wc-link-button';

LinkButtonElement;

export const LinkButton = createComponent<LinkButtonElement, LinkButtonElementProps>(LinkButtonElement, tag);
export type LinkButtonProps = React.ComponentProps<typeof LinkButton>;

export default LinkButton;
