export class InvalidElemError extends Error {
  constructor(message: string) {
    super(`${message}, element is missing or invalid`);
    this.name = "InvalidElementError";
  }
}
