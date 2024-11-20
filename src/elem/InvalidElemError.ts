/**
 * Error thrown when an element is not in the DOM or invalid for the operation.
 */
export class InvalidElemError extends Error {
  constructor(message: string) {
    super(`${message}, element is missing or invalid`);
    this.name = "InvalidElementError";
  }
}
