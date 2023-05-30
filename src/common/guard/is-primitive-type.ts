export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | undefined
  | null
  | symbol;

export const isPrimitive = (value: any): value is Primitive => {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'bigint' ||
    typeof value === 'boolean' ||
    typeof value === 'undefined' ||
    value === null ||
    typeof value === 'symbol'
  );
};
