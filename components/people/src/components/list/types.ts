import type { PersonInfo } from "@equinor/fusion-wc-person";

export interface ListElementProps {
  dataSources: string | PersonInfo[];
  maxHeight?: number;
}
