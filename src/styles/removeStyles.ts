import { kebabCase } from "@laserware/arcade";

import { asElem } from "../elem/asElem.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import { CssVarName, type ElemOrCssSelector, type StyleKey } from "../types.ts";

/**
 * Removes the specified style `key` from the specified `target`.
 *
 * @template E Type of Element to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param key Key of the style property to remove.
 *
 * @returns The Element representation of the specified `target`.
 *
 * @throws {InvalidElemError} If the specified `target` does not exist.
 */
export function removeStyle<E extends Element = HTMLElement>(
  target: ElemOrCssSelector,
  key: StyleKey,
): E {
  const elem = elemOrThrow(target, `Unable to remove style ${key}`);

  removeSingleStyle(elem, key);

  return asElem<E>(elem);
}

/**
 * Removes the style properties with names matching the specified `keys` from
 * the specified `target`.
 *
 * @template E Type of Element to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param keys Array of style property names to remove.
 *
 * @returns The Element representation of the specified `target`.
 *
 * @throws {InvalidElemError} If the specified `target` does not exist.
 */
export function removeStyles<E extends Element = HTMLElement>(
  target: ElemOrCssSelector,
  keys: StyleKey[],
): E {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to remove styles ${formatForError(keys)}`);

  for (const key of keys) {
    removeSingleStyle(elem, key);
  }

  return asElem<E>(elem);
}

function removeSingleStyle(element: HTMLElement, key: StyleKey): void {
  let propertyName = key as string;

  // If the key doesn't represent a CSS variable (i.e. starts with "--"), we
  // need to convert it to kebab-case prior to removing the style:
  if (!CssVarName.is(key)) {
    propertyName = kebabCase(key);
  }

  element.style.removeProperty(propertyName);
}
