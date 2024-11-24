import { elemOrThrow } from "../internal/elemOrThrow.ts";
import { formatList } from "../internal/formatList.ts";
import { parseDOMValue } from "../internal/parseDOMValue.ts";
import {
  cast,
  type AttrName,
  type Attrs,
  type AttrValue,
  type ElemOrCssSelector,
  type KeysOf,
  type NullOr,
} from "../types.ts";

/**
 * Returns the value of the specified attribute `name` in the specified `target`.
 * If the value is found it is coerced to a boolean if "true" or "false", a
 * number if numeric, or the string value if a string. If not found, returns
 * `undefined` or the specified `fallback`.
 *
 * @template T Type of value to return.
 *
 * @throws {InvalidElemError} If the `target` specified does not exist.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param name Name of the attribute to get.
 * @param [fallback] Optional fallback value to return if the attribute is not found.
 */
export function getAttr<T extends AttrValue = string>(
  target: NullOr<ElemOrCssSelector>,
  name: AttrName,
  fallback?: T,
): T | undefined {
  const elem = elemOrThrow(target, `Unable to get attribute ${name}`);

  return getSingleAttr<T>(elem, name, fallback);
}

/**
 * Returns an object with the keys equal to the specified attribute `names` and
 * the value equal to the corresponding attribute value in the specified `target`.
 * If the value is found it is coerced to a boolean if "true" or "false", a
 * number if numeric, or the string value if a string. If not found, the value
 * is set to `null`.
 *
 * @template T Shape of attributes object to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param names Names of the attributes for which to find values.
 * @param [fallback] Optional fallback value to use if values not found.
 *
 * @throws {InvalidElemError} If the `target` specified does not exist.
 *
 * @example Without Default Values
 * interface Shape {
 *   a: string;
 *   b: string;
 * }
 *
 * elem.setAttribute("a", "a");
 * elem.setAttribute("b", "b");
 *
 * const result = getAttrs<Shape>(elem, ["a", "b"]);
 * // { a: "a", b: "b" }

 * @example With Default Values
 * interface Shape {
 *   a: string;
 *   b: string;
 *   c: number;
 * }
 *
 * elem.setAttribute("a", "a");
 * elem.setAttribute("b", "b");
 *
 * // The `c` attribute doesn't exist on the element, but we still want it
 * // to be defined in the result:
 * const result = getAttrs<Shape>(elem, ["a", "b", "c"], { c: 24 });
 * // { a: "a", b: "b", c: 24 }
 */
export function getAttrs<T extends Attrs = any>(
  target: NullOr<ElemOrCssSelector>,
  names: KeysOf<T>,
  fallback?: Partial<T>,
): Partial<T> {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to get attributes ${formatList(names)}`);

  const attrs: Record<string, any> = {};

  const validFallback = fallback ?? {};

  for (const name of names) {
    // @ts-ignore
    attrs[name] = getSingleAttr(elem, name, validFallback[name]);
  }

  return cast<Partial<T>>(attrs);
}

function getSingleAttr<T extends AttrValue = string>(
  elem: HTMLElement,
  name: AttrName,
  fallback?: T,
): T | undefined {
  const attrValue = elem.getAttribute(name);

  return parseDOMValue<T>(attrValue) ?? fallback ?? undefined;
}
