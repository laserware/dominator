import { isNil } from "@laserware/arcade";

import { asElement } from "./asElement.ts";
import { findOneElement } from "./findOneElement.ts";
import type { ElementOrSelectorInput } from "./types.ts";

/**
 * If the specified element is a string, it represents a selector, so try to
 * find it and return it. Otherwise, coerce it to an element based on whether
 * it is an Element or EventTarget.
 *
 * @param element Element, EventTarget, or selector to ensure is valid.
 * @param [parent=document] Optional Element, EventTarget, or selector for parent element.
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
