import { render } from "../../testing.ts";
import { datasetOf } from "../datasetOf.ts";

type TestDatasetShape = {
  count: number;
  size: string;
  status: string;
  valid: boolean;
};

const initialData: TestDatasetShape = {
  count: 20,
  size: "small",
  status: "warn",
  valid: true,
};

describe("the datasetOf function", () => {
  it("sets the dataset properties to the specified initial values when called", () => {
    const element = render(`<div>Test</div>`);

    const dataset = datasetOf<TestDatasetShape>(element, initialData);

    expect(dataset.element.getAttribute("data-count")).toBe("20");
    expect(dataset.element.getAttribute("data-size")).toBe("small");
    expect(dataset.element.getAttribute("data-status")).toBe("warn");
    expect(dataset.element.getAttribute("data-valid")).toBe("true");
  });

  it("creates an instance of Dataset with no initial data when specified", () => {
    const element = render(`<div>Test</div>`);

    const dataset = datasetOf<TestDatasetShape>(element);

    expect(dataset.element.hasAttribute("data-count")).toBeFalsy();
  });

  describe("the getAll method", () => {
    it("returns all data when dataset entries exist on target", () => {
      const element = render(`<div>Test</div>`);

      const dataset = datasetOf<TestDatasetShape>(element, initialData);

      expect(dataset.getAll()).toEqual(initialData);
    });

    it("returns an empty object when no dataset entries exist on target", () => {
      const element = render(`<div>Test</div>`);

      const dataset = datasetOf(element);

      expect(dataset.getAll()).toEqual({});
    });

    it("returns object with with defined dataset properties", () => {
      const element = render(`<div data-count="10">Test</div>`);

      const dataset = datasetOf<{ count: number; color: string }>(element);

      expect(dataset.getAll()).toEqual({ count: 10 });
    });
  });

  describe("the get method", () => {
    it("returns the value when it exists in the dataset", () => {
      const element = render(`<div>Test</div>`);

      const dataset = datasetOf<TestDatasetShape>(element, initialData);

      expect(dataset.get("count")).toBe(initialData.count);
      expect(dataset.get("size")).toBe(initialData.size);
      expect(dataset.get("status")).toBe(initialData.status);
      expect(dataset.get("valid")).toBe(initialData.valid);
    });

    it("returns undefined if the value isn't found", () => {
      const element = render(`<div>Test</div>`);

      const dataset = datasetOf<TestDatasetShape>(element, initialData);

      // @ts-ignore
      expect(dataset.get("[missing]")).toBeUndefined();
    });
  });

  it("sets the dataset value when the set method is called", () => {
    const element = render(`<div>Test</div>`);

    const dataset = datasetOf<TestDatasetShape>(element, initialData);

    const expected = 50;

    dataset.set("count", expected);

    expect(dataset.get("count")).toBe(expected);
  });

  it("removes the dataset entry when the remove method is called", () => {
    const element = render(`<div>Test</div>`);

    const dataset = datasetOf<TestDatasetShape>(element, initialData);

    dataset.remove("count");

    expect(dataset.get("count")).toBeUndefined();
  });

  it("sets the dataset entries when the setAll method is called", () => {
    const element = render(`<div>Test</div>`);

    const dataset = datasetOf<TestDatasetShape>(element);

    dataset.setAll({ count: 50, size: "small" });

    expect(dataset.get("count")).toBe(50);
    expect(dataset.get("size")).toBe("small");
  });

  it("returns the dataset attribute name when attrNameFor is called", () => {
    const element = render(`<div data-name="test">Test</div>`);

    const dataset = datasetOf<{ name: string }>(element);

    expect(dataset.attrNameFor("name")).toBe("data-name");
  });
});
