export class CssVarError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "CssVarError";
  }
}
