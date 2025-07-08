import { cast, isNil } from "@laserware/arcade";

import { findElement } from "./findElement.ts";
import { InvalidElementError } from "./InvalidElementError.ts";
import { isElementLike } from "./isElementLike.ts";
import type { Target } from "./types.ts";

/**
 * Returns an element of type `E` for the specified Element or EventTarget.
 * You can also pass in a CSS selector string, which will attempt to find the element
 * in the DOM.
 *
 * > [!NOTE]
 * > This differs from {@linkcode asElement} in that it will never throw if you pass
 * > in an invalid, `null`, or `undefined` target, rather it will return `null`.
 * > The {@linkcode asElement} function only accepts an Element or EventTarget
 * > whereas this function also accepts a CSS selector.
 *
 * @remarks
 * This function accepts a `parent` element to accommodate for cases where the
 * `target` is a CSS selector and we want to limit the search to the specified
 * parent.
 *
 * @template E Element representation of `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param parent Optional Element, EventTarget, or CSS selector for parent.
 *
 * @returns Element of type `E` if it exists, otherwise returns `null`.
 *
 * @example
 * **Usage with CSS Selector**
 *
 * ```ts
 * const elementThatExists = toElement<HTMLInputElement>("#test");
 * // Returns the element and asserts as an `<input>`
 *
 * const elementNoExists = toElement<HTMLButtonElement>("#missing");
 * // Returns null
 * ```
 *
 * **Usage with Element**
 * ```ts
 * function handleButtonClick(event: MouseEvent): void {
 *   const buttonElement = toElement<HTMLButtonElement>(event.currentTarget);
 *
 *   // Note that you need to use optional chaining because the return value of
 *   // toElement may be `null` (even though we *know* that `currentTarget` is defined):
 *   buttonElement?.focus?.();
 * }
 * ```
 */
export function toElement<E extends Element = HTMLElement>(
  target: Target | null | undefined,
  parent?: Target | null | undefined,
): E | null {
  if (isNil(target)) {
    return null;
  }

  if (isElementLike(target)) {
    return cast<E>(target);
  }

  let validParent: Document | HTMLElement | null = null;

  if (typeof parent === "string") {
    validParent = findElement<any>(parent);
  }

  if (isNil(parent)) {
    validParent = document;
  }

  return findElement(target, validParent);
}

/**
 * Returns an element of type `E` that corresponds to the specified `target`.
 * Throws if the `target` isn't a valid element.
 *
 * @internal
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param error Error message to include with the error.
 *
 * @returns Element representation of the specified `target`.
 */
export function toElementOrThrow<E extends Element = HTMLElement>(
  target: Target | null,
  error: string,
): E {
  const element = toElement(target);

  if (element === null) {
    throw new InvalidElementError(error);
  }

  return cast<E>(element);
}
