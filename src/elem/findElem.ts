import type { FindOptions } from "../internal/findOptions.ts";
import { parseFindArgs } from "../internal/parseFindArgs.ts";
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
 * Query the DOM to find the `Element` using one of the specified `options` or
 * `null` if not found.
 *
 * @template E Type of `Element` to return.
 *
 * @param options Options for finding the element. See {@link FindOptions}.
 */
export function findElem<E extends Element = HTMLElement>(
  options: FindOptions,
): NullOr<E>;

/**
 * Query the DOM to find the `Element` with the specified matching `attrs` or
 * `null` if not found.
 *
 * @template E Type of `Element` to return.
 *
 * @param attrs Key/value pairs of attributes to query for matching elements.
 * @param [parent] Optional `Element` or `EventTarget` for parent.
 */
export function findElem<E extends Element = HTMLElement>(
  attrs: Attrs,
  parent?: NullOr<Elem>,
): NullOr<E>;

/**
 * Query the DOM for an `Element` matching the specified `selector` or
 * `null` if not found.
 *
 * @template E Type of `Element` to return.
 *
 * @param selector CSS selector string to find the element.
 * @param [parent] Optional `Element` or `EventTarget` for parent.
 */
export function findElem<E extends Element = HTMLElement>(
  selector: CssSelector,
  parent?: NullOr<Elem>,
): NullOr<E>;

/**
 * Query the DOM to find the `Element` with the specified attribute `name` and
 * optional `value` or `null` if not found.
 *
 * @template E Type of `Element` to return.
 *
 * @param name Attribute name to find the element.
 * @param [value] Optional attribute value that corresponds with the name.
 * @param [parent] Optional `Element` or `EventTarget` for parent.
 */
export function findElem<E extends Element = HTMLElement>(
  name: AttrName,
  value: UndefinedOr<AttrValue>,
  parent?: NullOr<Elem>,
): NullOr<E>;

export function findElem<E extends Element = HTMLElement>(
  firstArg: FindOptions | CssSelector | Attrs | AttrName,
  valueOrParent?: NullOr<Elem> | UndefinedOr<AttrValue>,
  parent?: NullOr<Elem>,
): NullOr<E> {
  const result = parseFindArgs(firstArg, valueOrParent, parent);

  try {
    const validParent = result.validParent ?? document;

    // prettier-ignore
    return toElem(validParent)?.querySelector(result.selector) as unknown as E;
  } catch {
    return null;
  }
}
