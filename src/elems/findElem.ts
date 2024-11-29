import { isPlainObject } from "@laserware/arcade";

import { cast } from "../internal/cast.ts";
import { parseFindOptions } from "../internal/findOptions.ts";
import type { AnyElement, CssSelector, Elem, FindOptions } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * This is the doc comment for file1.ts
 *
 * @packageDocumentation
 */

/**
 * Query the DOM for an Element matching the specified CSS `selector` in the
 * optionally specified `parent`.
 *
 * @template E Element type of specified `target`.
 *
 * @param selector CSS selector string to find the element.
 * @param [parent] Optional Element or EventTarget for parent.
 *
 * @returns Element of type `E` if found, otherwise `null`.
 *
 * @throws {SyntaxError} [SyntaxError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) if the specified `selector` is invalid.
 *
 * @category Elems
 */
export function findElem<E extends AnyElement = HTMLElement>(
  selector: CssSelector,
  parent?: Elem | null,
): E | null;

/**
 * Query the DOM to find the Element using one of the specified `options` in the
 * optionally specified `parent`.
 *
 * @template E Element type of specified `target`.
 *
 * @param options Options for finding the element.
 *
 * @returns Element of type `E` if found, otherwise `null`.
 *
 * @throws {SyntaxError} [SyntaxError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) if `withSelector` in the specified `options` is invalid.
 * @throws {TypeError} [TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if the specified `options` are invalid.
 *
 * @category Elems
 */
export function findElem<E extends AnyElement = HTMLElement>(
  options: FindOptions,
): E | null;

export function findElem<E extends AnyElement = HTMLElement>(
  selectorOrOptions: FindOptions | CssSelector,
  parent?: Elem | null,
): E | null {
  let selector: string;
  let validParent: Elem = parent ?? document;

  if (isPlainObject(selectorOrOptions)) {
    const parsed = parseFindOptions(selectorOrOptions);

    selector = parsed.selector;
    validParent = parsed.parent;

    if (selector === "") {
      throw new TypeError("Invalid options passed to findElem");
    }
  } else {
    selector = selectorOrOptions;
  }

  const elem = toElem(validParent)?.querySelector(selector);

  return cast<E>(elem);
}
