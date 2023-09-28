import { FC } from 'react';
import extractProps from './extract-props';
import { ListElement, ListElementProps } from '@equinor/fusion-wc-list';
import { ListItemElement } from '@equinor/fusion-wc-list/lib/list-item';
import { CheckListItemElement } from '@equinor/fusion-wc-list/lib/check-list-item';
import { RadioListItemElement } from '@equinor/fusion-wc-list/lib/radio-list-item';

ListElement;
ListItemElement;
CheckListItemElement;
RadioListItemElement;

export const ListContainer: FC = ({ children }): JSX.Element => (
  <div style={{ width: '20rem', border: '1px solid #d3d3d3' }}>{children}</div>
);

export const List = (props: ListElementProps): JSX.Element => (
  <ListContainer>
    <fwc-list {...extractProps<ListElementProps>(props)} />
  </ListContainer>
);

export default List;
