import { isElementOrDocument, isEvent } from "./typeAssertions.js";
import type { ElementInput, TargetType } from "./types.js";

/**
 * Returns an element (or null) based on the specified input and parent. Allows
 * you to specify a CSS selector, an Event, or an HTML element as the element
 * and optional parent input.
 * @param element Element input to assert as an element
 * @param targetType Target type to get if specified element is an event
 */
export function asElement<T = HTMLElement>(
  element: ElementInput | null,
  targetType: TargetType = "target",
): T | null {
  if (element === null) {
    return null;
  }

  // The element is a valid HTML element or document, so we return it.
  if (isElementOrDocument(element)) {
    return element as unknown as T;
  }

  // The element was an event, so we extract the target/currentTarget and return it.
  if (isEvent(element)) {
    if (targetType === "currentTarget") {
      return (element?.currentTarget as unknown as T) ?? null;
    } else if (targetType === "target") {
      return (element?.target as unknown as T) ?? null;
    } else {
      throw new Error(`Invalid target type: ${targetType}`);
    }
  }

  return null;
}
