export class FieldError extends Error {
  constructor(
    public readonly field: string,
    public readonly value: string | number,
    public readonly reason: string,
  ) {
    super();
  }
}
