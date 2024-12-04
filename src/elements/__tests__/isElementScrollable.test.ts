import { selectorForNonExistent } from "../../testing.ts";
import { isElementScrollable } from "../isElementScrollable.ts";

/*
 * Note that it is pretty much impossible to test this because the `clientHeight`
 * and `scrollHeight` of an element aren't available using JSDOM.
 */

describe("the isElementScrollable function", () => {
  it("throws InvalidElementError if the element is not found", () => {
    expect(() => {
      isElementScrollable(selectorForNonExistent);
    }).toThrow(/Cannot check if target is scrollable/);
  });
});
