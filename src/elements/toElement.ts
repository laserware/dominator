import { cast, isNil } from "@laserware/arcade";

import type { ElementOf, TagName } from "../dom.ts";

import { InvalidElementError } from "./InvalidElementError.ts";
import { findElement } from "./findElement.ts";
import { isElementLike } from "./isElementLike.ts";
import type { Target } from "./types.ts";

/**
 * Returns an element of tag name `TN` for the specified Element or EventTarget.
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
 * @template TN Tag name of the Element representation of `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param parent Optional Element, EventTarget, or CSS selector for parent.
 *
 * @returns Element of tag name `TN` if it exists, otherwise returns `null`.
 *
 * @example
 * **Usage with CSS Selector**
 *
 * ```ts
 * const elementThatExists = toElement<"input">("#test");
 * // Returns the element and asserts as an `<input>`
 *
 * const elementNoExists = toElement<"button">("#missing");
 * // Returns null
 * ```
 *
 * **Usage with Element**
 * ```ts
 * function handleButtonClick(event: MouseEvent): void {
 *   const buttonElement = toElement<"button">(event.currentTarget);
 *
 *   // Note that need to use optional chaining because the return value of
 *   // toElement be `null` (even though we *know* that `currentTarget` is defined):
 *   buttonElem?.focus?.();
 * }
 * ```
 */
export function toElement<TN extends TagName = "*">(
  target: Target | null | undefined,
  parent?: Target | null | undefined,
): ElementOf<TN> | null {
  if (isNil(target)) {
    return null;
  }

  if (isElementLike(target)) {
    return cast<ElementOf<TN>>(target);
  }

  let validParent: Document | HTMLElement | null = null;

  if (typeof parent === "string") {
    validParent = findElement<"*">(parent);
  }

  if (isNil(parent)) {
    validParent = document;
  }

  return findElement(target, validParent);
}

/**
 * Returns an element of type `TN` that corresponds to the specified `target`.
 * Throws if the `target` isn't a valid element.
 *
 * @internal
 *
 * @template TN Tag name specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param error Error message to include with the error.
 *
 * @returns Element representation of the specified `target`.
 */
export function toElementOrThrow<TN extends TagName = "*">(
  target: Target<TN> | null,
  error: string,
): ElementOf<TN> {
  const element = toElement(target);

  if (element === null) {
    throw new InvalidElementError(error);
  }

  return cast<ElementOf<TN>>(element);
}
