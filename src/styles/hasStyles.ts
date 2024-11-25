import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import type { ElemOrCssSelector, StyleKey } from "../types.ts";

/**
 * Checks if the specified `target` has the specified style property with name `key`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param key Name of the style property to check for.
 *
 * @returns `true` if the specified style is present, otherwise `false`.
 *
 * @throws {InvalidElemError} If the specified `target` does not exist.
 */
export function hasStyle(target: ElemOrCssSelector, key: StyleKey): boolean {
  const elem = elemOrThrow(target, `Unable to check for style ${key}`);

  return hasSingleStyle(elem, key);
}

/**
 * Checks if the specified `target` has *all* of the style properties with
 * names matching the specified `keys`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param keys Names of the style properties to check for.
 *
 * @returns `true` if the specified `target` has *all* specified styles, otherwise `false`.
 *
 * @throws {InvalidElemError} If the specified `target` does not exist.
 */
export function hasAllStyles(
  target: ElemOrCssSelector,
  keys: StyleKey[],
): boolean {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to check for all styles ${formatForError(keys)}`);

  for (const key of keys) {
    if (!hasSingleStyle(elem, key)) {
      return false;
    }
  }

  return true;
}

/**
 * Checks if the specified `target` has *some* of the style properties with
 * names matching the specified `keys`
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param keys Names of the style properties to check for.
 *
 * @returns `true` if the specified `target` has *some* specified styles, otherwise `false`.
 *
 * @throws {InvalidElemError} If the specified `target` does not exist.
 */
export function hasSomeStyles(
  target: ElemOrCssSelector,
  keys: StyleKey[],
): boolean {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to check for some styles ${formatForError(keys)}`);

  for (const key of keys) {
    if (hasSingleStyle(elem, key)) {
      return true;
    }
  }

  return false;
}

function hasSingleStyle(element: HTMLElement, key: StyleKey): boolean {
  // @ts-ignore I know `key` is a valid key for styles. If it wasn't we return `undefined`.
  const styleValue = element.style[key];

  if (styleValue !== undefined) {
    return true;
  }

  const styleProperty = element.style.getPropertyValue(key);

  return styleProperty !== "";
}
