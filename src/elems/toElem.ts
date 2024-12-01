import { isNil } from "@laserware/arcade";

import type { AnyElement } from "../dom.ts";
import { isElem } from "../typeGuards.ts";

import { findElem } from "./findElem.ts";
import type { ElemOrCssSelector } from "./types.ts";

/**
 * Returns an element of type `E` for the specified Element or EventTarget. You can
 * also pass in a CSS selector string, which will attempt to find the element
 * in the DOM.
 *
 * This differs from {@linkcode asElem} in that it will never throw if you pass
 * in an invalid, `null`, or `undefined` target, rather it will return `null`.
 * The `asElem` function only accepts an Element or EventTarget whereas this
 * function also accepts a CSS selector.
 *
 * @remarks
 * This function accepts a `parent` element to accommodate for cases where the
 * `target` is a CSS selector and we want to limit the search to the specified
 * parent.
 *
 * @template E Element type of specified `target`.
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
 * const elemThatExists = toElem<HTMLInputElement>("#test");
 * // Returns the element and asserts as an `<input>`
 *
 * const elemNoExists = toElem<HTMLButtonElement>("#missing");
 * // Returns null
 * ```
 *
 * **Usage with Element**
 * ```ts
 * function handleButtonClick(event: MouseEvent): void {
 *   const buttonElem = toElem<HTMLButtonElement>(event.currentTarget);
 *
 *   // Note that need to use optional chaining because the return value of
 *   // toElem be `null` (even though we *know* that `currentTarget` is defined):
 *   buttonElem?.focus?.();
 * }
 * ```
 */
export function toElem<E extends AnyElement = HTMLElement>(
  target: ElemOrCssSelector | null | undefined,
  parent?: ElemOrCssSelector | null | undefined,
): E | null {
  if (isNil(target)) {
    return null;
  }

  if (isElem(target)) {
    return target as unknown as E;
  }

  let validParent: Document | HTMLElement | null = null;

  if (typeof parent === "string") {
    validParent = findElem<HTMLElement>(parent);
  }

  if (isNil(parent)) {
    validParent = document;
  }

  return findElem(target, validParent);
}
