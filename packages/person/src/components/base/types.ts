import { type PersonInfo } from '../../types';

export interface PersonBaseElementProps {
  /** @deprecated Use resolveId instead. */
  azureId?: string;
  /** @deprecated Use resolveId instead. */
  upn?: string;
  dataSource?: PersonInfo;
  resolveId?: string;
}
