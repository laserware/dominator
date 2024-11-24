import { listToArray } from "../extras/listToArray.ts";
import type { FindOptions } from "../internal/findOptions.ts";
import { parseFindArgs } from "../internal/parseFindArgs.ts";
import type {
  AttrName,
  Attrs,
  AttrValue,
  CssSelector,
  Elem,
} from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Query the DOM using one of the specified `options` and find the Elements
 * that match the criteria in the `options` object.
 *
 * @template E Type of Elements to return.
 *
 * @param options Options for finding the elements. See {@linkcode FindOptions}.
 *
 * @returns Array of Elements of type `T` if found, otherwise empty array.
 */
export function findAllElems<E extends Element = HTMLElement>(
  options: FindOptions,
): E[];

/**
 * Query the DOM to find the Elements matching the specified CSS `selector`.
 *
 * @template E Type of Elements to return.
 *
 * @param selector CSS selector string to find the elements.
 * @param [parent] Optional Element or EventTarget for parent.
 *
 * @returns Array of Elements of type `T` if found, otherwise empty array.
 */
export function findAllElems<E extends Element = HTMLElement>(
  selector: CssSelector,
  parent?: Elem | null,
): E[];

/**
 * Query the DOM to find the Elements with the specified attribute `name`
 * and optional `value`.
 *
 * @template E Type of Elements to return.
 *
 * @param name Attribute name to find the element.
 * @param [value] Optional attribute value that corresponds with the name.
 * @param [parent] Optional Element or EventTarget for parent.
 *
 * @returns Array of Elements of type `T` if found, otherwise empty array.
 */
export function findAllElems<E extends Element = HTMLElement>(
  name: AttrName,
  value: AttrValue | undefined,
  parent?: Elem | null,
): E[];

/**
 * Query the DOM to find the Elements with the specified matching `attrs`.
 *
 * @template E Type of Elements to return.
 *
 * @param attrs Key/value pairs of attributes to query for matching elements.
 * @param [parent] Optional Element or EventTarget for parent.
 *
 * @returns Array of Elements of type `T` if found, otherwise empty array.
 */
export function findAllElems<E extends Element = HTMLElement>(
  attrs: Attrs,
  parent?: Elem | null,
): E[];

export function findAllElems<E extends Element = HTMLElement>(
  firstArg: FindOptions | CssSelector | Attrs | string,
  valueOrParent?: Elem | null | AttrValue | undefined,
  parent?: Elem | null,
): E[] {
  const result = parseFindArgs(firstArg, valueOrParent, parent);

  try {
    // prettier-ignore
    const elements = toElem(result.validParent)?.querySelectorAll(result.selector);

    return listToArray<E>(elements as NodeListOf<E>);
  } catch {
    return [];
  }
}
