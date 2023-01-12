import { createComponent } from '@equinor/fusion-react-utils';

import { ButtonElement, ButtonElementProps, buttonTag } from '@equinor/fusion-wc-button';

ButtonElement;

export const Button = createComponent<ButtonElement, ButtonElementProps>(ButtonElement, buttonTag);
export type ButtonProps = React.ComponentProps<typeof Button>;

export default Button;
