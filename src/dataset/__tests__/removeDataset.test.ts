import { InvalidElementError } from "../../elements/InvalidElementError.ts";
import { render, selectorForNonExistent } from "../../testing.ts";
import { removeDatasetEntries, removeDatasetEntry } from "../removeDataset.ts";

describe("within removeDataset", () => {
  describe("the removeDatasetEntry function", () => {
    it("removes the the specified dataset entry from the target", () => {
      const element = render(`<span data-label="Test element" data-name="button">Hello</span>`);

      let result = removeDatasetEntry(element, "data-label");
      result = removeDatasetEntry(result, "name");

      expect(result.hasAttribute("data-label")).toBeFalsy();
      expect(result.hasAttribute("data-name")).toBeFalsy();
    });

    it("does nothing if the specified dataset entry does not exist in the target", () => {
      const element = render(`<span data-label="Test element">Hello</span>`);

      const result = removeDatasetEntry(element, "name");

      expect(result.hasAttribute("data-label")).toBeTruthy();
    });

    it("throws an error if the target does not exist", () => {
      expect(() => {
        removeDatasetEntry(selectorForNonExistent, "name");
      }).toThrow(InvalidElementError);
    });
  });

  describe("the removeDatasetEntries function", () => {
    it("removes the the specified dataset entries from the target", () => {
      const element = render(`<span data-id="hello" data-label="Test element">Hello</span>`);

      const result = removeDatasetEntries(element, ["data-id", "label"]);

      expect(result.hasAttribute("data-id")).toBeFalsy();
      expect(result.hasAttribute("data-label")).toBeFalsy();
    });

    it("throws an error if the target does not exist", () => {
      expect(() => {
        removeDatasetEntries(selectorForNonExistent, ["name"]);
      }).toThrow(InvalidElementError);
    });
  });
});
