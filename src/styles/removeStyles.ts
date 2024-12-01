import type { AnyElement } from "../dom.ts";
import type { ElemOrCssSelector } from "../elems/types.ts";
import { cast } from "../internal/cast.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import { isCssVarName } from "../typeGuards.ts";

import type { StyleKey } from "./types.ts";

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
 * @throws {@linkcode elems!InvalidElemError} if the `target` could not be found or doesn't have
 *                                            a [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) property.
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
 * @throws {@linkcode elems!InvalidElemError} if the `target` could not be found or doesn't have
 *                                            a [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) property.
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
