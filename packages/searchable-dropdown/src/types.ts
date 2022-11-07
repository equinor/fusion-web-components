import { ReactiveControllerHost } from 'lit';
import { Task } from '@lit-labs/task';

export type SearchableDropdownProps = {
  label?: string;
  placeholder?: string;
  variant?: string;
  meta?: string;
  graphic?: string;
  selected?: string;
  initialText?: string;
};

export type SearchableDropdownResult = Array<SearchableDropdownResultItem>;

export interface SearchableDropdownResultItem {
  id: string;
  title?: string;
  subTitle?: string;
  isDisabled?: boolean;
  isSelected?: boolean;
  isError?: boolean;
  meta?: string;
  graphic?: string;
  type?: 'section' | 'divider' | null;
  children?: SearchableDropdownResult;
  section?: SearchableDropdownResultItem;
}

export interface SearchableDropdownResolver {
  searchQuery: (queryString: string) => Promise<SearchableDropdownResult> | SearchableDropdownResult;
}

export interface SearchableDropdownControllerHost extends ReactiveControllerHost {
  dispatchEvent(event: Event): boolean;
  pendingQuery?: Task<[string], SearchableDropdownResult>;
  nodeName: string;
  selected: string;
  trailingIcon: string;
}
