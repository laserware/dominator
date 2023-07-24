import { asElement } from "./asElement.js";
import { findOneElement } from "./findOneElement.js";
import type { ElementInput, TargetType } from "./types.js";

export function getValidElement<T = HTMLElement>(
  element: ElementInput | null,
  parent: ElementInput = document,
  targetType: TargetType = "target",
): T | null {
  if (typeof element === "string") {
    return findOneElement(element, parent);
  } else {
    return asElement(element, targetType);
  }
}
