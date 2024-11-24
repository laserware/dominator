import { cast } from "../internal/cast.ts";
import { elemOrThrow } from "../internal/elemOrThrow.ts";
import { formatForError } from "../internal/formatForError.ts";
import { parseDOMValue } from "../internal/parseDOMValue.ts";
import type {
  AttrName,
  Attrs,
  AttrValue,
  ElemOrCssSelector,
  KeysOf,
} from "../types.ts";

/**
 * Attempts to get the specified attribute `name` from the specified `target`.
 * If the value is found, it is coerced to a boolean if `"true"` or `"false"`, a
 * number if numeric, or the string value if a string. If not found, returns
 * `null` or the specified `fallback`.
 *
 * @remarks
 * We're returning `null`, rather than `undefined` to match the
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute|Element.getAttribute} API.
 *
 *
 * @template T Type of value to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param name Name of the attribute to get.
 * @param [fallback] Optional fallback value to return if the attribute is not found.
 *
 * @returns Value of type `T` or `null` if not found.
 *
 * @throws {InvalidElemError} If the `target` specified does not exist.
 */
export function getAttr<T extends AttrValue = string>(
  target: ElemOrCssSelector,
  name: AttrName,
  fallback?: T,
): T | null {
  const elem = elemOrThrow(target, `Unable to get attribute ${name}`);

  return getSingleAttr<T>(elem, name, fallback) ?? null;
}

/**
 * Builds an object with the keys equal to the specified attribute `names` and
 * the value equal to the corresponding attribute value in the specified `target`.
 * If the value is found it is coerced to a boolean if "true" or "false", a
 * number if numeric, or the string value if a string. If not found, the value
 * is excluded from the return value. Specifying a `fallback` object will
 * ensure any possibly missing attributes are included.
 *
 *
 * @template T Shape of attributes object to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param names Names of the attributes for which to find values.
 * @param [fallback] Optional fallback value to use if values not found.
 *
 * @returns Object with specified names as keys and corresponding attribute values.
 *          Note that you will need to perform checks for the presence of a value in the
 *          returned object because it's a `Partial` of the specified `T`.
 *
 * @throws {InvalidElemError} If the `target` specified does not exist.
 *
 * @example Without Default Values
 * interface Shape {
 *   a: string;
 *   b: string;
 *   c: string;
 * }
 *
 * elem.setAttribute("a", "a");
 * elem.setAttribute("b", "b");
 *
 * // Note that `c` doesn't exist on the element, so it's not returned in the result:
 * const result = getAttrs<Shape>(elem, ["a", "b", "c"]);
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
  target: ElemOrCssSelector,
  names: KeysOf<T>,
  fallback?: Partial<T>,
): Partial<T> {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to get attributes ${formatForError(names)}`);

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

  return parseDOMValue<T>(attrValue) ?? fallback;
}
