export const extractProps = <T extends Record<string, unknown>>(props: T | Record<string, unknown>): T =>
  Object.keys(props).reduce((acc, key) => {
    const value = props[key];
    return value ? Object.assign(acc, { [key]: value }) : acc;
  }, {}) as unknown as T;

export default extractProps;
