import type { Attrs } from "../attrs/types.ts";
import type { CssSelector } from "../css/types.ts";
import type { Data } from "../data/types.ts";
import type { TagName } from "../dom.ts";

/**
 * Element or EventTarget that can be passed into functions.
 *
 * @template E Type of Element.
 */
export type Elem<E extends Element = HTMLElement> =
  | E
  | Document
  | Element
  | EventTarget
  | HTMLElement
  | SVGElement
  | ChildNode
  | Node
  | ParentNode;

/**
 * Represents a type that can be either an Element, EventTarget, or a CSS
 * selector.
 *
 * This type allows for flexibility in functions or methods that can accept
 * either an {@linkcode Elem} type object or a string representing a CSS selector.
 *
 * @template E Type of Element if {@linkcode Elem}.
 */
export type ElemOrCssSelector<E extends Element = HTMLElement> =
  | Elem<E>
  | CssSelector;

/**
 * Use to specify search criteria for finding element(s). You can find elements
 * by selector, dataset entries, or attributes.
 *
 * To search for the existence of an attribute or dataset property (not the
 * value), set the value to `null`.
 *
 * @expand
 */
export interface FindOptions {
  /** CSS selector search string. */
  withSelector?: CssSelector;

  /** Key/value pairs of attributes to search for. */
  withAttrs?: Attrs;

  /** Key/value pairs of dataset entries to search for. */
  withData?: Data;

  /** Optional parent Element, EventTarget, or CSS selector. */
  parent?: ElemOrCssSelector | null | undefined;

  /** Optional element tag name to limit search. */
  tag?: TagName;
}
