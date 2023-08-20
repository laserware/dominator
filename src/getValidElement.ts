import { isNil } from "@laserware/arcade";

import { asElement } from "./asElement.js";
import { findOneElement } from "./findOneElement.js";
import type { ElementOrSelectorInput, TargetType } from "./types.js";

/**
 * If the specified element is a string, it represents a selector, so try to
 * find it and return it. Otherwise, coerce it to an element based on whether
 * it is an element or an Event.
 */
export function getValidElement<T extends Element = HTMLElement>(
  element: ElementOrSelectorInput | null,
  parent?: ElementOrSelectorInput,
): T | null;
export function getValidElement<T extends Element = HTMLElement>(
  element: ElementOrSelectorInput | null,
  targetType?: TargetType,
): T | null;
export function getValidElement<T extends Element = HTMLElement>(
  element: ElementOrSelectorInput | null,
  parent?: ElementOrSelectorInput,
  targetType?: TargetType,
): T | null;
export function getValidElement<T extends Element = HTMLElement>(
  element: ElementOrSelectorInput | null,
  parentOrTargetType?: ElementOrSelectorInput | TargetType,
  targetType: TargetType = "target",
): T | null {
  let validParent: Document | HTMLElement | null = null;

  if (isNil(parentOrTargetType)) {
    validParent = document;
  } else if (isTargetType(parentOrTargetType)) {
    validParent = document;
  }

  if (typeof element === "string") {
    return findOneElement(element, validParent);
  } else {
    return asElement(element, targetType);
  }
}

function isTargetType(
  value: ElementOrSelectorInput | TargetType,
): value is TargetType {
  return value === "target" || value === "currentTarget";
}
