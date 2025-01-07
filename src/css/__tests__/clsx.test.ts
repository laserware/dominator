// noinspection PointlessBooleanExpressionJS

import { describe, expect, it } from "bun:test";

import { clsx } from "../clsx.ts";

/**
 * @file These tests were taken from the [clsx](https://github.com/lukeed/clsx)
 *       codebase and updated to use Vitest (instead of uvu).
 */

describe("the clsx function", () => {
  it("handles strings", () => {
    expect(clsx("")).toBe("");
    expect(clsx("foo")).toBe("foo");
    expect(clsx(true && "foo")).toBe("foo");
    expect(clsx(false && "foo")).toBe("");
  });

  it("handles variadic arguments", () => {
    expect(clsx("")).toBe("");
    expect(clsx("foo", "bar")).toBe("foo bar");
    expect(clsx(true && "foo", false && "bar", "baz")).toBe("foo baz");
    expect(clsx(false && "foo", "bar", "baz", "")).toBe("bar baz");
  });

  it("handles numbers", () => {
    expect(clsx(1)).toBe("1");
    expect(clsx(12)).toBe("12");
    expect(clsx(0.1)).toBe("0.1");
    expect(clsx(0)).toBe("");
    expect(clsx(Number.POSITIVE_INFINITY)).toBe("Infinity");
    expect(clsx(Number.NaN)).toBe("");
  });

  it("handles variadic numbers", () => {
    expect(clsx(0, 1)).toBe("1");
    expect(clsx(1, 2)).toBe("1 2");
  });

  it("handles objects", () => {
    expect(clsx({})).toBe("");
    expect(clsx({ foo: true })).toBe("foo");
    expect(clsx({ foo: true, bar: false })).toBe("foo");
    expect(clsx({ foo: "hiya", bar: 1 })).toBe("foo bar");
    expect(clsx({ foo: 1, bar: 0, baz: 1 })).toBe("foo baz");
    expect(clsx({ "-foo": 1, "--bar": 1 })).toBe("-foo --bar");
  });

  it("handles variadic objects", () => {
    expect(clsx({}, {})).toBe("");
    expect(clsx({ foo: 1 }, { bar: 2 })).toBe("foo bar");
    expect(clsx({ foo: 1 }, null, { baz: 1, bat: 0 })).toBe("foo baz");
    // biome-ignore format:
    expect(clsx({ foo: 1 }, {}, {}, { bar: "a" }, { baz: null, bat: Number.POSITIVE_INFINITY })).toBe("foo bar bat");
  });

  it("handles arrays", () => {
    expect(clsx([])).toBe("");
    expect(clsx(["foo"])).toBe("foo");
    expect(clsx(["foo", "bar"])).toBe("foo bar");
    expect(clsx(["foo", 0 && "bar", 1 && "baz"])).toBe("foo baz");
  });

  it("handles nested arrays", () => {
    expect(clsx([[[]]])).toBe("");
    expect(clsx([[["foo"]]])).toBe("foo");
    expect(clsx([true, [["foo"]]])).toBe("foo");
    expect(clsx(["foo", ["bar", ["", [["baz"]]]]])).toBe("foo bar baz");
  });

  it("handles variadic arrays", () => {
    expect(clsx([], [])).toBe("");
    expect(clsx(["foo"], ["bar"])).toBe("foo bar");
    expect(clsx(["foo"], null, ["baz", ""], true, "", [])).toBe("foo baz");
  });

  it("handles arrays (no `push` escape)", () => {
    expect(clsx({ push: 1 })).toBe("push");
    expect(clsx({ pop: true })).toBe("pop");
    expect(clsx({ push: true })).toBe("push");
    expect(clsx("hello", { world: 1, push: true })).toBe("hello world push");
  });

  it("handles functions", () => {
    const foo = (): void => {};

    expect(clsx(foo, "hello")).toBe("hello");
    expect(clsx(foo, "hello", clsx)).toBe("hello");
    expect(clsx(foo, "hello", [[clsx], "world"])).toBe("hello world");
  });

  it("handles null", () => {
    expect(clsx(null)).toBe("");
    expect(clsx([null])).toBe("");
    expect(clsx({ value: null })).toBe("");
  });

  describe("is compatible with classnames", () => {
    it("keeps object keys with truthy values", () => {
      const result = clsx({
        a: true,
        b: false,
        c: 0,
        d: null,
        e: undefined,
        f: 1,
      });

      expect(result).toBe("a f");
    });

    it("joins arrays of class names and ignore falsy values", () => {
      const result = clsx("a", 0, null, undefined, true, 1, "b");
      expect(result).toBe("a 1 b");
    });

    it("supports heterogeneous arguments", () => {
      expect(clsx({ a: true }, "b", 0)).toBe("a b");
    });

    it("should be trimmed", () => {
      expect(clsx("", "b", {}, "")).toBe("b");
    });

    it("returns an empty string for an empty configuration", () => {
      expect(clsx({})).toBe("");
    });

    it("supports an array of class names", () => {
      expect(clsx(["a", "b"])).toBe("a b");
    });

    it("joins array arguments with string arguments", () => {
      expect(clsx(["a", "b"], "c")).toBe("a b c");
      expect(clsx("c", ["a", "b"])).toBe("c a b");
    });

    it("handles multiple array arguments", () => {
      expect(clsx(["a", "b"], ["c", "d"])).toBe("a b c d");
    });

    it("handles arrays that include falsy and true values", () => {
      expect(clsx(["a", 0, null, undefined, false, true, "b"])).toBe("a b");
    });

    it("handles arrays that include arrays", () => {
      expect(clsx(["a", ["b", "c"]])).toBe("a b c");
    });

    it("handles arrays that include objects", () => {
      expect(clsx(["a", { b: true, c: false }])).toBe("a b");
    });

    it("handles deep array recursion", () => {
      expect(clsx(["a", ["b", ["c", { d: true }]]])).toBe("a b c d");
    });

    it("handles arrays that are empty", () => {
      expect(clsx("a", [])).toBe("a");
    });

    it("handles nested arrays that have empty nested arrays", () => {
      expect(clsx("a", [[]])).toBe("a");
    });

    it("handles all types of truthy and falsy property values as expected", () => {
      const result = clsx({
        // Falsy:
        null: null,
        emptyString: "",
        noNumber: Number.NaN,
        zero: 0,
        negativeZero: -0,
        false: false,
        undefined: undefined,

        // Truthy (literally anything else):
        nonEmptyString: "foobar",
        whitespace: " ",
        function: Object.prototype.toString,
        emptyObject: {},
        nonEmptyObject: { a: 1, b: 2 },
        emptyList: [],
        nonEmptyList: [1, 2, 3],
        greaterZero: 1,
      });

      // biome-ignore format:
      expect(result).toBe("nonEmptyString whitespace function emptyObject nonEmptyObject emptyList nonEmptyList greaterZero");
    });
  });
});
