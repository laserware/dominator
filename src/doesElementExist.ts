import { isNil } from "@laserware/arcade";

import { findOneElement } from "./findOneElement.js";
import { isPrimitive } from "./typeGuards.js";
import type { ElementOrSelectorInput } from "./types.js";

/**
 * Returns true if the specified element input exists in the DOM.
 * @param element Element, Event, or selector for element
 */
export function doesElementExist(
  element: ElementOrSelectorInput | null,
): boolean {
  if (isPrimitive(element)) {
    return findOneElement(element) !== null;
  } else {
    return !isNil(element);
  }
}
