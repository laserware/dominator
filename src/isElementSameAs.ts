import { getValidElement } from "./getValidElement.js";
import type { ElementOrSelectorInput } from "./types.js";

/**
 * Returns true if the source element(s) and target elements match.
 * @param source Single element input or array of element inputs to check; if
 *               an array, returns true if _one_ of the elements matches the
 *               target element input
 * @param target Element input to compare against
 */
export function isElementSameAs(
  source: ElementOrSelectorInput | ElementOrSelectorInput[] | null,
  target: ElementOrSelectorInput | null,
): boolean {
  if (Array.isArray(source)) {
    for (const item of source) {
      if (isSingleElementSameAs(item, target)) {
        return true;
      }
    }

    return false;
  } else {
    return isSingleElementSameAs(source, target);
  }
}

function isSingleElementSameAs(
  source: ElementOrSelectorInput | null,
  target: ElementOrSelectorInput | null,
): boolean {
  const sourceElement = getValidElement(source);
  const targetElement = getValidElement(target);

  if (sourceElement === null && targetElement === null) {
    return false;
  }

  return sourceElement === targetElement;
}
