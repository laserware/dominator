export class InvalidElementError extends Error {
  constructor(message: string) {
    super(`${message}, element is missing or invalid`);
    this.name = "InvalidElementError";
  }
}
