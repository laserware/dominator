import { isNil } from "@laserware/arcade";

import type { ElemOrSelectInput } from "../types";

/**
 * Returns true if the specified value is an Element or Document.
 */
export function isElementOrDocument(
  input: ElemOrSelectInput | number | boolean,
): input is Element | HTMLElement | Document {
  return (
    input instanceof Element ||
    input instanceof HTMLElement ||
    input instanceof Document
  );
}

/**
 * Returns true if the specified value is an Event with a `currentTarget`
 * property.
 */
export function isEvent(
  value: ElemOrSelectInput | number | boolean,
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
  value: ElemOrSelectInput | number | boolean,
): value is string | number | boolean {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  );
}
