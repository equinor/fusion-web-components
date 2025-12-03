import type { PersonInfo } from "@equinor/fusion-wc-person";

export interface ListElementProps {
  azureIds?: string | string[];
  dataSources?: string | PersonInfo[];
  maxHeight?: number;
}
