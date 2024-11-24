import { getData } from "../getData.ts";

describe("the getData function", () => {
  it("returns the dataset value for a single property name", ({ selectors }) => {
    const result = getData(selectors.forButton, "someProperty");

    expect(result).toBe("thing");
  });

  it("returns the dataset value for multiple property names", ({ selectors }) => {
    const result = getData(selectors.forButton, "data-some-property");

    expect(result).toBe("thing");
  });
});
