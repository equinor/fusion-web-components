import { PropsWithChildren, useRef, useEffect } from 'react';

import { PersonCardElement, PersonProviderElement, PersonCardElementProps } from '@equinor/fusion-wc-person';
import extractProps from './extract-props';
PersonCardElement;
PersonProviderElement;

export const PersonCard = ({ children, ...props }: PropsWithChildren<PersonCardElementProps>): JSX.Element => {
  const cardRef = useRef<PersonCardElement>(null);

  useEffect(() => {
    for (const [name, value] of Object.entries(extractProps<PersonCardElementProps>(props))) {
      if (cardRef.current) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cardRef.current[name] = value;
      }
    }
  }, []);

  return <fwc-person-card ref={cardRef}>{children}</fwc-person-card>;
};

export default PersonCard;
