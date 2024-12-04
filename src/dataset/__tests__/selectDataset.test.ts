import { selectDatasetEntries, selectDatasetEntry } from "../selectDataset.ts";

describe("within selectDataset", () => {
  describe("the selectDatasetEntry function", () => {
    it("returns a selector when a dataset key is specified", () => {
      expect(selectDatasetEntry("name")).toBe("[data-name]");
      expect(selectDatasetEntry("data-name")).toBe("[data-name]");
    });

    it("returns a selector when a dataset key and undefined is specified", () => {
      expect(selectDatasetEntry("hidden", undefined)).toBe(`[data-hidden]`);
      expect(selectDatasetEntry("data-hidden", undefined)).toBe(`[data-hidden]`);
    });

    it("returns a selector when a dataset key and valid value is specified", () => {
      expect(selectDatasetEntry("hidden", true)).toBe(`[data-hidden="true"]`);
      expect(selectDatasetEntry("data-hidden", true)).toBe(`[data-hidden="true"]`);
    });

    it("returns a selector when a dataset key, valid value, and tag is specified", () => {
      expect(selectDatasetEntry("hidden", true, "button")).toBe(`button[data-hidden="true"]`);
      expect(selectDatasetEntry("data-hidden", true, "button")).toBe(`button[data-hidden="true"]`);
    });

    it("returns a selector when a dataset key and array value is specified", () => {
      const expected = `[data-array="[1,2,3]"]`;

      expect(selectDatasetEntry("array", [1, 2, 3])).toBe(expected);
      expect(selectDatasetEntry("data-array", [1, 2, 3])).toBe(expected);
    });

    it("returns a selector when a dataset key and object value is specified", () => {
      const expected = `[data-object="{\\"thisIs\\":\\"object\\"}"]`;

      expect(selectDatasetEntry("object", { thisIs: "object" })).toBe(expected);
      expect(selectDatasetEntry("data-object", { thisIs: "object" })).toBe(expected);
    });

    it("throws an error if an invalid value is passed in", () => {
      // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#exceptions
      expect(() => {
        // @ts-ignore
        selectDatasetEntry("data-big-int", BigInt(20));
      }).toThrow(/could not get selector/i);
    });
  });

  describe("the selectDatasetEntries function", () => {
    it("returns a selector when a dataset object is specified", () => {
      const result = selectDatasetEntries({ "data-hidden": true, "data-big": null });

      expect(result).toBe(`[data-hidden="true"][data-big]`);
    });

    it("returns a selector when a dataset object and tag is specified", () => {
      const result = selectDatasetEntries({ "data-hidden": true, "data-big": null }, "svg");

      expect(result).toBe(`svg[data-hidden="true"][data-big]`);
    });
  });
});
