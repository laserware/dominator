import type {
  AttrValue,
  CssVarValue,
  DataValue,
  StyleValue,
} from "../types.ts";

/**
 * Coerces the specified `value` coming from the DOM via attributes, the style
 * property, or the dataset property for an element to the specified value `T`.
 *
 * Note that it will return the string value directly if it couldn't
 * convert it to the specified type `T` generic. If the value is `null` or
 * `undefined`, returns `undefined`.
 *
 * @internal
 *
 * @remarks
 * We avoid using `null` here because we're parsing a DOM value which should
 * either exist or it shouldn't. The return value of `getAttribute` is `null`
 * if the attribute doesn't exist, but since we're also accessing properties
 * from `style` and `dataset`, which are `undefined` if they don't exist, we
 * want to ensure consistency across the board.
 *
 * @template T Type of value to return.
 *
 * @param value Value to coerce to an {@linkcode AttrValue}.
 *
 * @example Boolean Attributes
 * element.setAttribute("inert", "");
 * const inert = parseDOMValue<boolean>(element.getAttribute("inert"));
 * // true
 *
 * element.setAttribute("aria-hidden", "true");
 * const ariaHidden = parseDOMValue<boolean>(element.getAttribute("aria-hidden"));
 * // true
 *
 * @example Number Attribute
 * element.setAttribute("aria-rowindex", "4");
 * const rowIndex = parseDOMValue<number>(element.getAttribute("aria-rowindex"));
 * // 4
 *
 * @example Array Attribute
 * element.setAttribute("data-value", JSON.stringify([1, 2, 3]));
 * const value = parseDOMValue(element.getAttribute("data-value"));
 * // [1, 2, 3]
 *
 * @example Object Attribute
 * element.setAttribute("data-value", JSON.stringify({ a: "b", c: "d" }));
 * const value = parseDOMValue(element.getAttribute("data-value"));
 * // { a: "b", c: "d" }
 *
 * @example Invalid Number Attribute
 * element.setAttribute("aria-rowindex", "4abc");
 * const rowIndex = parseDOMValue<number>(element.getAttribute("aria-rowindex"));
 * // "4abc"
 */
export function parseDOMValue<
  T extends AttrValue | DataValue | CssVarValue | StyleValue,
>(value: unknown): T | undefined {
  if (value === null || value === undefined) {
    return undefined;
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
    return value as T;
  }
}