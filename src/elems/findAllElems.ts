import { cast, isPlainObject } from "@laserware/arcade";

import type { CssSelector } from "../css/types.ts";
import type { ElementOf, TagName } from "../dom.ts";
import { parseFindOptions } from "../internal/findOptions.ts";

import { listToArray } from "./listToArray.ts";

import { toElem } from "./toElem.ts";
import type { ElementLike, FindOptions } from "./types.ts";

/**
 * Query the DOM to find the elements matching the specified CSS `selector` in
 * the optionally specified `parent`.
 *
 * @template TN Tag name of elements to return.
 *
 * @param selector CSS selector string to find the elements.
 * @param [parent] Optional Element or EventTarget for parent.
 *
 * @returns Array of elements of tag name `TN` if found, otherwise empty array.
 *
 * @throws {SyntaxError} [SyntaxError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) if the specified `selector` is invalid.
 */
export function findAllElems<TN extends TagName = "*">(
  selector: CssSelector,
  parent?: ElementLike | null,
): ElementOf<TN>[];

/**
 * Query the DOM using one of the specified `options` and find the elements
 * that match the criteria in the `options` object in the optionally specified
 * `parent`.
 *
 * @template TN Tag name of elements to return.
 *
 * @param options Options for finding the elements.
 *
 * @returns Array of elements of tag name `TN` if found, otherwise empty array.
 *
 * @throws {SyntaxError} [SyntaxError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) if `withSelector` in the specified `options` is invalid.
 * @throws {TypeError} [TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if the specified `options` are invalid.
 */
export function findAllElems<TN extends TagName = "*">(
  options: FindOptions,
): ElementOf<TN>[];

export function findAllElems<TN extends TagName = "*">(
  selectorOrOptions: FindOptions | CssSelector,
  parent?: ElementLike | null,
): ElementOf<TN>[] {
  let selector: string;
  let validParent: ElementLike = parent ?? document;

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

  return listToArray<TN>(cast<NodeListOf<ElementOf<TN>>>(elements));
}
