import { FC } from 'react';
import extractProps from './extract-props';
import { ListElement, ListElementProps } from '@equinor/fusion-wc-list';
ListElement;

export const ListContainer: FC = ({ children }): JSX.Element => (
  <div style={{ width: '20rem', border: '1px solid #d3d3d3' }}>{children}</div>
);

export const List = (props: ListElementProps): JSX.Element => (
  <ListContainer>
    <fwc-list {...extractProps<ListElementProps>(props)} />
  </ListContainer>
);

export default List;
