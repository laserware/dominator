import { toElem } from "../elem/toElem.ts";
import type { AttrName, ElemOrCssSelector, NullOr } from "../types.ts";

/**
 * Returns true if the specified `target` has the specified attribute `name`.
 *
 * @param target `Element`, `EventTarget`, or CSS selector.
 * @param name Name of the attribute.
 */
export function hasAttr(
  target: NullOr<ElemOrCssSelector>,
  name: AttrName,
): boolean {
  return toElem(target)?.hasAttribute(name) ?? false;
}

/**
 * Returns true if the specified `target` has *all* of the attributes that match
 * the specified `names`.
 *
 * @param target `Element`, `EventTarget`, or CSS selector.
 * @param names Attribute names to check for.
 */
export function hasAllAttrs(
  target: NullOr<ElemOrCssSelector>,
  names: AttrName[],
): boolean {
  const elem = toElem<HTMLElement>(target);
  if (elem === null) {
    return false;
  }

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
 * @param target `Element`, `EventTarget`, or CSS selector.
 * @param names Attribute names to check for.
 */
export function hasSomeAttrs(
  target: NullOr<ElemOrCssSelector>,
  names: AttrName[],
): boolean {
  const elem = toElem<HTMLElement>(target);
  if (elem === null) {
    return false;
  }

  let matchFound: boolean = false;

  for (const attributeName of elem.getAttributeNames()) {
    if (names.includes(attributeName)) {
      matchFound = true;
      break;
    }
  }

  return matchFound;
}
