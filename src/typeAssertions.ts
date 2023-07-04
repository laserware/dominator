import { isNil } from "@dazzlegram/caboodle";

import type { ElementInput } from "./types.js";

/**
 * Returns true if the specified value is an Element or Document.
 */
export function isElementOrDocument(
  value: ElementInput | number | boolean,
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
  value: ElementInput | number | boolean,
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
  value: ElementInput | number | boolean,
): value is string | number | boolean {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  );
}
