import { isNil, isNotNil } from "@laserware/arcade";

import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import { hasAllProperties, hasSomeProperties } from "../internal/search.ts";
import type {
  DOMPropertySearch,
  ElemOrCssSelector,
  PropName,
  PropValue,
} from "../types.ts";

import { getProp } from "./getProps.ts";

/**
 * Search criteria for checking if properties are present in an element.
 * You can use an array of property names to check only if the properties are
 * present, or an object to search for specific values. Use `null` for the value
 * if you only care about the presence of a property.
 *
 * @template E Type of Element with corresponding properties to search.
 */
export type PropsSearch<E extends HTMLElement = HTMLElement> =
  DOMPropertySearch<PropName<E>, PropValue | null>;

/**
 * Checks if the specified `target` has the specified property `name`. If a
 * `value` is specified, checks that the values match.
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param name Name of the property to check for.
 * @param [value] Optional property value to check for.
 *
 * @returns `true` if the specified property `name` is present and `value` matches (if specified).
 *
 * @throws {InvalidElemError} If the specified `target` wasn't found.
 *
 * @example
 * const elem = findElem("button");
 * elem.formMethod = "post";
 *
 * const hasNameOnly = hasProp(elem, "formMethod");
 * // true
 *
 * const hasNameAndValue = hasProp(elem, "formMethod", "post");
 * // true
 */
export function hasProp<E extends HTMLElement = HTMLElement>(
  target: ElemOrCssSelector<E>,
  name: PropName<E>,
  value?: PropValue<E>,
): boolean {
  const elem = elemOrThrow(target, `Unable to check for property ${name}`);

  return hasSingleProp(elem, name, value);
}

/**
 * Checks if the specified `target` has *all* of the properties that match the
 * specified `search` criteria.
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param search Array of property names or properties filter object to check for.
 *
 * @returns `true` if the specified `target` matches all search criteria.
 *
 * @throws {InvalidElemError} If the specified `target` wasn't found.
 *
 * @example
 * const elem = findElem("button");
 * elem.formMethod = "post";
 * elem.formNoValidate = true;
 *
 * const hasAllArray = hasAllProps(elem, ["formMethod"]);
 * // true
 *
 * const notHasAllArray = hasAllProps(elem, ["formMethod", "missing"]);
 * // false (missing does not exist)
 *
 * const hasAllSearch = hasAllProps(elem, {
 *   formMethod: "post",
 *   formNoValidate: true,
 * });
 * // true
 */
export function hasAllProps<E extends HTMLElement = HTMLElement>(
  target: ElemOrCssSelector<E>,
  search: PropsSearch<E>,
): boolean {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to check for properties ${formatForError(search)}`);

  return hasAllProperties(elem, search, hasSingleProp);
}

/**
 * Checks if the specified `target` has *some* of the properties that match
 * the specified `search` criteria.
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param search Array of property names or properties filter object to check for.
 *
 * @returns `true` if the specified `target` matches some search criteria.
 *
 * @throws {InvalidElemError} If the specified `target` wasn't found.
 *
 * @example
 * const elem = findElem("button");
 * elem.formMethod = "post";
 * elem.formNoValidate = true;
 *
 * const hasSomeArray = hasSomeProps(elem, ["formMethod"]);
 * // true
 *
 * const notHasSomeArray = hasSomeProps(elem, ["missing"]);
 * // false ("missing" does not exist)
 *
 * const hasSomeSearch = hasSomeProps(elem, {
 *   formMethod: "post",
 *   formNoValidate: null,
 *   inert: true,
 * });
 * // true
 */
export function hasSomeProps<E extends HTMLElement = HTMLElement>(
  target: ElemOrCssSelector<E>,
  search: PropsSearch<E>,
): boolean {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to check for properties ${formatForError(search)}`);

  return hasSomeProperties(elem, search, hasSingleProp);
}

function hasSingleProp<E extends HTMLElement = HTMLElement>(
  element: E,
  name: PropName<E>,
  value?: PropValue<E> | null,
): boolean {
  if (isNil(value)) {
    return isNotNil(element[name]);
  } else {
    return getProp<E>(element, name) === value;
  }
}
