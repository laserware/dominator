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
 * [Element.getAttribute](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute) API.
 *
 * @template T Type of value to return.
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param name Name of the attribute to get.
 *
 * @returns Value of type `T` or `null` if not found.
 *
 * @throws {@link InvalidElemError} If the specified `target` wasn't found.
 *
 * @example
 * #### String Attribute
 *
 * ```ts
 * const elem = findElem("button")!.setAttribute("aria-label", "Label");
 *
 * const result = getAttr(elem, "aria-label");
 * // "Label"
 * ```
 *
 * #### Number Attribute
 *
 * ```ts
 * const elem = findElem("button")!.setAttribute("aria-colcount", "20");
 *
 * const result = getAttr(elem, "aria-colcount");
 * // 20
 * ```
 *
 * #### Boolean Attribute
 *
 * ```ts
 * const elem = findElem("button")!.setAttribute("checked", "");
 *
 * const result = getAttr(elem, "checked");
 * // true
 * ```
 *
 * @group Attributes
 */
export function getAttr<
  T extends AttrValue = AttrValue,
  E extends HTMLElement = HTMLElement,
>(target: ElemOrCssSelector<E>, name: AttrName<E>): T | null {
  const elem = elemOrThrow(target, `Unable to get attribute ${name}`);

  return getSingleAttr<T, E>(elem, name) ?? null;
}

/**
 * Builds an object with the keys equal to the specified attribute `names` and
 * the value equal to the corresponding attribute value in the specified `target`.
 * If the value is found it is coerced to a boolean if "true" or "false", a
 * number if numeric, or the string value if a string. If not found, the value
 * is `null`.
 *
 * @template T Shape of attributes object to return.
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param names Names of the attributes for which to find values.
 *
 * @returns Object with specified names as keys and corresponding attribute values.
 *          Note that you will need to perform checks for whether a value is
 *          `undefined` in the returned object if some of the entries weren't present.
 *
 * @throws {@link InvalidElemError} If the specified `target` wasn't found.
 *
 * @example
 * interface Shape {
 *   "aria-label": string;
 *   "aria-colcount": number;
 *   invalid: string;
 * }
 *
 * const elem = findElem("button")!
 *   .setAttribute("aria-label", "Test")
 *   .setAttribute("aria-rowcount", "20");
 *
 * // Note that `invalid` doesn't exist on the element, so it's `undefined`:
 * const result = getAttrs<Shape>(elem, ["aria-label", "aria-rowcount", "invalid"]);
 * // { "aria-label": "Test", "aria-rowcount": 20, invalid: undefined }
 *
 * @group Attributes
 */
export function getAttrs<
  T extends Attrs = Attrs,
  E extends HTMLElement = HTMLElement,
>(target: ElemOrCssSelector<E>, names: KeysOf<T>): WithNullValues<T> {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to get attributes ${formatForError(names)}`);

  const attrs: Record<string, AttrValue | null> = {};

  for (const name of names) {
    attrs[name] = getSingleAttr(elem, cast<AttrName>(name));
  }

  return cast<WithNullValues<T>>(attrs);
}

function getSingleAttr<
  T extends AttrValue = AttrValue,
  E extends HTMLElement = HTMLElement,
>(element: E, name: AttrName<E>): T | null {
  const attrValue = element.getAttribute(name);

  return parseDOMValue<T>(attrValue) ?? null;
}
