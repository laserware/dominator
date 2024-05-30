import { isNil } from "@laserware/arcade";

import { findOneElement } from "./findOneElement.ts";
import { isPrimitive } from "./typeGuards.ts";
import type { ElementOrSelectorInput } from "./types.ts";

/**
 * Returns true if the specified element input exists in the DOM.
 *
 * @param element Element, EventTarget, or selector for element.
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
