import { elemOrThrow } from "../internal/elemOrThrow.ts";
import { formatList } from "../internal/formatList.ts";
import type { AttrName, ElemOrCssSelector, NullOr } from "../types.ts";

/**
 * Returns true if the specified `target` has the specified attribute `name`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param name Name of the attribute.
 *
 * @throws {InvalidElemError} If the `target` specified does not exist.
 */
export function hasAttr(
  target: NullOr<ElemOrCssSelector>,
  name: AttrName,
): boolean {
  const elem = elemOrThrow(target, `Unable to check for attribute ${name}`);

  return elem.hasAttribute(name);
}

/**
 * Returns true if the specified `target` has *all* of the attributes that match
 * the specified `names`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param names Attribute names to check for.
 *
 * @throws {InvalidElemError} If the `target` specified does not exist.
 */
export function hasAllAttrs(
  target: NullOr<ElemOrCssSelector>,
  names: AttrName[],
): boolean {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to check for attributes ${formatList(names)}`);

  for (const attributeName of elem.getAttributeNames()) {
    if (!names.includes(attributeName)) {
      return false;
    }
  }

  return true;
}

/**
 * Returns true if the specified `target` has *some* of the attributes that match
 * the specified `names`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param names Attribute names to check for.
 *
 * @throws {InvalidElemError} If the `target` specified does not exist.
 */
export function hasSomeAttrs(
  target: NullOr<ElemOrCssSelector>,
  names: AttrName[],
): boolean {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to check for attributes ${formatList(names)}`);

  let matchFound: boolean = false;

  for (const attributeName of elem.getAttributeNames()) {
    if (names.includes(attributeName)) {
      matchFound = true;
      break;
    }
  }

  return matchFound;
}
