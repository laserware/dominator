import { isNil } from "@laserware/arcade";

import type { ElementOrSelectorInput } from "./types.js";

/**
 * Returns true if the specified value is an Element or Document.
 */
export function isElementOrDocument(
  value: ElementOrSelectorInput | number | boolean,
): value is Element | HTMLElement | Document {
  return (
    value instanceof Element ||
    value instanceof HTMLElement ||
    value instanceof Document
  );
}

/**
 * Returns true if the specified value is an Event with a `currentTarget`
 * property.
 */
export function isEvent(
  value: ElementOrSelectorInput | number | boolean,
): value is Event {
  const validValue = value as { currentTarget: unknown; target: unknown };

  if (isNil(validValue?.target)) {
    return false;
  }

  return value instanceof Event;
}

/**
 * Returns true if the specified value is a primitive (i.e. number, string, or
 * boolean).
 */
export function isPrimitive(
  value: ElementOrSelectorInput | number | boolean,
): value is string | number | boolean {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  );
}
