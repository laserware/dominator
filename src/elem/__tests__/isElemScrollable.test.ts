import { selectorForNonExistent } from "../../testing.ts";
import { isElemScrollable } from "../isElemScrollable.ts";

/*
 * Note that it is pretty much impossible to test this because the `clientHeight`
 * and `scrollHeight` of an element aren't available using JSDOM.
 */

describe("the isElemScrollable function", () => {
  it("throws InvalidElemError if the element is not found", () => {
    expect(() => {
      isElemScrollable(selectorForNonExistent);
    }).toThrow(/Unable to check if target is scrollable/);
  });
});
