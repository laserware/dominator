import { cast } from "@laserware/arcade";

import { isCssVarName } from "../css/isCssVarName.ts";
import { toElementOrThrow } from "../elements/toElement.ts";
import type { Target } from "../elements/types.ts";
import { formatForError } from "../internal/formatForError.ts";

import type { StyleKey } from "./types.ts";

/**
 * Removes the specified style `key` from the specified `target`.
 *
 * @template E Element representation of `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param key Key of the style property to remove.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode elements!InvalidElementError} if the `target` could not be found or doesn't have a [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) property.
 */
export function removeStyle<E extends Element = HTMLElement>(
  target: Target | null,
  key: StyleKey,
): E {
  const element = toElementOrThrow(target, `Cannot remove style ${key}`);

  removeSingleStyle(element, key);

  return cast<E>(element);
}

/**
 * Removes the style properties with names matching the specified `keys` from
 * the specified `target`.
 *
 * @template E Element representation of `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param keys Array of style property names to remove.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode elements!InvalidElementError} if the `target` could not be found or doesn't have a [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) property.
 */
export function removeStyles<E extends Element = HTMLElement>(
  target: Target | null,
  keys: StyleKey[],
): E {
  // biome-ignore format:
  const element = toElementOrThrow(target, `Cannot remove styles ${formatForError(keys)}`);

  for (const key of keys) {
    removeSingleStyle(element, key);
  }

  return cast<E>(element);
}

function removeSingleStyle(element: Element, key: StyleKey): void {
  if (isCssVarName(key)) {
    cast<HTMLElement>(element).style.removeProperty(key);
  } else {
    // Setting a style value to an empty string removes it:
    cast<HTMLElement>(element).style[key] = "";
  }
}
