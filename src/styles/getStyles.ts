import { toElem } from "../elems/toElem.ts";

import { InvalidElemError } from "../errors.ts";
import { parseDOMValue } from "../internal/domValues.ts";
import { formatForError } from "../internal/formatForError.ts";
import type {
  AnyElement,
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
 * @throws {@linkcode InvalidElemError} If the specified `target` wasn't found.
 *
 * @group Styles
 */
export function getStyle<T extends StyleValue>(
  target: ElemOrCssSelector,
  key: StyleKey,
): T | undefined {
  const elem = toElem(target);
  if (elem === null || !("style" in elem)) {
    throw new InvalidElemError(`Unable to get style for ${key}`);
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
 * @throws {@linkcode InvalidElemError} If the specified `target` wasn't found.
 *
 * @group Styles
 */
export function getStyles<T extends Styles = Styles>(
  target: ElemOrCssSelector,
  keys: KeysOf<T>,
): Partial<T> {
  const elem = toElem(target);
  if (elem === null || !("style" in elem)) {
    // prettier-ignore
    throw new InvalidElemError(`Unable to get styles for ${formatForError(keys)}`);
  }

  const styles: Partial<T> = {};

  for (const key of keys) {
    // @ts-ignore
    styles[key] = getSingleStyle(elem, key);
  }

  return styles;
}

function getSingleStyle<T extends StyleValue>(
  element: AnyElement,
  key: StyleKey,
): T | undefined {
  // Note that we're using nullish coalescing for the return value of
  // `parseDOMValue` because it may be `null` and we only want to return
  // `undefined` if the style doesn't exist.

  // @ts-ignore I know `key` is a valid key for styles. If it wasn't we return `undefined`.
  const styleEntry = element.style[key];

  if (styleEntry !== undefined && styleEntry !== "") {
    return parseDOMValue<T>(styleEntry);
  }

  const styleProperty = element.style.getPropertyValue(key);

  // Apparently the `kebab-case` version of a style property name is accessible
  // from the element's `style` property, so style["font-size"] works.
  // This is a fallback in case someone passes in a CSS variable.
  if (styleProperty !== "") {
    return parseDOMValue<T>(styleProperty);
  }

  return undefined;
}
