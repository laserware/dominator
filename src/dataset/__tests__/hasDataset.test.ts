import { entriesOf } from "@laserware/arcade";

import { render, selectorForNonExistent } from "../../testing.ts";
import { asDatasetAttributeName } from "../datasetKeys.ts";
import { hasAllDatasetEntries, hasDatasetEntry, hasSomeDatasetEntries } from "../hasDataset.ts";

/**
 * Iterates through the specified object or array of keys and adds the `data-`
 * prefix (and kebab-cases the value).
 */
const withDataPrefix = <T extends Record<string, any> | any[]>(values: T): T => {
  if (Array.isArray(values)) {
    return values.map((value) => asDatasetAttributeName(value)) as T;
  } else {
    const withDataset: Record<string, any> = {};

    for (const [key, value] of entriesOf(values)) {
      withDataset[asDatasetAttributeName(key)] = value;
    }

    return withDataset as T;
  }
};

describe("within hasDataset", () => {
  describe("the hasDatasetEntry function", () => {
    it("returns true if the specified dataset entry exists on the target", () => {
      const element = render(`<button data-name="button">Test</button>`);

      expect(hasDatasetEntry(element, "name")).toBeTruthy();
      expect(hasDatasetEntry(element, "data-name")).toBeTruthy();
    });

    it("returns true if the specified dataset entry with value exists on the target", () => {
      const element = render(`<button data-name="button">Test</button>`);

      expect(hasDatasetEntry(element, "name", "button")).toBeTruthy();
      expect(hasDatasetEntry(element, "data-name", "button")).toBeTruthy();
    });

    it("returns false if the specified attribute does not exist on the target", () => {
      const element = render(`<button>Test</button>`);

      expect(hasDatasetEntry(element, "invalid")).toBeFalsy();
      expect(hasDatasetEntry(element, "data-invalid")).toBeFalsy();
    });

    it("returns false if the specified dataset entry with value does not exist on the target", () => {
      const element = render(`<button data-name="button">Test</button>`);

      expect(hasDatasetEntry(element, "name", "not-button")).toBeFalsy();
      expect(hasDatasetEntry(element, "data-name", "not-button")).toBeFalsy();
    });

    it("throws an error if the target does not exist", () => {
      expect(() => {
        hasDatasetEntry(selectorForNonExistent, "name");
      }).toThrow(/Cannot check/);
    });
  });

  describe("the hasAllDatasetEntries function", () => {
    it("returns true if all specified dataset keys exist on the target", () => {
      // prettier-ignore
      const element = render(`<button data-name="button" data-type="submit" data-big>Test</button>`);

      const search = ["name", "type", "big"];

      expect(hasAllDatasetEntries(element, search)).toBeTruthy();
      expect(hasAllDatasetEntries(element, withDataPrefix(search))).toBeTruthy();
    });

    it("returns true if all specified dataset entries match search filter on the target", () => {
      // prettier-ignore
      const element = render(`<button data-name="button" data-type="submit" data-big>Test</button>`);

      const search = { name: "button", type: "submit", big: null };

      expect(hasAllDatasetEntries(element, search)).toBeTruthy();
      expect(hasAllDatasetEntries(element, withDataPrefix(search))).toBeTruthy();
    });

    it("returns false if one of the specified dataset keys do not exist on the target", () => {
      // prettier-ignore
      const element = render(`<button data-name="button" data-type="submit" data-big>Test</button>`);

      const search = ["name", "type", "big", "missing"];

      expect(hasAllDatasetEntries(element, search)).toBeFalsy();
      expect(hasAllDatasetEntries(element, withDataPrefix(search))).toBeFalsy();
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

      expect(hasAllDatasetEntries(element, search)).toBeFalsy();
      expect(hasAllDatasetEntries(element, withDataPrefix(search))).toBeFalsy();
    });

    it("throws an error if the target does not exist", () => {
      expect(() => {
        hasAllDatasetEntries(selectorForNonExistent, ["name"]);
      }).toThrow(/Cannot check/);
    });
  });

  describe("the hasSomeDatasetEntries function", () => {
    it("returns true if some of the specified attributes exist on the target", () => {
      // prettier-ignore
      const element = render(`<button data-name="button" data-type="submit" data-big>Test</button>`);

      const search = ["name", "type", "missing"];

      expect(hasSomeDatasetEntries(element, search)).toBeTruthy();
      expect(hasSomeDatasetEntries(element, withDataPrefix(search))).toBeTruthy();
    });

    it("returns true if some of the specified attributes match search filter on the target", () => {
      // prettier-ignore
      const element = render(`<button data-name="button" data-type="submit" data-big>Test</button>`);

      expect(hasSomeDatasetEntries(element, { name: "button" })).toBeTruthy();
      expect(hasSomeDatasetEntries(element, { "data-name": "button" })).toBeTruthy();
    });

    it("returns false if none of the specified attributes exist on the target", () => {
      // prettier-ignore
      const element = render(`<button data-name="button" data-type="submit" data-big>Test</button>`);

      const search = ["missing", "invalid"];

      expect(hasSomeDatasetEntries(element, search)).toBeFalsy();
      expect(hasSomeDatasetEntries(element, withDataPrefix(search))).toBeFalsy();
    });

    it("returns false if all of the specified attributes search filters do not match the target", () => {
      // prettier-ignore
      const element = render(`<button data-name="button" data-type="submit" data-big>Test</button>`);

      const search = {
        name: "incorrect",
        type: "button",
        big: "true",
      };

      expect(hasSomeDatasetEntries(element, search)).toBeFalsy();
      expect(hasSomeDatasetEntries(element, withDataPrefix(search))).toBeFalsy();
    });

    it("throws an error if the target does not exist", () => {
      expect(() => {
        hasSomeDatasetEntries(selectorForNonExistent, ["name", "data-name"]);
      }).toThrow(/Cannot check/);
    });
  });
});
