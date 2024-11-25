import { render } from "../../testing.ts";
import { getDataValue } from "../getData.ts";

describe("within getData", () => {
  describe("the getDataValue function", () => {
    it("returns the dataset value for a single property name", () => {
      const element = render(`<button data-some-property="thing">Test</button>`);

      const result = getDataValue(element, "someProperty");

      expect(result).toBe("thing");
    });

    it("returns the dataset value for multiple property names", () => {
      const element = render(`<button data-some-property="thing">Test</button>`);

      const result = getDataValue(element, "data-some-property");

      expect(result).toBe("thing");
    });
  });
});
