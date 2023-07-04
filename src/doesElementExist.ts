import { isNil } from "@dazzlegram/caboodle";

import { findOneElement } from "./findOneElement.js";
import { isPrimitive } from "./typeAssertions.js";
import type { ElementInput } from "./types.js";

/**
 * Returns true if the specified element input exists in the DOM.
 */
export function doesElementExist(element: ElementInput | null): boolean {
  if (isPrimitive(element)) {
    return findOneElement(element) !== null;
  } else {
    return !isNil(element);
  }
}
