import { isNil } from "@laserware/arcade";

import {
  isElementLike,
  type ElemOrCssSelector,
  type Maybe,
  type NullOr,
} from "../types.ts";

import { findOne } from "./findOne.ts";

/**
 * Returns an element of type E for the specified Element or Event. You can also
 * pass in a CSS selector string, which will attempt to find the element in the
 * DOM.
 *
 * @template E Type of Element to return.
 *
 * @param input Element, EventTarget, or CSS selector to assert as an Element.
 * @param parent Optional parent element or CSS selector for the parent element.
 */
export function toElem<E extends Element = HTMLElement>(
  input: Maybe<ElemOrCssSelector>,
  parent?: Maybe<ElemOrCssSelector>,
): NullOr<E> {
  if (isNil(input)) {
    return null;
  }

  if (isElementLike(input)) {
    return input as unknown as E;
  }

  let validParent: Document | HTMLElement | null = null;

  if (typeof parent === "string") {
    validParent = findOne<HTMLElement>(parent);
  }

  if (isNil(parent)) {
    validParent = document;
  }

  if (typeof input === "string") {
    return findOne(input, validParent);
  }

  return null;
}
