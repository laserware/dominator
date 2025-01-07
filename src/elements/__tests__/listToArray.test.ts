import { describe, expect, it } from "bun:test";

import { render } from "../../testing.ts";
import { listToArray } from "../listToArray.ts";

describe("the listToArray function", () => {
  it("converts a NodeList to an array", () => {
    render("<div><span>1</span><span>2</span></div>");

    const result = listToArray(document.querySelectorAll("span"));

    expect(result).toHaveLength(2);
    expect(result).toBeInstanceOf(Array);
  });

  it("converts an HTMLCollection to an array", () => {
    render(`<div><span class="child">1</span><span class="child">2</span></div>`);

    const result = listToArray(document.getElementsByClassName("child"));

    expect(result).toHaveLength(2);
    expect(result).toBeInstanceOf(Array);
  });

  it("returns an empty array if null is specified", () => {
    expect(listToArray(null)).toEqual([]);
  });
});
