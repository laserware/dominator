import { getValidElement } from "./getValidElement.ts";
import type { ElemOrSelectorInput } from "./types.ts";

/**
 * Returns true if the source element(s) and target elements do not match.
 *
 * @param source Single element input or array of element inputs to check; if
 *               an array, returns true only if _all_ elements don't match the
 *               target element input.
 * @param target Element input to compare against.
 */
export function isElementDifferentFrom(
  source: ElemOrSelectorInput | ElemOrSelectorInput[] | null,
  target: ElemOrSelectorInput | null,
): boolean {
  if (Array.isArray(source)) {
    // Ensure we bail early if we find an element that is the same:
    for (const item of source) {
      if (!isSingleElementDifferentFrom(item, target)) {
        return false;
      }
    }

    return true;
  } else {
    return isSingleElementDifferentFrom(source, target);
  }
}

function isSingleElementDifferentFrom(
  source: ElemOrSelectorInput | null,
  target: ElemOrSelectorInput | null,
): boolean {
  const sourceElement = getValidElement(source);
  const targetElement = getValidElement(target);

  if (sourceElement === null && targetElement === null) {
    return false;
  }

  return sourceElement !== targetElement;
}
