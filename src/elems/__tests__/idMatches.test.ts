import { render, selectorForNonExistent } from "../../testing.ts";
import { idMatches } from "../idMatches.ts";

describe("the idMatches function", () => {
  it("returns true when the target element has the specified ID", () => {
    const element = render(`<div id="id-test">Test</div>`);

    expect(idMatches(element, "id-test")).toBeTruthy();
  });

  it("returns true when the target selector matches the specified ID", () => {
    render(`<div id="id-test">Test</div>`);

    expect(idMatches("#id-test", "id-test")).toBeTruthy();
  });

  it("returns false when the target element does not have the specified ID", () => {
    const element = render(`<div id="id-test">Test</div>`);

    expect(idMatches(element, "wrong-id")).toBeFalsy();
  });

  it("returns false when the target selector does not match the specified ID", () => {
    render(`<div id="id-test">Test</div>`);

    expect(idMatches("#id-test", "wrong-id")).toBeFalsy();
  });

  it("removes # from the ID and still match correctly", () => {
    const element = render(`<div id="#id-test">Test</div>`);

    expect(idMatches(element, "##id-test")).toBeTruthy();
  });

  it("throws an error if the target does not exist", () => {
    expect(() => {
      idMatches(selectorForNonExistent, "test-id");
    }).toThrow("Unable to check for ID match");
  });
});
