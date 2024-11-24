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

  it("returns all data when the all method is called", () => {
    const element = render(`<div>Test</div>`);

    const dataset = datasetOf<TestDatasetShape>(element, initialData);

    expect(dataset.all()).toEqual(initialData);
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
});
