import { cast } from "../internal/cast.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import { isCssVarName } from "../typeGuards.ts";
import type { AnyElement, ElemOrCssSelector, StyleKey } from "../types.ts";

/**
 * Removes the specified style `key` from the specified `target`.
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param key Key of the style property to remove.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode InvalidElemError} If the specified `target` wasn't found.
 *
 * @category Styles
 */
export function removeStyle<E extends AnyElement = HTMLElement>(
  target: ElemOrCssSelector,
  key: StyleKey,
): E {
  const elem = elemOrThrow(target, `Unable to remove style ${key}`);

  removeSingleStyle(elem, key);

  return cast<E>(elem);
}

/**
 * Removes the style properties with names matching the specified `keys` from
 * the specified `target`.
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param keys Array of style property names to remove.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode InvalidElemError} If the specified `target` wasn't found.
 *
 * @category Styles
 */
export function removeStyles<E extends AnyElement = HTMLElement>(
  target: ElemOrCssSelector,
  keys: StyleKey[],
): E {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to remove styles ${formatForError(keys)}`);

  for (const key of keys) {
    removeSingleStyle(elem, key);
  }

  return cast<E>(elem);
}

function removeSingleStyle(element: AnyElement, key: StyleKey): void {
  if (isCssVarName(key)) {
    element.style.removeProperty(key);
  } else {
    // Setting a style value to an empty string removes it:
    element.style[key] = "";
  }
}