import type { PersonInfo } from "@equinor/fusion-wc-person";

export interface PillContainerElementProps {
  azureIds?: string | string[];
  upns?: string | string[];
  dataSources?: string | PersonInfo[];
}
