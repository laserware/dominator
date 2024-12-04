import type { Attrs } from "../attrs/types.ts";
import type { CssSelector } from "../css/types.ts";
import type { Data } from "../data/types.ts";
import type { ElementOf, TagName } from "../dom.ts";

/**
 * Element or EventTarget that can be passed into functions.
 *
 * @template TN Tag name of Element.
 */
export type Elem<TN extends TagName = "*"> =
  | ElementOf<TN>
  | Document
  | Element
  | EventTarget
  | HTMLElement
  | SVGElement
  | Node
  | ChildNode
  | ParentNode;

/**
 * Represents a type that can be either an Element, EventTarget, or a CSS
 * selector.
 *
 * This type allows for flexibility in functions or methods that can accept
 * either an {@linkcode Elem} type object or a string representing a CSS selector.
 *
 * @template TN Tag name of Element if {@linkcode Elem}.
 */
export type ElemOrCssSelector<TN extends TagName = "*"> =
  | Elem<TN>
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
export type FindOptions<TN extends TagName = "*"> = {
  /** CSS selector search string. */
  withSelector?: CssSelector;

  /** Key/value pairs of attributes to search for. */
  withAttrs?: Attrs<TN>;

  /** Key/value pairs of dataset entries to search for. */
  withData?: Data;

  /** Optional parent Element, EventTarget, or CSS selector. */
  parent?: ElemOrCssSelector | null | undefined;

  /** Optional element tag name to limit search. */
  tagName?: TagName;
};
