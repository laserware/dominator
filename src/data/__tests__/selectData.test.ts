import { selectData, selectDataEntry } from "../selectData.ts";

describe("within selectData", () => {
  describe("the selectDataEntry function", () => {
    it("returns a selector when a dataset key is specified", () => {
      expect(selectDataEntry("name")).toBe("[data-name]");
      expect(selectDataEntry("data-name")).toBe("[data-name]");
    });

    it("returns a selector when a dataset key and undefined is specified", () => {
      expect(selectDataEntry("hidden", undefined)).toBe(`[data-hidden]`);
      expect(selectDataEntry("data-hidden", undefined)).toBe(`[data-hidden]`);
    });

    it("returns a selector when a dataset key and valid value is specified", () => {
      expect(selectDataEntry("hidden", true)).toBe(`[data-hidden="true"]`);
      expect(selectDataEntry("data-hidden", true)).toBe(`[data-hidden="true"]`);
    });

    it("returns a selector when a dataset key, valid value, and tag is specified", () => {
      expect(selectDataEntry("hidden", true, "button")).toBe(`button[data-hidden="true"]`);
      expect(selectDataEntry("data-hidden", true, "button")).toBe(`button[data-hidden="true"]`);
    });

    it("returns a selector when a dataset key and array value is specified", () => {
      const expected = `[data-array="[1,2,3]"]`;

      expect(selectDataEntry("array", [1, 2, 3])).toBe(expected);
      expect(selectDataEntry("data-array", [1, 2, 3])).toBe(expected);
    });

    it("returns a selector when a dataset key and object value is specified", () => {
      const expected = `[data-object="{\\"thisIs\\":\\"object\\"}"]`;

      expect(selectDataEntry("object", { thisIs: "object" })).toBe(expected);
      expect(selectDataEntry("data-object", { thisIs: "object" })).toBe(expected);
    });

    it("throws an error if an invalid value is passed in", () => {
      // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#exceptions
      expect(() => {
        // @ts-ignore
        selectDataEntry("data-big-int", BigInt(20));
      }).toThrow(/could not get selector/i);
    });
  });

  describe("the selectData function", () => {
    it("returns a selector when a data object is specified", () => {
      const result = selectData({ "data-hidden": true, "data-big": null });

      expect(result).toBe(`[data-hidden="true"][data-big]`);
    });

    it("returns a selector when a data object and tag is specified", () => {
      const result = selectData({ "data-hidden": true, "data-big": null }, "svg");

      expect(result).toBe(`svg[data-hidden="true"][data-big]`);
    });
  });
});
