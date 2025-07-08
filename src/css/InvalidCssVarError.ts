/**
 * Error thrown if an operation on a CSS variable (i.e., custom property) fails.
 */
export class InvalidCssVarError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "InvalidCssVarError";
  }
}
