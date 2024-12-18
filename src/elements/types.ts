import type { AttributeName, Attributes } from "../attributes/types.ts";
import type { CssSelector } from "../css/types.ts";
import type { Dataset, DatasetKey } from "../dataset/types.ts";
import type {
  ElementOf,
  HTMLElementTagName,
  SVGElementTagName,
  TagName,
} from "../dom.ts";

/**
 * Element or EventTarget that can be passed into functions.
 *
 * The difference between a native [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) and this is an `Element`
 * is the base class for [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) and [SVGElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement), whereas
 * an `ElementLike` could represent a [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement), a [SVGElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement),
 * the [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document), or the element representation of an [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget).
 *
 * @template TN Tag name of Element.
 */
export type ElementLike<TN extends TagName = "*"> =
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
 * either an {@linkcode ElementLike} type object or a string representing a CSS selector.
 *
 * @template TN Tag name of Element if {@linkcode ElementLike}.
 */
export type Target<TN extends TagName = "*"> = ElementLike<TN> | CssSelector;

type NeverMethods<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
}[keyof T];

export type ExcludeMethods<T> = Pick<T, NeverMethods<T>>;

/**
 * Properties of an element with tag name `TN` that are _not_ methods (e.g.
 * `setAttribute` or `attachInternals`).
 *
 * @template TN Tag name for the associated element.
 */
export type NonMethodElementProperties<TN extends TagName> = ExcludeMethods<
  ElementOf<TN>
>;

/**
 * Properties that can be set on the element with the specified `TN` tag name.
 *
 * Note that methods/functions are excluded because this is used in the
 * {@linkcode createElement} function.
 *
 * @template TN Tag name for the associated element.
 */
export type ElementPropertiesOf<TN extends TagName> = Omit<
  NonMethodElementProperties<TN>,
  keyof GlobalEventHandlers
>;

/**
 * Name of the event handler.
 *
 * @template TN Tag name of the associated Element.
 */
export type EventNameFor<TN extends TagName = "*"> =
  TN extends HTMLElementTagName
    ? keyof HTMLElementEventMap
    : TN extends SVGElementTagName
      ? keyof SVGElementEventMap
      : keyof GlobalEventHandlersEventMap;

/**
 * Any event for an HTML or SVG element.
 *
 * @template TN Tag name of the associated Element.
 */
export type EventFor<
  TN extends TagName,
  EN extends EventNameFor<TN>,
> = TN extends HTMLElementTagName
  ? HTMLElementEventMap[EN]
  : TN extends SVGElementTagName
    ? SVGElementEventMap[EN]
    : never;

/**
 * Event listener that is called with event that corresponds to name `EN`.
 *
 * @template TN Tag name of the associated Element.
 * @template EN Name of the event that listener is associated with.
 */
export type EventListenerFor<
  TN extends TagName,
  EN extends EventNameFor<TN>,
> = (event: EventFor<TN, EN>) => void;

export interface EventListenerObjectFor<
  TN extends TagName,
  EN extends EventNameFor<TN>,
> {
  handleEvent(object: EventFor<TN, EN>): void;
}

export type EventListenerOrEventListenerObjectFor<
  TN extends TagName,
  EN extends EventNameFor<TN>,
> = EventListenerFor<TN, EN> | EventListenerObjectFor<TN, EN>;

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
  withAttributes?: Attributes<TN> | AttributeName[] | AttributeName;

  /** Key/value pairs of dataset entries to search for. */
  withDataset?: Dataset | DatasetKey[] | DatasetKey;

  /** Optional parent Element, EventTarget, or CSS selector. */
  parent?: Target | null | undefined;

  /** Optional element tag name to limit search. */
  tagName?: TagName;
};
