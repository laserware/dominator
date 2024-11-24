import { render } from "../../testing.ts";
import { getData } from "../getData.ts";

describe("the getData function", () => {
  it("returns the dataset value for a single property name", () => {
    const element = render(`<button data-some-property="thing">Test</button>`);

    const result = getData(element, "someProperty");

    expect(result).toBe("thing");
  });

  it("returns the dataset value for multiple property names", () => {
    const element = render(`<button data-some-property="thing">Test</button>`);

    const result = getData(element, "data-some-property");

    expect(result).toBe("thing");
  });
});
