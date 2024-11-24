import { parseDOMValue } from "../internal/domValues.ts";
import { elemOrThrow } from "../internal/elemOrThrow.ts";
import { formatForError } from "../internal/formatForError.ts";
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
 * @throws {InvalidElemError} If the specified `target` does not exist.
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
 * is excluded from the return value.
 *
 * @template T Shape of attributes object to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param names Names of the attributes for which to find values.
 *
 * @returns Object with specified names as keys and corresponding attribute values.
 *          Note that you will need to perform checks for the presence of a value in the
 *          returned object because it's a `Partial` of the specified `T`.
 *
 * @throws {InvalidElemError} If the specified `target` does not exist.
 *
 * @example
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
 */
export function getAttrs<T extends Attrs = Attrs>(
  target: ElemOrCssSelector,
  names: KeysOf<T>,
): Partial<T> {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to get attributes ${formatForError(names)}`);

  const attrs: Partial<T> = {};

  for (const name of names) {
    // @ts-ignore This will work, but TypeScript isn't happy.
    attrs[name] = getSingleAttr(elem, name);
  }

  return attrs;
}

function getSingleAttr<T extends AttrValue = string>(
  element: HTMLElement,
  name: AttrName,
): T | undefined {
  const attrValue = element.getAttribute(name);

  return parseDOMValue<T>(attrValue);
}
