import { parseFindArgs } from "../internal/parseFindArgs.ts";
import { listToArray } from "../listToArray.ts";
import type {
  Attrs,
  AttrValue,
  CssSelector,
  Elem,
  FindOptions,
  NullOr,
  UndefinedOr,
} from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Query the DOM using one of the specified options and return that elements as
 * the specified type or null if not found.
 *
 * @template E Type of Elements to return.
 *
 * @param options Options for finding the elements. See {@link FindOptions}.
 */
export function findAllElems<E extends Element = HTMLElement>(
  options: FindOptions,
): E[];

/**
 * Query the DOM to find the elements with the specified matching attributes.
 *
 * @template E Type of Elements to return.
 *
 * @param attrs Key/value pairs of attributes to query for matching elements.
 * @param [parent] Optional Element or EventTarget for parent element.
 */
export function findAllElems<E extends Element = HTMLElement>(
  attrs: Attrs,
  parent?: NullOr<Elem>,
): E[];

/**
 * Query the DOM for a elements using the specified CSS selector and return the
 * matching elements.
 *
 * @template E Type of Elements to return.
 *
 * @param selector CSS selector string to find the elements.
 * @param [parent] Optional Element or EventTarget for parent element.
 */
export function findAllElems<E extends Element = HTMLElement>(
  selector: CssSelector,
  parent?: NullOr<Elem>,
): E[];

/**
 * Query the DOM to find the elements with the specified key/value pair for an
 * attribute.
 *
 * @template E Type of Elements to return.
 *
 * @param key Attribute name to find the element.
 * @param [value] Optional attribute value that corresponds with the name.
 * @param [parent] Optional Element or EventTarget for parent element.
 */
export function findAllElems<E extends Element = HTMLElement>(
  key: string,
  value: UndefinedOr<AttrValue>,
  parent?: NullOr<Elem>,
): E[];

export function findAllElems<E extends Element = HTMLElement>(
  firstArg: FindOptions | CssSelector | Attrs | string,
  valueOrParent?: NullOr<Elem> | UndefinedOr<AttrValue>,
  parent?: NullOr<Elem>,
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
