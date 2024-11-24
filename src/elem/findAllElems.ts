import type { FindOptions } from "../internal/findOptions.ts";
import { parseFindArgs } from "../internal/parseFindArgs.ts";
import { listToArray } from "../listToArray.ts";
import type {
  AttrName,
  Attrs,
  AttrValue,
  CssSelector,
  Elem,
  NullOr,
  UndefinedOr,
} from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Query the DOM using one of the specified `options` and return the Element
 * instances that match the criteria in the `options` object.
 *
 * @template E Type of Element instances to return.
 *
 * @param options Options for finding the elements. See {@linkcode FindOptions}.
 */
export function findAllElems<E extends Element = HTMLElement>(
  options: FindOptions,
): E[];

/**
 * Query the DOM to find the elements with the specified matching `attrs`.
 *
 * @template E Type of Element instances to return.
 *
 * @param attrs Key/value pairs of attributes to query for matching elements.
 * @param [parent] Optional Element or EventTarget for parent.
 */
export function findAllElems<E extends Element = HTMLElement>(
  attrs: Attrs,
  parent?: NullOr<Elem>,
): E[];

/**
 * Query the DOM using the specified CSS selector and return the matching
 * Element instances.
 *
 * @template E Type of Element instances to return.
 *
 * @param selector CSS selector string to find the elements.
 * @param [parent] Optional Element or EventTarget for parent.
 */
export function findAllElems<E extends Element = HTMLElement>(
  selector: CssSelector,
  parent?: NullOr<Elem>,
): E[];

/**
 * Query the DOM to find the Element instances with the specified name/value
 * pair for an attribute.
 *
 * @template E Type of Element instances to return.
 *
 * @param name Attribute name to find the element.
 * @param [value] Optional attribute value that corresponds with the name.
 * @param [parent] Optional Element or EventTarget for parent.
 */
export function findAllElems<E extends Element = HTMLElement>(
  name: AttrName,
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
