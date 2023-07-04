import { isNil } from "@laserware/arcade";

import { isElementOrDocument, isEvent, isPrimitive } from "./typeAssertions.js";
import type { ElementInput } from "./types.js";

/**
 * Returns an element (or null) based on the specified input and parent. Allows
 * you to specify a CSS selector, an Event, or an HTML element as the element
 * and optional parent input.
 * @param element Element input to assert as an element
 * @param [options] Optional options for getting the element
 */
export function asElement<T = HTMLElement>(
  element: ElementInput | null,
  options: { parent?: ElementInput | null; useCurrentTarget?: boolean } = {
    parent: null,
    useCurrentTarget: false,
  },
): T | null {
  if (element === null) {
    return null;
  }

  // The element is a valid HTML element or document, so we return it.
  if (isElementOrDocument(element)) {
    return element as unknown as T;
  }

  // CSS selector was passed in. Find the appropriate element in the DOM.
  if (isPrimitive(element)) {
    let parentElement: HTMLElement | null = options.parent as HTMLElement;

    if (isEvent(options.parent)) {
      parentElement = options.parent.currentTarget as HTMLElement;
    } else if (isPrimitive(options.parent)) {
      parentElement = document.querySelector(parent.toString());
    } else if (isNil(parentElement)) {
      parentElement = document as unknown as HTMLElement;
    }

    const selector = element.toString();

    return (parentElement?.querySelector(selector) as unknown as T) ?? null;
  }

  // The element was an event, so we extract the target and return it.
  if (isEvent(element)) {
    if (options.useCurrentTarget) {
      return (element?.currentTarget as unknown as T) ?? null;
    } else {
      return (element?.target as unknown as T) ?? null;
    }
  }

  return null;
}
