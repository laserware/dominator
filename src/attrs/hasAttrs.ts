import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import type { AttrName, ElemOrCssSelector } from "../types.ts";

/**
 * Checks if the specified `target` has the specified attribute `name`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param name Name of the attribute to check for.
 *
 * @returns `true` if the specified attribute is present, otherwise `false`.
 *
 * @throws {InvalidElemError} If the specified `target` does not exist.
 */
export function hasAttr(target: ElemOrCssSelector, name: AttrName): boolean {
  const elem = elemOrThrow(target, `Unable to check for attribute ${name}`);

  return elem.hasAttribute(name);
}

/**
 * Checks if the specified `target` has *all* of the attributes that match
 * the specified `names`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param names Attribute names to check for.
 *
 * @returns `true` if the specified `target` has *all* specified attributes, otherwise `false`.
 *
 * @throws {InvalidElemError} If the specified `target` does not exist.
 */
export function hasAllAttrs(
  target: ElemOrCssSelector,
  names: AttrName[],
): boolean {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to check for attributes ${formatForError(names)}`);

  for (const name of names) {
    if (!elem.hasAttribute(name)) {
      return false;
    }
  }

  return true;
}

/**
 * Checks if the specified `target` has *some* of the attributes that match
 * the specified `names`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param names Attribute names to check for.
 *
 * @returns `true` if the specified `target` has *some* specified attributes, otherwise `false`.
 *
 * @throws {InvalidElemError} If the specified `target` does not exist.
 */
export function hasSomeAttrs(
  target: ElemOrCssSelector,
  names: AttrName[],
): boolean {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to check for attributes ${formatForError(names)}`);

  for (const name of names) {
    if (elem.hasAttribute(name)) {
      return true;
    }
  }

  return false;
}
