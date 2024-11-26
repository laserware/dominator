import { isNil } from "@laserware/arcade";

import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import { hasAllProperties, hasSomeProperties } from "../internal/search.ts";
import type {
  DOMPropertySearch,
  ElemOrCssSelector,
  StyleKey,
  StyleValue,
} from "../types.ts";

import { getStyle } from "./getStyles.ts";

/**
 * Search criteria for checking if style properties are present in an element.
 * You can use an array of style property names to check only if the styles are
 * present, or an object to search for specific values. Use `null` for the value
 * if you only care about the presence of a style property.
 */
export type StylesSearch = DOMPropertySearch<StyleKey, StyleValue | null>;

/**
 * Checks if the specified `target` has the specified style property with name `key`.
 *  If a `value` is specified, checks that the values match.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param key Name of the style property to check for.
 * @param [value] Optional style property value to check for.
 *
 * @returns `true` if the specified style is present.
 *
 * @throws {InvalidElemError} If the specified `target` wasn't found.
 */
export function hasStyle(
  target: ElemOrCssSelector,
  key: StyleKey,
  value?: StyleValue,
): boolean {
  const elem = elemOrThrow(target, `Unable to check for style ${key}`);

  return hasSingleStyle(elem, key, value);
}

/**
 * Checks if *all* of the style properties on the specified `target` match the
 * specified `search` criteria.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param search Array of style property names or styles filter to check for.
 *
 * @returns `true` if the specified `target` has *all* specified styles.
 *
 * @throws {InvalidElemError} If the specified `target` wasn't found.
 */
export function hasAllStyles(
  target: ElemOrCssSelector,
  search: StylesSearch,
): boolean {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to check for all styles ${formatForError(search)}`);

  return hasAllProperties(elem, search, hasSingleStyle);
}

/**
 * Checks if *some* of the style properties on the specified `target` match the
 * specified `search` criteria.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param search Array of style property names or styles filter to check for.
 *
 * @returns `true` if the specified `target` has *some* specified styles.
 *
 * @throws {InvalidElemError} If the specified `target` wasn't found.
 */
export function hasSomeStyles(
  target: ElemOrCssSelector,
  search: StylesSearch,
): boolean {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to check for some styles ${formatForError(search)}`);

  return hasSomeProperties(elem, search, hasSingleStyle);
}

function hasSingleStyle(
  element: HTMLElement,
  key: string,
  value?: StyleValue | null,
): boolean {
  const styleValue = getStyle(element, key as StyleKey);

  if (isNil(value)) {
    return styleValue !== undefined;
  } else {
    return styleValue === value;
  }
}
