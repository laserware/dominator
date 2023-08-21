import { isElementOrDocument, isEvent } from "./typeGuards.js";
import type { ElementInput, TargetType } from "./types.js";

/**
 * Returns an element of type T for the specified Element or Event. If the
 * element is an Event and "target" is specified, returns `event.target`. If
 * element is an Event and "currentTarget" is specified, returns
 * `event.currentTarget`. This function is useful to prevent TypeScript from
 * complaining about an invalid or unknown element.
 * @param element Element input to assert as an element
 * @param targetType Target type to get if specified element is an event
 * @example
 *   function handleMouseEvent(event: MouseEvent): void {
 *     // If the mouse event is attached to an `<input>` element, we know that
 *     // the `currentTarget` _will_ be an `<input>` element:
 *     const element = asElement<HTMLInputElement>(event, "currentTarget");
 *   }
 *
 *   function doSomethingWithParent(): void {
 *     // Assuming `childElement` is defined somewhere else and we _know_ it
 *     // has a parent that's a `<div>`, we can assert that here. Note that
 *     // if the `parentElement` is null, this will throw an error:
 *     const parent = asElement<HTMLDivElement>(childElement.parentElement);
 *   }
 */
export function asElement<T extends Element = HTMLElement>(
  element: ElementInput | null,
  targetType: TargetType = "target",
): T {
  // Since this is an assertion, we want to make sure we throw an error if the
  // specified element input is null:
  if (element === null) {
    throw new Error(`Element passed to asElement is null`);
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

  throw new Error(`Invalid element ${element} passed to asElement`);
}
