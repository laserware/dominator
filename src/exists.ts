import { isNil } from "@laserware/arcade";

import { isPrimitive } from "./internal/typeGuards";
import { findOne } from "./findOne";
import type { ElemOrSelectInput } from "./types";

/**
 * Returns true if the specified element input exists in the DOM.
 *
 * @param input Element, Event, or selector for element.
 */
export function exists(input: ElemOrSelectInput | null): boolean {
  if (isPrimitive(input)) {
    return findOne(input) !== null;
  } else {
    return !isNil(input);
  }
}
