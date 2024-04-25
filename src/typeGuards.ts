import type { ElementOrSelectorInput } from "./types.ts";

/**
 * Returns true if the specified value is an Element or Document or EventTarget
 * that can be represented as an HTML Element.
 */
export function canBeElement(
  value: ElementOrSelectorInput | number | boolean,
): value is Element | HTMLElement | Document {
  return (
    value instanceof Element ||
    value instanceof HTMLElement ||
    value instanceof Document ||
    value instanceof EventTarget
  );
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
