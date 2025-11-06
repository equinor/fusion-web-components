import type { PersonInfo } from "@equinor/fusion-wc-person";

export interface PillElementProps {
  azureId?: string;
  upn?: string;
  dataSource?: PersonInfo | string;
  subTitle?: keyof PersonInfo;
}
