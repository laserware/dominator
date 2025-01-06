/**
 * Error thrown when an attribute is invalid for the operation.
 */
export class InvalidAttributeError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "InvalidAttributeError";
  }
}
