/**
 * Error thrown if an operation on a CSS variable (i.e. custom property) fails.
 *
 * @group CSS
 */
export class InvalidCssVarError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "InvalidCssVarError";
  }
}

/**
 * Error thrown when an Element is not in the DOM or invalid for the operation.
 *
 * @group Elements
 */
export class InvalidElemError extends Error {
  constructor(message: string) {
    super(`${message}, element is missing or invalid`);

    this.name = "InvalidElementError";
  }
}

/**
 * Error thrown when an attribute is invalid for the operation.
 *
 * @group Attributes
 */
export class InvalidAttrError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "InvalidAttrError";
  }
}
