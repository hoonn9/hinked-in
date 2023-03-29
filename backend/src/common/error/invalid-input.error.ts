export class InvalidInputError extends Error {
  constructor(
    public readonly field: string,
    public readonly reasons?: {
      [type: string]: string;
    },
  ) {
    super();
  }
}
