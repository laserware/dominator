import type {
  CssSelector,
  ElemOrCssSelector,
  Maybe,
  NullOr,
} from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Query the DOM for a specific element and return that element as the specified
 * type or null if not found.
 *
 * @template E Type of Element to return.
 *
 * @param selector CSS selector string to find the element.
 * @param [parent=document] Optional Element, EventTarget, or selector for parent element.
 */
export function findOne<E extends Element = HTMLElement>(
  selector: CssSelector,
  parent: Maybe<ElemOrCssSelector> = document,
): NullOr<E> {
  try {
    return toElem(parent)?.querySelector(selector) as unknown as E;
  } catch {
    return null;
  }
}
