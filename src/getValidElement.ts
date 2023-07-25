import { isNil } from "@laserware/arcade";

import { asElement } from "./asElement.js";
import { findOneElement } from "./findOneElement.js";
import type { ElementInput, TargetType } from "./types.js";

/**
 * If the specified element is a string, it represents a selector, so try to
 * find it and return it. Otherwise, coerce it to an element based on whether
 * it is an element or an Event.
 */
export function getValidElement<T = HTMLElement>(
  element: ElementInput | null,
  parent?: ElementInput,
): T | null;
export function getValidElement<T = HTMLElement>(
  element: ElementInput | null,
  targetType?: TargetType,
): T | null;
export function getValidElement<T = HTMLElement>(
  element: ElementInput | null,
  parent?: ElementInput,
  targetType?: TargetType,
): T | null;
export function getValidElement<T = HTMLElement>(
  element: ElementInput | null,
  parentOrTargetType?: ElementInput | TargetType,
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

function isTargetType(value: ElementInput | TargetType): value is TargetType {
  return value === "target" || value === "currentTarget";
}
