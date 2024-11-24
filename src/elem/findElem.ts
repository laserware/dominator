import type { FindOptions } from "../internal/findOptions.ts";
import { parseFindArgs } from "../internal/parseFindArgs.ts";
import type {
  AttrName,
  Attrs,
  AttrValue,
  CssSelector,
  Elem,
} from "../types.ts";

import { asElem } from "./asElem.ts";
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
 */
export function findElem<E extends Element = HTMLElement>(
  selector: CssSelector,
  parent?: Elem | null,
): E | null;

/**
 * Query the DOM to find the Element with the specified attribute `name` and
 * optional `value`.
 *
 * @template E Type of Element to return.
 *
 * @param name Attribute name to find the element.
 * @param [value] Optional attribute value that corresponds with the name.
 * @param [parent] Optional Element or EventTarget for parent.
 *
 * @returns Element of type `E` if found, otherwise `null`.
 */
export function findElem<E extends Element = HTMLElement>(
  name: AttrName,
  value: AttrValue | undefined,
  parent?: Elem | null,
): E | null;

/**
 * Query the DOM to find the Element with the specified matching `attrs` or
 * `null` if not found.
 *
 * @template E Type of Element to return.
 *
 * @param attrs Key/value pairs of attributes to query for matching elements.
 * @param [parent] Optional Element or EventTarget for parent.
 *
 * @returns Element of type `E` if found, otherwise `null`.
 */
export function findElem<E extends Element = HTMLElement>(
  attrs: Attrs,
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
 */
export function findElem<E extends Element = HTMLElement>(
  options: FindOptions,
): E | null;

export function findElem<E extends Element = HTMLElement>(
  firstArg: FindOptions | CssSelector | Attrs | AttrName,
  valueOrParent?: Elem | null | AttrValue | undefined,
  parent?: Elem | null,
): E | null {
  const result = parseFindArgs(firstArg, valueOrParent, parent);

  try {
    const validParent = result.validParent ?? document;

    const elem = toElem(validParent)?.querySelector(result.selector);

    return asElem<E>(elem);
  } catch {
    return null;
  }
}
