import { cast, isNil } from "@laserware/arcade";

import type { ElementOf, TagName } from "../dom.ts";

import { findElem } from "./findElem.ts";
import { isElem } from "./isElem.ts";
import type { ElemOrCssSelector } from "./types.ts";

/**
 * Returns an element of tag name `TN` for the specified Element or EventTarget.
 * You can also pass in a CSS selector string, which will attempt to find the element
 * in the DOM.
 *
 * > [!NOTE]
 * > This differs from {@linkcode asElem} in that it will never throw if you pass
 * > in an invalid, `null`, or `undefined` target, rather it will return `null`.
 * > The {@linkcode asElem} function only accepts an Element or EventTarget
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
 * const elemThatExists = toElem<"input">("#test");
 * // Returns the element and asserts as an `<input>`
 *
 * const elemNoExists = toElem<"button">("#missing");
 * // Returns null
 * ```
 *
 * **Usage with Element**
 * ```ts
 * function handleButtonClick(event: MouseEvent): void {
 *   const buttonElem = toElem<"button">(event.currentTarget);
 *
 *   // Note that need to use optional chaining because the return value of
 *   // toElem be `null` (even though we *know* that `currentTarget` is defined):
 *   buttonElem?.focus?.();
 * }
 * ```
 */
export function toElem<TN extends TagName = "*">(
  target: ElemOrCssSelector | null | undefined,
  parent?: ElemOrCssSelector | null | undefined,
): ElementOf<TN> | null {
  if (isNil(target)) {
    return null;
  }

  if (isElem(target)) {
    return cast<ElementOf<TN>>(target);
  }

  let validParent: Document | HTMLElement | null = null;

  if (typeof parent === "string") {
    validParent = findElem<"*">(parent);
  }

  if (isNil(parent)) {
    validParent = document;
  }

  return findElem(target, validParent);
}
