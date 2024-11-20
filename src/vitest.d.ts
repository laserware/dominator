import "@vitest/runner";

declare module "@vitest/runner" {
  export interface TestContext {
    selectors: TestSelectors;
  }
}
