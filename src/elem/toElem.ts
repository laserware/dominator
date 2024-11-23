import { isNil } from "@laserware/arcade";

import type { ElemOrCssSelector, NilOr, NullOr } from "../types.ts";

import { findElem } from "./findElem.ts";

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
 * @template E Type of Element to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param parent Optional parent Element, EventTarget, or CSS selector.
 *
 * @remarks
 * This function accepts a `parent` element to accommodate for cases where the
 * `target` is a CSS selector and we want to limit the search to the specified
 * parent.
 *
 * @example Usage with CSS Selector
 * const elemThatExists = toElem<HTMLInputElement>("#test");
 * // Returns the element and asserts as an `<input>`
 *
 * const elemNoExists = toElem<HTMLButtonElement>("#missing");
 * // Returns `null`
 *
 * @example Usage with Element
 * function handleButtonClick(event: MouseEvent): void {
 *   const buttonElem = toElem<HTMLButtonElement>(event.currentTarget);
 *
 *   // Note that need to use optional chaining because the return value of
 *   // toElem be `null` (even though we *know* that `currentTarget` is defined):
 *   buttonElem?.focus?.();
 * }
 */
export function toElem<E extends Element = HTMLElement>(
  target: NilOr<ElemOrCssSelector>,
  parent?: NilOr<ElemOrCssSelector>,
): NullOr<E> {
  if (isNil(target)) {
    return null;
  }

  if (isElementLike(target)) {
    return target as unknown as E;
  }

  let validParent: Document | HTMLElement | null = null;

  if (typeof parent === "string") {
    validParent = findElem<HTMLElement>(parent);
  }

  if (isNil(parent)) {
    validParent = document;
  }

  if (typeof target === "string") {
    return findElem(target, validParent);
  }

  return null;
}

/**
 * Returns true if the specified value is an Element, `Document`, or Element
 * that can be represented as an `HTMLElement`.
 */
function isElementLike(
  value: unknown,
): value is Element | HTMLElement | Document {
  return (
    value instanceof Document ||
    value instanceof Element ||
    value instanceof EventTarget ||
    value instanceof HTMLElement
  );
}
