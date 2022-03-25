import { SelectElement } from '@equinor/fusion-wc-select';
import { createComponent } from '@equinor/fusion-react-utils';
SelectElement;

export type SelectProps = React.ComponentProps<typeof Select>;
export const Select = createComponent(SelectElement, 'fwc-select', {
  events: { onOpened: 'opened', onClosed: 'closed' },
});

export default Select;
