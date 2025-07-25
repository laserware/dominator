import { cast, isObjectLiteral } from "@laserware/arcade";

import type { CssSelector } from "../css/types.ts";

import { parseFindOptions } from "./findOptions.ts";
import { listToArray } from "./listToArray.ts";
import { toElement } from "./toElement.ts";
import type { ElementLike, FindOptions } from "./types.ts";

/**
 * Query the DOM to find the elements matching the specified CSS `selector` in
 * the optionally specified `parent`.
 *
 * @template E Type of elements to return.
 *
 * @param selector CSS selector string to find the elements.
 * @param [parent] Optional Element or EventTarget for parent.
 *
 * @returns Array of elements of type `E` if found, otherwise empty array.
 *
 * @throws {SyntaxError} [SyntaxError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) if the specified `selector` is invalid.
 */
export function findAllElements<E extends Element = HTMLElement>(
  selector: CssSelector,
  parent?: ElementLike | null,
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
 * @returns Array of elements of type `E` if found, otherwise empty array.
 *
 * @throws {SyntaxError} [SyntaxError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) if `withSelector` in the specified `options` is invalid.
 * @throws {TypeError} [TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if the specified `options` are invalid.
 */
export function findAllElements<E extends Element = HTMLElement>(
  options: FindOptions,
): E[];

export function findAllElements<E extends Element = HTMLElement>(
  selectorOrOptions: FindOptions | CssSelector,
  parent?: ElementLike | null,
): E[] {
  let selector: string;
  let validParent: ElementLike = parent ?? document;

  if (isObjectLiteral(selectorOrOptions)) {
    const parsed = parseFindOptions(selectorOrOptions);

    selector = parsed.selector;
    validParent = parsed.parent;

    if (selector === "") {
      throw new TypeError("Invalid options passed to findAllElements");
    }
  } else {
    selector = selectorOrOptions;
  }

  const elements = toElement(validParent)?.querySelectorAll(selector);

  return listToArray<E>(cast<NodeListOf<E>>(elements));
}
