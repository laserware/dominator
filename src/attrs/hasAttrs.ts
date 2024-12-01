import { isNil } from "@laserware/arcade";

import type { AnyElement } from "../dom.ts";
import type { ElemOrCssSelector } from "../elems/types.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import { hasAllProperties, hasSomeProperties } from "../internal/search.ts";

import type { DOMPropertySearch } from "../search.ts";

import { getAttr } from "./getAttrs.ts";
import type { AttrName, AttrValue } from "./types.ts";

/**
 * Search criteria for checking if attributes are present in an element.
 * You can use an array of attribute names to check only if the attributes are
 * present, or an object to search for specific values. Use `null` for the value
 * if you only care about the presence of an attribute.
 *
 * @template E Type of Element with corresponding attributes to search.
 */
export type AttrsSearch<E extends AnyElement = HTMLElement> = DOMPropertySearch<
  AttrName<E>,
  AttrValue | null
>;

/**
 * Checks if the specified `target` has the specified attribute `name`. If a
 * `value` is specified, checks that the values match.
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param name Name of the attribute to check for.
 * @param [value] Optional attribute value to check for.
 *
 * @returns `true` if the specified attribute `name` is present and `value` matches (if specified).
 *
 * @throws {@linkcode elems!InvalidElemError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML**
 *
 * ```html
 * <button id="example" aria-pressed="true" aria-label="Example">
 *   Example
 * </button>
 * ```
 *
 * **Code**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * hasAttr(elem, "aria-pressed");
 * // true
 *
 * hasAttr(elem, "aria-pressed", "true");
 * // false ("true" cannot be a string, must be the boolean value `true`)
 *
 * hasAttr(elem, "aria-label", "Example");
 * // true
 * ```
 */
export function hasAttr<E extends AnyElement = HTMLElement>(
  target: ElemOrCssSelector<E>,
  name: AttrName<E>,
  value?: AttrValue,
): boolean {
  const elem = elemOrThrow(target, `Unable to check for attribute ${name}`);

  return hasSingleAttr(elem, name, value);
}

/**
 * Checks if the specified `target` has **all** of the attributes that match the
 * specified `search` criteria.
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param search Array of attribute names or attributes filter object to check for.
 *
 * @returns `true` if the specified `target` matches all search criteria.
 *
 * @throws {@linkcode elems!InvalidElemError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML**
 *
 * ```html
 * <div id="example" aria-hidden="true" inert>
 *   Example
 * </div>
 * ```
 *
 * **Code**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * hasAllAttrs(elem, ["aria-hidden"]);
 * // true
 *
 * hasAllAttrs(elem, ["aria-hidden", "missing"]);
 * // false ("missing" does not exist)
 *
 * hasAllAttrs(elem, {
 *   "aria-hidden": true,
 *   inert: null,
 * });
 * // true
 * ```
 */
export function hasAllAttrs<E extends AnyElement = HTMLElement>(
  target: ElemOrCssSelector<E>,
  search: AttrsSearch<E>,
): boolean {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to check for all attributes ${formatForError(search)}`);

  return hasAllProperties(elem, search, hasSingleAttr);
}

/**
 * Checks if the specified `target` has **some** of the attributes that match
 * the specified `search` criteria.
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param search Array of attribute names or attributes filter object to check for.
 *
 * @returns `true` if the specified `target` matches some search criteria.
 *
 * @throws {@linkcode elems!InvalidElemError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML**
 *
 * ```html
 * <div id="example" aria-hidden="true" inert>Example</div>
 * ```
 *
 * **Code**
 *
 * Note that the `aria-label` attribute isn't present on the `div` above,
 * but the function still returns `true`:
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * hasSomeAttrs(elem, ["aria-hidden", "aria-label"]);
 * // true
 *
 * hasSomeAttrs(elem, {
 *   inert: null,
 *   "aria-hidden": true,
 *   "aria-label": "Click Me",
 * });
 * // true
 * ```
 */
export function hasSomeAttrs<E extends AnyElement = HTMLElement>(
  target: ElemOrCssSelector<E>,
  search: AttrsSearch<E>,
): boolean {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to check for some attributes ${formatForError(search)}`);

  return hasSomeProperties(elem, search, hasSingleAttr);
}

function hasSingleAttr(
  element: AnyElement,
  name: AttrName,
  value?: AttrValue | null,
): boolean {
  if (isNil(value)) {
    return element.hasAttribute(name);
  } else {
    return getAttr(element, name) === value;
  }
}
