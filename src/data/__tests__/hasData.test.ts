import { withDataPrefix } from "../../internal/dataKeys.ts";
import { render, selectorForNonExistent } from "../../testing.ts";
import { hasAllData, hasDataEntry, hasSomeData } from "../hasData.ts";

describe("within hasData", () => {
  describe("the hasDataEntry function", () => {
    it("returns true if the specified dataset entry exists on the target", () => {
      const element = render(`<button data-name="button">Test</button>`);

      expect(hasDataEntry(element, "name")).toBeTruthy();
      expect(hasDataEntry(element, "data-name")).toBeTruthy();
    });

    it("returns true if the specified dataset entry with value exists on the target", () => {
      const element = render(`<button data-name="button">Test</button>`);

      expect(hasDataEntry(element, "name", "button")).toBeTruthy();
      expect(hasDataEntry(element, "data-name", "button")).toBeTruthy();
    });

    it("returns false if the specified attribute does not exist on the target", () => {
      const element = render(`<button>Test</button>`);

      expect(hasDataEntry(element, "invalid")).toBeFalsy();
      expect(hasDataEntry(element, "data-invalid")).toBeFalsy();
    });

    it("returns false if the specified dataset entry with value does not exist on the target", () => {
      const element = render(`<button data-name="button">Test</button>`);

      expect(hasDataEntry(element, "name", "not-button")).toBeFalsy();
      expect(hasDataEntry(element, "data-name", "not-button")).toBeFalsy();
    });

    it("throws an error if the target does not exist", () => {
      expect(() => {
        hasDataEntry(selectorForNonExistent, "name");
      }).toThrow(/Unable to check/);
    });
  });

  describe("the hasAllData function", () => {
    it("returns true if all specified dataset keys exist on the target", () => {
      // prettier-ignore
      const element = render(`<button data-name="button" data-type="submit" data-big>Test</button>`);

      const search = ["name", "type", "big"];

      expect(hasAllData(element, search)).toBeTruthy();
      expect(hasAllData(element, withDataPrefix(search))).toBeTruthy();
    });

    it("returns true if all specified dataset entries match search filter on the target", () => {
      // prettier-ignore
      const element = render(`<button data-name="button" data-type="submit" data-big>Test</button>`);

      const search = { name: "button", type: "submit", big: null };

      expect(hasAllData(element, search)).toBeTruthy();
      expect(hasAllData(element, withDataPrefix(search))).toBeTruthy();
    });

    it("returns false if one of the specified dataset keys do not exist on the target", () => {
      // prettier-ignore
      const element = render(`<button data-name="button" data-type="submit" data-big>Test</button>`);

      const search = ["name", "type", "big", "missing"];

      expect(hasAllData(element, search)).toBeFalsy();
      expect(hasAllData(element, withDataPrefix(search))).toBeFalsy();
    });

    it("returns false if any of the specified dataset entries search filters do not match the target", () => {
      // prettier-ignore
      const element = render(`<button data-name="button" data-type="submit" data-big>Test</button>`);

      const search = {
        name: "button",
        type: "submit",
        big: null,
        missing: null,
      };

      expect(hasAllData(element, search)).toBeFalsy();
      expect(hasAllData(element, withDataPrefix(search))).toBeFalsy();
    });

    it("throws an error if the target does not exist", () => {
      expect(() => {
        hasAllData(selectorForNonExistent, ["name"]);
      }).toThrow(/Unable to check/);
    });
  });

  describe("the hasSomeData function", () => {
    it("returns true if some of the specified attributes exist on the target", () => {
      // prettier-ignore
      const element = render(`<button data-name="button" data-type="submit" data-big>Test</button>`);

      const search = ["name", "type", "missing"];

      expect(hasSomeData(element, search)).toBeTruthy();
      expect(hasSomeData(element, withDataPrefix(search))).toBeTruthy();
    });

    it("returns true if some of the specified attributes match search filter on the target", () => {
      // prettier-ignore
      const element = render(`<button data-name="button" data-type="submit" data-big>Test</button>`);

      expect(hasSomeData(element, { name: "button" })).toBeTruthy();
      expect(hasSomeData(element, { "data-name": "button" })).toBeTruthy();
    });

    it("returns false if none of the specified attributes exist on the target", () => {
      // prettier-ignore
      const element = render(`<button data-name="button" data-type="submit" data-big>Test</button>`);

      const search = ["missing", "invalid"];

      expect(hasSomeData(element, search)).toBeFalsy();
      expect(hasSomeData(element, withDataPrefix(search))).toBeFalsy();
    });

    it("returns false if all of the specified attributes search filters do not match the target", () => {
      // prettier-ignore
      const element = render(`<button data-name="button" data-type="submit" data-big>Test</button>`);

      const search = {
        name: "incorrect",
        type: "button",
        big: "true",
      };

      expect(hasSomeData(element, search)).toBeFalsy();
      expect(hasSomeData(element, withDataPrefix(search))).toBeFalsy();
    });

    it("throws an error if the target does not exist", () => {
      expect(() => {
        hasSomeData(selectorForNonExistent, ["name", "data-name"]);
      }).toThrow(/Unable to check/);
    });
  });
});
