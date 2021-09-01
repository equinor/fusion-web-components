import { ComplexAttributeConverter } from 'lit-element';

export const dateConverter: ComplexAttributeConverter<Date | null, string> = {
  fromAttribute: (value) => (value ? new Date(value) : null),
  toAttribute: (value) => (value ? value.toISOString() : null),
};

export default dateConverter;
