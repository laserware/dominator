import { isNil } from "@laserware/arcade";

import { InvalidElemError } from "../elems/InvalidElemError.ts";
import { toElem } from "../elems/toElem.ts";
import type { ElemOrCssSelector } from "../elems/types.ts";
import { formatForError } from "../internal/formatForError.ts";
import { hasAllProperties, hasSomeProperties } from "../internal/search.ts";
import type { PropertySearch } from "../types.ts";

import { getStyle } from "./getStyles.ts";
import type { StyleKey, StyleValue } from "./types.ts";

/**
 * Search criteria for checking if style properties are present in an element.
 * You can use an array of style property names to check only if the styles are
 * present, or an object to search for specific values. Use `null` for the value
 * if you only care about the presence of a style property.
 */
export type StylesSearch = PropertySearch<StyleKey, StyleValue | null>;

/**
 * Checks if the specified `target` has the specified style property with name `key`.
 * If a `value` is specified, checks that the values match.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param key Name of the style property to check for.
 * @param [value] Optional style property value to check for.
 *
 * @returns `true` if the specified style is present.
 *
 * @throws {@linkcode elems!InvalidElemError} if the `target` could not be found or doesn't have
 *                                            a [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) property.
 */
export function hasStyle(
  target: ElemOrCssSelector,
  key: StyleKey,
  value?: StyleValue,
): boolean {
  const elem = toElem(target);
  if (elem === null || !("style" in elem)) {
    throw new InvalidElemError(`Unable to check for style ${key}`);
  }

  return hasSingleStyle(elem, key, value);
}

/**
 * Checks if **all** of the style properties on the specified `target` match the
 * specified `search` criteria.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param search Array of style property names or styles filter to check for.
 *
 * @returns `true` if the specified `target` has **all** specified styles.
 *
 * @throws {@linkcode elems!InvalidElemError} if the `target` could not be found or doesn't have
 *                                            a [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) property.
 */
export function hasAllStyles(
  target: ElemOrCssSelector,
  search: StylesSearch,
): boolean {
  const elem = toElem(target);
  if (elem === null || !("style" in elem)) {
    // prettier-ignore
    throw new InvalidElemError(`Unable to check for all styles ${formatForError(search)}`);
  }

  return hasAllProperties(elem, search, hasSingleStyle);
}

/**
 * Checks if **some** of the style properties on the specified `target` match the
 * specified `search` criteria.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param search Array of style property names or styles filter to check for.
 *
 * @returns `true` if the specified `target` has **some** specified styles.
 *
 * @throws {@linkcode elems!InvalidElemError} if the `target` could not be found or doesn't have
 *                                            a [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) property.
 */
export function hasSomeStyles(
  target: ElemOrCssSelector,
  search: StylesSearch,
): boolean {
  const elem = toElem(target);
  if (elem === null || !("style" in elem)) {
    // prettier-ignore
    throw new InvalidElemError(`Unable to check for some styles ${formatForError(search)}`);
  }

  return hasSomeProperties(elem, search, hasSingleStyle);
}

function hasSingleStyle(
  element: Element,
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
