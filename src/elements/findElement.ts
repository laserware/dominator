import { cast, isPlainObject } from "@laserware/arcade";

import type { CssSelector } from "../css/types.ts";
import type { ElementOf, TagName } from "../dom.ts";
import { parseFindOptions } from "../internal/findOptions.ts";

import { toElement } from "./toElement.ts";
import type { ElementLike, FindOptions } from "./types.ts";

/**
 * This is the doc comment for file1.ts
 *
 * @packageDocumentation
 */

/**
 * Query the DOM for an element matching the specified CSS `selector` in the
 * optionally specified `parent`.
 *
 * @template TN Tag name of the Element representation of `target`.
 *
 * @param selector CSS selector string to find the element.
 * @param [parent] Optional Element or EventTarget for parent.
 *
 * @returns Element of tag name `TN` if found, otherwise `null`.
 *
 * @throws {SyntaxError} [SyntaxError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) if the specified `selector` is invalid.
 */
export function findElement<TN extends TagName = "*">(
  selector: CssSelector,
  parent?: ElementLike | null,
): ElementOf<TN> | null;

/**
 * Query the DOM to find the element using one of the specified `options` in the
 * optionally specified `parent`.
 *
 * @template TN Tag name of the Element representation of `target`.
 *
 * @param options Options for finding the element.
 *
 * @returns Element of tag name `TN` if found, otherwise `null`.
 *
 * @throws {SyntaxError} [SyntaxError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) if `withSelector` in the specified `options` is invalid.
 * @throws {TypeError} [TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if the specified `options` are invalid.
 */
export function findElement<TN extends TagName = "*">(
  options: FindOptions,
): ElementOf<TN> | null;

export function findElement<TN extends TagName = "*">(
  selectorOrOptions: FindOptions | CssSelector,
  parent?: ElementLike | null,
): ElementOf<TN> | null {
  let selector: string;
  let validParent: ElementLike = parent ?? document;

  if (isPlainObject(selectorOrOptions)) {
    const parsed = parseFindOptions(selectorOrOptions);

    selector = parsed.selector;
    validParent = parsed.parent;

    if (selector === "") {
      throw new TypeError("Invalid options passed to findElement");
    }
  } else {
    selector = selectorOrOptions;
  }

  const element = toElement(validParent)?.querySelector(selector);

  return cast<ElementOf<TN>>(element);
}
