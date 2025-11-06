import type { PersonInfo } from "@equinor/fusion-wc-person";

export interface ListElementProps {
  azureIds?: string | string[];
  dataSources?: string | PersonInfo[];
  subTitle?: keyof PersonInfo;
  secondarySubTitle?: keyof PersonInfo;
  maxHeight?: number;
}
