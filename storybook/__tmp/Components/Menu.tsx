import { MenuElement, MenuElementProps } from '@equinor/fusion-wc-menu';
import { createComponent } from '@equinor/fusion-react-utils';
MenuElement;

export type MenuProps = React.ComponentProps<typeof Menu>;
export const Menu = createComponent<MenuElement, MenuElementProps>(MenuElement, 'fwc-menu', {
  events: { onOpened: 'opened', onClosed: 'closed' },
});

export default Menu;
