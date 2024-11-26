import { isNil } from "@laserware/arcade";

import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import { hasAllProperties, hasSomeProperties } from "../internal/search.ts";
import type {
  AttrName,
  AttrValue,
  DOMPropertySearch,
  ElemOrCssSelector,
} from "../types.ts";

import { getAttr } from "./getAttrs.ts";

/**
 * Search criteria for checking if attributes are present in an element.
 * You can use an array of attribute names to check only if the attributes are
 * present, or an object to search for specific values. Use `null` for the value
 * if you only care about the presence of an attribute.
 */
export type AttrsSearch = DOMPropertySearch<AttrName, AttrValue | null>;

/**
 * Checks if the specified `target` has the specified attribute `name`. If a
 * `value` is specified, checks that the values match.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param name Name of the attribute to check for.
 * @param [value] Optional attribute value to check for.
 *
 * @returns `true` if the specified attribute `name` is present and `value` matches (if specified).
 *
 * @throws {InvalidElemError} If the specified `target` wasn't found.
 *
 * @example
 * const elem = createElem(`<div aria-hidden="true" name="test">Test</div>`);
 *
 * const hasNameOnly = hasAttr(elem, "aria-hidden");
 * // true
 *
 * const hasNameAndValue = hasAttr(elem, "name", "test");
 * // true
 */
export function hasAttr(
  target: ElemOrCssSelector,
  name: AttrName,
  value?: AttrValue,
): boolean {
  const elem = elemOrThrow(target, `Unable to check for attribute ${name}`);

  return hasSingleAttr(elem, name, value);
}

/**
 * Checks if the specified `target` has *all* of the attributes that match the
 * specified `search` criteria.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param search Array of attribute names or attributes filter object to check for.
 *
 * @returns `true` if the specified `target` matches all search criteria.
 *
 * @throws {InvalidElemError} If the specified `target` wasn't found.
 *
 * @example
 * const elem = createElem(`<div aria-hidden="true" name="test" inert>Test</div>`);
 *
 * const hasAllArray = hasAllAttrs(elem, ["aria-hidden"]);
 * // true
 *
 * const notHasAllArray = hasAllAttrs(elem, ["aria-hidden", "missing"]);
 * // false (missing does not exist)
 *
 * const hasAllSearch = hasAllAttrs(elem, {
 *   "aria-hidden": true,
 *   name: "test",
 *   inert: null,
 * });
 * // true
 */
export function hasAllAttrs(
  target: ElemOrCssSelector,
  search: AttrsSearch,
): boolean {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to check for attributes ${formatForError(search)}`);

  return hasAllProperties(elem, search, hasSingleAttr);
}

/**
 * Checks if the specified `target` has *some* of the attributes that match
 * the specified `search` criteria.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param search Array of attribute names or attributes filter object to check for.
 *
 * @returns `true` if the specified `target` matches some search criteria.
 *
 * @throws {InvalidElemError} If the specified `target` wasn't found.
 *
 * @example
 * const elem = createElem(`<div aria-hidden="true" name="test" inert>Test</div>`);
 *
 * const hasSomeArray = hasSomeAttrs(elem, ["aria-hidden", "missing"]);
 * // true
 *
 * const hasSomeSearch = hasSomeAttrs(elem, {
 *   "aria-hidden": true,
 *   name: "test",
 *   inert: null,
 *   missing: null,
 * });
 * // true
 */
export function hasSomeAttrs(
  target: ElemOrCssSelector,
  search: AttrsSearch,
): boolean {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to check for attributes ${formatForError(search)}`);

  return hasSomeProperties(elem, search, hasSingleAttr);
}

function hasSingleAttr(
  element: HTMLElement,
  name: AttrName,
  value?: AttrValue | null,
): boolean {
  if (isNil(value)) {
    return element.hasAttribute(name);
  } else {
    return getAttr(element, name) === value;
  }
}
