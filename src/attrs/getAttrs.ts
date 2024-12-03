import { cast, type KeysOf, type WithNullValues } from "@laserware/arcade";

import type { AnyElement } from "../dom.ts";
import type { ElemOrCssSelector } from "../elems/types.ts";
import { parseDOMValue } from "../internal/domValues.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";

import type { AttrName, Attrs, AttrValue } from "./types.ts";

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
 * @throws {@linkcode elems!InvalidElemError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML**
 *
 * ```html
 * <div
 *   id="example"
 *   role="slider"
 *   aria-valuemax="30"
 *   aria-label="Example"
 *   aria-disabled="false"
 * >
 *   ...
 * </div>
 * ```
 *
 * **Code**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * getAttr(elem, "aria-label");
 * // "Example"
 *
 * getAttr(elem, "aria-valuemax");
 * // 30
 *
 * getAttr(elem, "aria-disabled");
 * // false
 * ```
 */
export function getAttr<
  T extends AttrValue = AttrValue,
  E extends AnyElement = HTMLElement,
>(target: ElemOrCssSelector<E>, name: AttrName<E>): T | null {
  const elem = elemOrThrow(target, `Unable to get attribute ${name}`);

  return getSingleAttr<T, E>(elem, name) ?? null;
}

/**
 * Builds an object with the keys equal to the specified attribute `names` and
 * the value equal to the corresponding attribute value in the specified `target`.
 * If the value is found it is coerced to a boolean if `"true"` or `"false"`, a
 * number if numeric, or the string value if a string. If not found, the value
 * is `null`.
 *
 * > [!IMPORTANT]
 * > You will need to perform checks for whether a value is `null` in the returned
 * > object if some of the entries weren't present.
 *
 * ```ts
 * // Assuming you pass this in as the generic:
 * type ShapeIn = {
 *   role: string;
 *   "aria-label": string;
 * };
 *
 * // The return type of this function is:
 * type ShapeOut = {
 *   role: string | null;
 *   "aria-label": string | null;
 * };
 * ```
 *
 * @remarks
 * The {@linkcode arcade!WithNullValues} type represents an object with values that could be `null`.
 *
 * @template T Shape of attributes object to return.
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param names Names of the attributes for which to find values.
 *
 * @returns Object with specified names as keys and corresponding attribute values (or `null` if not present).
 *
 * @throws {@linkcode elems!InvalidElemError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML**
 *
 * ```html
 * <div
 *   id="example"
 *   role="slider"
 *   aria-valuemax="30"
 *   aria-label="Example"
 *   aria-disabled="false"
 * >
 *   ...
 * </div>
 * ```
 *
 * **Code**
 *
 * ```ts
 * type Shape = {
 *   "aria-label": string | null;
 *   "aria-valuemax": number | null;
 *   invalid: string | null;
 * };
 *
 * const elem = findElem("#example")!;
 *
 * getAttrs<Shape>(elem, [
 *   "aria-label",
 *   "aria-valuemax",
 *   "invalid", // Doesn't exist, so it's `null`
 * ]);
 * // { "aria-label": "Example", "aria-valuemax": 30, invalid: null }
 * ```
 */
export function getAttrs<
  T extends Attrs = Attrs,
  E extends AnyElement = HTMLElement,
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
  E extends AnyElement = HTMLElement,
>(element: E, name: AttrName<E>): T | null {
  const attrValue = element.getAttribute(name);

  return parseDOMValue<T>(attrValue) ?? null;
}
