import { isNil } from "@laserware/arcade";

import { element } from "../element";
import { oneMatching } from "../oneMatching";
import type { ElemOrSelectInput, TargetType } from "../types";

/**
 * If the specified element is a string, it represents a selector, so try to
 * find it and return it. Otherwise, coerce it to an element based on whether
 * it is an element or an Event.
 */
export function toValidElem<T extends Element = HTMLElement>(
  input: ElemOrSelectInput | null,
  parentOrTargetType?: ElemOrSelectInput | TargetType,
  targetType: TargetType = "target",
): T | null {
  let parent: Document | HTMLElement | null = null;

  if (isNil(parentOrTargetType)) {
    parent = document;
  } else if (isTargetType(parentOrTargetType)) {
    parent = document;
  }

  if (typeof input === "string") {
    return oneMatching(input, parent);
  } else {
    return element(input, targetType);
  }
}

function isTargetType(
  value: ElemOrSelectInput | TargetType,
): value is TargetType {
  return value === "target" || value === "currentTarget";
}
