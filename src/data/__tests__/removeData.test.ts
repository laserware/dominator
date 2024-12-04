import { InvalidElementError } from "../../elements/InvalidElementError.ts";
import { render, selectorForNonExistent } from "../../testing.ts";
import { removeData, removeDataEntry } from "../removeData.ts";

describe("within removeData", () => {
  describe("the removeDataEntry function", () => {
    it("removes the the specified data entry from the target", () => {
      const element = render(`<span data-label="Test element" data-name="button">Hello</span>`);

      let result = removeDataEntry(element, "data-label");
      result = removeDataEntry(result, "name");

      expect(result.hasAttribute("data-label")).toBeFalsy();
      expect(result.hasAttribute("data-name")).toBeFalsy();
    });

    it("does nothing if the specified data entry does not exist in the target", () => {
      const element = render(`<span data-label="Test element">Hello</span>`);

      const result = removeDataEntry(element, "name");

      expect(result.hasAttribute("data-label")).toBeTruthy();
    });

    it("throws an error if the target does not exist", () => {
      expect(() => {
        removeDataEntry(selectorForNonExistent, "name");
      }).toThrow(InvalidElementError);
    });
  });

  describe("the removeData function", () => {
    it("removes the the specified data entries from the target", () => {
      const element = render(`<span data-id="hello" data-label="Test element">Hello</span>`);

      const result = removeData(element, ["data-id", "label"]);

      expect(result.hasAttribute("data-id")).toBeFalsy();
      expect(result.hasAttribute("data-label")).toBeFalsy();
    });

    it("throws an error if the target does not exist", () => {
      expect(() => {
        removeData(selectorForNonExistent, ["name"]);
      }).toThrow(InvalidElementError);
    });
  });
});
