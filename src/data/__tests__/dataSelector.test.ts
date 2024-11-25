import { dataEntrySelector, dataSelector } from "../dataSelector.ts";

describe("within dataSelector", () => {
  describe("the dataEntrySelector function", () => {
    it("returns a selector when a dataset key is specified", () => {
      expect(dataEntrySelector("name")).toBe("[data-name]");
      expect(dataEntrySelector("data-name")).toBe("[data-name]");
    });

    it("returns a selector when a dataset key and undefined is specified", () => {
      expect(dataEntrySelector("hidden", undefined)).toBe(`[data-hidden]`);
      expect(dataEntrySelector("data-hidden", undefined)).toBe(`[data-hidden]`);
    });

    it("returns a selector when a dataset key and valid value is specified", () => {
      expect(dataEntrySelector("hidden", true)).toBe(`[data-hidden="true"]`);
      expect(dataEntrySelector("data-hidden", true)).toBe(`[data-hidden="true"]`);
    });

    it("returns a selector when a dataset key, valid value, and tag is specified", () => {
      expect(dataEntrySelector("hidden", true, "button")).toBe(`button[data-hidden="true"]`);
      expect(dataEntrySelector("data-hidden", true, "button")).toBe(`button[data-hidden="true"]`);
    });

    it("returns a selector when a dataset key and array value is specified", () => {
      const expected = `[data-array="[1,2,3]"]`;

      expect(dataEntrySelector("array", [1, 2, 3])).toBe(expected);
      expect(dataEntrySelector("data-array", [1, 2, 3])).toBe(expected);
    });

    it("returns a selector when a dataset key and object value is specified", () => {
      const expected = `[data-object="{\\"thisIs\\":\\"object\\"}"]`;

      expect(dataEntrySelector("object", { thisIs: "object" })).toBe(expected);
      expect(dataEntrySelector("data-object", { thisIs: "object" })).toBe(expected);
    });

    it("throws an error if an invalid value is passed in", () => {
      // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#exceptions
      expect(() => {
        // @ts-ignore
        dataEntrySelector("data-big-int", BigInt(20));
      }).toThrow(/could not get selector/i);
    });
  });

  describe("the dataSelector function", () => {
    it("returns a selector when a data object is specified", () => {
      const result = dataSelector({ "data-hidden": true, "data-big": null });

      expect(result).toBe(`[data-hidden="true"][data-big]`);
    });

    it("returns a selector when a data object and tag is specified", () => {
      const result = dataSelector({ "data-hidden": true, "data-big": null }, "svg");

      expect(result).toBe(`svg[data-hidden="true"][data-big]`);
    });
  });
});
