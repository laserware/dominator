import { getValidElement } from "./getValidElement.js";
import type { ElementOrSelectorInput } from "./types.js";

/**
 * Returns true if the source element(s) and target elements do not match.
 * @param source Single element input or array of element inputs to check; if
 *               an array, returns true only if _all_ elements don't match the
 *               target element input
 * @param target Element input to compare against
 */
export function isElementDifferentFrom(
  source: ElementOrSelectorInput | ElementOrSelectorInput[] | null,
  target: ElementOrSelectorInput | null,
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
  source: ElementOrSelectorInput | null,
  target: ElementOrSelectorInput | null,
): boolean {
  const sourceElement = getValidElement(source);
  const targetElement = getValidElement(target);

  if (sourceElement === null && targetElement === null) {
    return false;
  }

  return sourceElement !== targetElement;
}
