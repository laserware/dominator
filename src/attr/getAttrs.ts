import { cast } from "../internal/cast.ts";
import { parseDOMValue } from "../internal/domValues.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import type {
  AttrName,
  Attrs,
  AttrValue,
  ElemOrCssSelector,
  KeysOf,
  WithNullValues,
} from "../types.ts";

/**
 * Attempts to get the specified attribute `name` from the specified `target`.
 * If the value is found, it is coerced to a boolean if `"true"` or `"false"`, a
 * number if numeric, or the string value if a string. If not found, returns
 * `null`.
 *
 * @remarks
 * We're returning `null`, rather than `undefined` to match the
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute|Element.getAttribute} API.
 *
 * @template T Type of value to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param name Name of the attribute to get.
 *
 * @returns Value of type `T` or `null` if not found.
 *
 * @throws {InvalidElemError} If the specified `target` wasn't found.
 *
 * @example With Existent String Attribute
 * const elem = findElem("button")!;
 * elem.setAttribute("aria-label", "Label");
 *
 * const result = getAttr(elem, "aria-label");
 * // "Label"

 * @example With Existent Number Attribute
 * const elem = findElem("button")!;
 * elem.setAttribute("aria-colcount", "20");
 *
 * const result = getAttr(elem, "aria-colcount");
 * // 20

 * @example With Existent Boolean Attribute
 * const elem = findElem("button")!;
 * elem.setAttribute("checked", "");
 *
 * const result = getAttr(elem, "checked");
 * // true
 */
export function getAttr<T extends AttrValue = string>(
  target: ElemOrCssSelector,
  name: AttrName,
): T | null {
  const elem = elemOrThrow(target, `Unable to get attribute ${name}`);

  return getSingleAttr<T>(elem, name) ?? null;
}

/**
 * Builds an object with the keys equal to the specified attribute `names` and
 * the value equal to the corresponding attribute value in the specified `target`.
 * If the value is found it is coerced to a boolean if "true" or "false", a
 * number if numeric, or the string value if a string. If not found, the value
 * is `null`.
 *
 * @template T Shape of attributes object to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param names Names of the attributes for which to find values.
 *
 * @returns Object with specified names as keys and corresponding attribute values.
 *          Note that you will need to perform checks for whether a value is
 *          `undefined` in the returned object if some of the entries weren't present.
 *
 * @throws {InvalidElemError} If the specified `target` wasn't found.
 *
 * @example
 * interface Shape {
 *   a: string;
 *   b: string;
 *   c: string;
 * }
 *
 * const elem = findElem("button")!;
 * elem.setAttribute("a", "a");
 * elem.setAttribute("b", "b");
 *
 * // Note that `c` doesn't exist on the element, so it's `undefined`:
 * const result = getAttrs<Shape>(elem, ["a", "b", "c"]);
 * // { a: "a", b: "b", c: undefined }
 */
export function getAttrs<T extends Attrs = Attrs>(
  target: ElemOrCssSelector,
  names: KeysOf<T>,
): WithNullValues<T> {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to get attributes ${formatForError(names)}`);

  const attrs: Record<string, AttrValue | null> = {};

  for (const name of names) {
    attrs[name] = getSingleAttr(elem, name);
  }

  return cast<WithNullValues<T>>(attrs);
}

function getSingleAttr<T extends AttrValue = string>(
  element: HTMLElement,
  name: AttrName,
): T | null {
  const attrValue = element.getAttribute(name);

  return parseDOMValue<T>(attrValue) ?? null;
}
