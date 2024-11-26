import { cast } from "../internal/cast.ts";
import { FindOptions } from "../internal/findOptions.ts";
import type { CssSelector, Elem } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Query the DOM for an Element matching the specified `selector`.
 *
 * @template E Type of Element to return.
 *
 * @param selector CSS selector string to find the element.
 * @param [parent] Optional Element or EventTarget for parent.
 *
 * @returns Element of type `E` if found, otherwise `null`.
 *
 * @throws {SyntaxError} If the specified selector is invalid.
 */
export function findElem<E extends Element = HTMLElement>(
  selector: CssSelector,
  parent?: Elem | null,
): E | null;

/**
 * Query the DOM to find the Element using one of the specified `options`.
 *
 * @template E Type of Element to return.
 *
 * @param options Options for finding the element. See {@linkcode FindOptions}.
 *
 * @returns Element of type `E` if found, otherwise `null`.
 *
 * @throws {SyntaxError} If the specified selector is invalid.
 */
export function findElem<E extends Element = HTMLElement>(
  options: FindOptions,
): E | null;

export function findElem<E extends Element = HTMLElement>(
  selectorOrOptions: FindOptions | CssSelector,
  parent?: Elem | null,
): E | null {
  let selector: string;
  let validParent: Elem = parent ?? document;

  if (FindOptions.is(selectorOrOptions)) {
    const parsed = FindOptions.parse(selectorOrOptions);

    selector = parsed.selector;
    validParent = parsed.parent;
  } else {
    selector = selectorOrOptions;
  }

  const elem = toElem(validParent)?.querySelector(selector);

  return cast<E>(elem);
}
