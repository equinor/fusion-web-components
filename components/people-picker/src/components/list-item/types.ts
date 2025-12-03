import type { PersonInfo } from "@equinor/fusion-wc-person";

export interface ListItemElementProps {
  azureId?: string;
  upn?: string;
  dataSource?: PersonInfo;
  selected?: boolean;
}
