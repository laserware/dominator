import { describe, expect, it } from "bun:test";

import { render } from "../../testing.ts";
import { isInputType } from "../isInputType.ts";

describe("isInputType", () => {
  it("returns true for a valid input element when type omitted", () => {
    const element = render(`<input type="text" />`);

    expect(isInputType(element)).toBe(true);
  });

  it("returns true for a valid input element of the specified type", () => {
    const element = render(`<input type="text" />`);

    expect(isInputType(element, "text")).toBe(true);
  });

  it("returns false for an input element with a different type", () => {
    const element = render(`<input type="password" />`);

    expect(isInputType(element, "text")).toBeFalsy();
  });

  it("returns false for non-input elements", () => {
    const element = render("<div>Test</div>");

    expect(isInputType(element, "text")).toBeFalsy();
  });

  it("returns false for a null target", () => {
    expect(isInputType(null, "text")).toBeFalsy();
  });

  it("returns false for a null target and omitted input type", () => {
    expect(isInputType(null)).toBeFalsy();
  });

  it("returns false for a valid CSS selector that does not match an input element", () => {
    render(`<div id="not-input"></div>`);

    expect(isInputType("#not-input", "text")).toBeFalsy();
  });

  it("returns true for a CSS selector matching an input of the specified type", () => {
    render(`<input id="input" type="text">`);

    expect(isInputType("#input", "text")).toBe(true);
  });

  it("returns false for a CSS selector matching an input of a different type", () => {
    render(`<input id="input" type="password">`);

    expect(isInputType("#input", "text")).toBeFalsy();
  });
});
