import type { AttributeName, Attributes } from "../attributes/types.ts";
import type { CssSelector } from "../css/types.ts";
import type { Dataset, DatasetKey } from "../dataset/types.ts";
import type { TagName } from "../dom.ts";

/**
 * Element or EventTarget that can be passed into functions.
 *
 * The difference between a native [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) and this is an `Element`
 * is the base class for [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) and [SVGElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement), whereas
 * an `ElementLike` could represent a [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement), a [SVGElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement),
 * the [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document), or the element representation of an [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget).
 */
export type ElementLike =
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
 * either an {@linkcode ElementLike} type object or a string representing a CSS selector.
 */
export type Target = ElementLike | CssSelector;

/**
 * Use to specify search criteria for finding element(s). You can find elements
 * by selector, dataset entries, or attributes.
 *
 * To search for the existence of an attribute or dataset property (not the
 * value), set the value to `null`.
 *
 * @expand
 */
export type FindOptions<E extends Element = HTMLElement> = {
  /** CSS selector search string. */
  withSelector?: CssSelector;

  /** Key/value pairs of attributes to search for. */
  withAttributes?: Attributes<E> | AttributeName[] | AttributeName;

  /** Key/value pairs of dataset entries to search for. */
  withDataset?: Dataset | DatasetKey[] | DatasetKey;

  /** Optional parent Element, EventTarget, or CSS selector. */
  parent?: Target | null | undefined;

  /** Optional element tag name to limit search. */
  tagName?: TagName | string;
};
