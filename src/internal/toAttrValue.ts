import { isNil } from "@laserware/arcade";

import type { AttrValue, NullOr } from "../types.ts";

/**
 * Coerces the specified `value` coming from the `getAttribute()` method on an
 * Element to a value of type `T` that represents a valid {@linkcode AttrValue}.
 *
 * Note that it will return the value directly (string or null) if it couldn't
 * convert it to the specified type `T` generic.
 *
 * @template T Type of value to return.
 *
 * @param value Value to coerce to an {@linkcode AttrValue}.
 *
 * @example Boolean Attributes
 * element.setAttribute("inert", "");
 * const inert = toAttrValue<boolean>(element.getAttribute("inert"));
 * // true
 *
 * element.setAttribute("aria-hidden", "true");
 * const ariaHidden = toAttrValue<boolean>(element.getAttribute("aria-hidden"));
 * // true
 *
 * @example Number Attribute
 * element.setAttribute("aria-rowindex", "4");
 * const rowIndex = toAttrValue<number>(element.getAttribute("aria-rowindex"));
 * // 4
 *
 * @example Array Attribute
 * element.setAttribute("data-value", JSON.stringify([1, 2, 3]));
 * const value = toAttrValue(element.getAttribute("data-value"));
 * // [1, 2, 3]
 *
 * @example Object Attribute
 * element.setAttribute("data-value", JSON.stringify({ a: "b", c: "d" }));
 * const value = toAttrValue(element.getAttribute("data-value"));
 * // { a: "b", c: "d" }
 *
 * @example Invalid Number Attribute
 * element.setAttribute("aria-rowindex", "4abc");
 * const rowIndex = toAttrValue<number>(element.getAttribute("aria-rowindex"));
 * // "4abc"
 */
export function toAttrValue<T extends AttrValue>(value: unknown): NullOr<T> {
  if (isNil(value)) {
    return null;
  }

  // If an attribute is present on an element without a value, that represents
  // a "true" condition. For example, `inert` is specified on an element without
  // a value, but its presence indicates that the element is inert. The
  // return value of `getAttribute("inert")` would be "", so we interpret that
  // as `true` and return it:
  if (value === "") {
    return true as T;
  }

  if (value === "true" || value === "false") {
    return (value === "true") as T;
  }

  // Technically, we could just try to call `JSON.parse()` on the value and if
  // it is a valid number, it would get converted to one. However, if it fails,
  // it will throw an error. Instead, we first try to convert it to a number
  // using the `Number` initializer.
  const numericValue = Number(value);
  if (!Number.isNaN(numericValue)) {
    return numericValue as T;
  }

  try {
    return JSON.parse(value as string) as T;
  } catch {
    throw value as T;
  }
}
