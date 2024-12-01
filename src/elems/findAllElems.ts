import { isPlainObject } from "@laserware/arcade";

import type { CssSelector } from "../css/types.ts";
import type { AnyElement } from "../dom.ts";
import { parseFindOptions } from "../internal/findOptions.ts";

import { listToArray } from "./listToArray.ts";

import { toElem } from "./toElem.ts";
import type { Elem, FindOptions } from "./types.ts";

/**
 * Query the DOM to find the elements matching the specified CSS `selector` in
 * the optionally specified `parent`.
 *
 * @template E Type of elements to return.
 *
 * @param selector CSS selector string to find the elements.
 * @param [parent] Optional Element or EventTarget for parent.
 *
 * @returns Array of elements of type `T` if found, otherwise empty array.
 *
 * @throws {SyntaxError} [SyntaxError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) if the specified `selector` is invalid.
 */
export function findAllElems<E extends AnyElement = HTMLElement>(
  selector: CssSelector,
  parent?: Elem | null,
): E[];

/**
 * Query the DOM using one of the specified `options` and find the elements
 * that match the criteria in the `options` object in the optionally specified
 * `parent`.
 *
 * @template E Type of elements to return.
 *
 * @param options Options for finding the elements.
 *
 * @returns Array of elements of type `T` if found, otherwise empty array.
 *
 * @throws {SyntaxError} [SyntaxError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) if `withSelector` in the specified `options` is invalid.
 * @throws {TypeError} [TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if the specified `options` are invalid.
 */
export function findAllElems<E extends AnyElement = HTMLElement>(
  options: FindOptions,
): E[];

export function findAllElems<E extends AnyElement = HTMLElement>(
  selectorOrOptions: FindOptions | CssSelector,
  parent?: Elem | null,
): E[] {
  let selector: string;
  let validParent: Elem = parent ?? document;

  if (isPlainObject(selectorOrOptions)) {
    const parsed = parseFindOptions(selectorOrOptions);

    selector = parsed.selector;
    validParent = parsed.parent;

    if (selector === "") {
      throw new TypeError("Invalid options passed to findAllElems");
    }
  } else {
    selector = selectorOrOptions;
  }

  const elements = toElem(validParent)?.querySelectorAll(selector);

  return listToArray<E>(elements as NodeListOf<E>);
}
