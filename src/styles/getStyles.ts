import { InvalidElemError } from "../elem/InvalidElemError.ts";
import { toElem } from "../elem/toElem.ts";

import { parseDOMValue } from "../internal/domValues.ts";
import { formatForError } from "../internal/formatForError.ts";
import type {
  ElemOrCssSelector,
  KeysOf,
  StyleKey,
  Styles,
  StyleValue,
} from "../types.ts";

/**
 * Attempts to get the specified style property with name `key` from the
 * specified `target`. If the value is found, it is coerced to a boolean if
 * `"true"` or `"false"`, a number if numeric, or the string value if a string.
 * If not found, returns `undefined`.
 *
 * @template T Type of value to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param key Name of the style property to get.
 *
 * @returns Value of type `T` or `null` if not found.
 *
 * @throws {InvalidElemError} If the specified `target` does not exist.
 */
export function getStyle<T extends StyleValue>(
  target: ElemOrCssSelector,
  key: StyleKey,
): T | undefined {
  const elem = toElem(target);
  if (elem === null || !("style" in elem)) {
    throw new InvalidElemError(`Unable to get style value for ${key}`);
  }

  return getSingleStyle<T>(elem, key);
}

/**
 * Builds an object with the keys equal to the specified `keys` and
 * the value equal to the corresponding style property value in the specified
 * `target`. If the value is found it is coerced to a boolean if `"true"` or
 * `"false"`, a number if numeric, or the string value if a string. If not
 * found, the value is excluded from the return value.
 *
 * @template T Shape of attributes object to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param keys Names of the style properties to get values for.
 *
 * @returns Object with specified names as keys and corresponding style property values.
 *          Note that you will need to perform checks for the presence of a value in the
 *          returned object because it's a `Partial` of the specified `T`.
 *
 * @throws {InvalidElemError} If the specified `target` does not exist.
 */
export function getStyles<T extends Styles = Styles>(
  target: ElemOrCssSelector,
  keys: KeysOf<T>,
): Partial<T> {
  const elem = toElem(target);
  if (elem === null || !("style" in elem)) {
    // prettier-ignore
    throw new InvalidElemError(`Unable to get style values for ${formatForError(keys)}`);
  }

  const styles: Partial<T> = {};

  for (const key of keys) {
    // @ts-ignore
    styles[key] = getSingleStyle(elem, key);
  }

  return styles;
}

function getSingleStyle<T extends StyleValue>(
  element: HTMLElement,
  key: StyleKey,
): T | undefined {
  // @ts-ignore I know `key` is a valid key for styles. If it wasn't we return `undefined`.
  const styleValue = element.style[key];

  if (styleValue === undefined) {
    return undefined;
  } else {
    return parseDOMValue<T>(styleValue) ?? undefined;
  }
}
