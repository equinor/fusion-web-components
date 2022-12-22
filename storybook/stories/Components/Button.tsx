import { createComponent } from '@equinor/fusion-react-utils';

import { ButtonElement, ButtonElementProps, tag } from '@equinor/fusion-wc-button/button';

ButtonElement;

export const Button = createComponent<ButtonElement, ButtonElementProps>(ButtonElement, tag);
export type ButtonProps = React.ComponentProps<typeof Button>;

export default Button;
