import { isNil } from "@laserware/arcade";

import { asElement } from "./asElement.js";
import { findOneElement } from "./findOneElement.js";
import type { ElementOrSelectorInput } from "./types.js";

/**
 * If the specified element is a string, it represents a selector, so try to
 * find it and return it. Otherwise, coerce it to an element based on whether
 * it is an Element, Event, or EventTarget.
 */
export function getValidElement<T extends Element = HTMLElement>(
  element: ElementOrSelectorInput | null,
  parent?: ElementOrSelectorInput,
): T | null {
  let validParent: Document | HTMLElement | null = null;

  if (isNil(parent)) {
    validParent = document;
  }

  if (typeof element === "string") {
    return findOneElement(element, validParent);
  } else {
    return asElement(element);
  }
}
