import { isPlainObject } from "@laserware/arcade";

import { listToArray } from "../extras/listToArray.ts";
import { parseFindOptions, type FindOptions } from "../internal/findOptions.ts";
import type { CssSelector, Elem } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Query the DOM to find the Elements matching the specified CSS `selector` in
 * the optionally specified `parent`.
 *
 * @template E Type of Elements to return.
 *
 * @param selector CSS selector string to find the elements.
 * @param [parent] Optional Element or EventTarget for parent.
 *
 * @returns Array of Elements of type `T` if found, otherwise empty array.
 *
 * @throws {SyntaxError} If the specified selector is invalid.
 */
export function findAllElems<E extends HTMLElement = HTMLElement>(
  selector: CssSelector,
  parent?: Elem | null,
): E[];

/**
 * Query the DOM using one of the specified `options` and find the Elements
 * that match the criteria in the `options` object in the optionally specified
 * `parent`.
 *
 * @template E Type of Elements to return.
 *
 * @param options Options for finding the elements. See {@linkcode FindOptions}.
 *
 * @returns Array of Elements of type `T` if found, otherwise empty array.
 *
 * @throws {SyntaxError} If `withSelector` in the specified `options` is invalid.
 * @throws {TypeError} If the specified `options` are invalid.
 */
export function findAllElems<E extends HTMLElement = HTMLElement>(
  options: FindOptions,
): E[];

export function findAllElems<E extends HTMLElement = HTMLElement>(
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
