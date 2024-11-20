/**
 * Type is either T or null or undefined.
 *
 * @template T Type if not null or undefined.
 */
export type Maybe<T> = T | null | undefined;

/**
 * Type is either T or null.
 *
 * @template T Type if not null.
 */
export type NullOr<T> = T | null;

/**
 * Type is either T or undefined.
 *
 * @template T Type if not undefined.
 */
export type UndefinedOr<T> = T | undefined;

/**
 * Primitive value that can be used as the key for an object.
 */
export type Primitive = string | number | boolean | symbol;

/**
 * Element or EventTarget that can be passed into functions.
 */
export type Elem =
  | Document
  | Element
  | EventTarget
  | HTMLElement
  | ChildNode
  | Node
  | ParentNode;

export type CssSelector = string;

export type ElemOrCssSelector = Elem | CssSelector;

/**
 * Valid HTML/SVG attribute value (prior to stringifying).
 */
export type AttrValue = boolean | number | string;

/**
 * Valid key/value pair representing HTML/SVG attributes (prior to stringifying).
 * Some of the values may be null or undefined.
 */
export type Attrs = Record<string, Maybe<AttrValue>>;

/**
 * Valid key/value pair representing HTML/SVG attributes (prior to stringifying).
 * All the values must be defined.
 */
export type AttrsDefined = Record<string, AttrValue>;

/**
 * Tag name for HTML element.
 */
export type HTMLElementTagName = keyof HTMLElementTagNameMap;

/**
 * Tag name for SVG element.
 */
export type SVGElementTagName = keyof SVGElementTagNameMap;

/**
 * Tag name for any HTML or SVG element.
 */
export type AnyElementTagName = HTMLElementTagName | SVGElementTagName;

/**
 * Element type associated with the specified tag name.
 */
export type ElementWithTagName<TN extends AnyElementTagName> =
  TN extends HTMLElementTagName
    ? HTMLElementTagNameMap[TN]
    : TN extends SVGElementTagName
      ? SVGElementTagNameMap[TN]
      : never;

/**
 * Any HTML or SVG element.
 */
export type AnyElement =
  | ElementWithTagName<HTMLElementTagName>
  | ElementWithTagName<SVGElementTagName>;

/** Find element(s) matching the specified CSS selector. */
export interface FindWithSelectorOptions {
  /** CSS selector string used to find the element. */
  selector: CssSelector;

  /** Optional parent element. */
  parent?: Maybe<ElemOrCssSelector>;

  /** Optional element tag to limit search. */
  tag?: AnyElementTagName;
}

/**
 * Find element(s) with attribute name matching the specified key
 * field. If a value is specified, it is included in the CSS selector.
 */
export interface FindWithDataOptions {
  /** Key of the attribute to find element(s). */
  key: string;

  /** Optional value of the attribute to find element(s). */
  value?: AttrValue;

  /** Optional parent element. */
  parent?: Maybe<ElemOrCssSelector>;

  /** Optional element tag to limit search. */
  tag?: AnyElementTagName;
}

/**
 * Find element(s) with the specified attributes. For attributes that don't have
 * a value, use `null`.
 */
export interface FindWithAttrsOptions {
  /** Key/value pairs of attributes to search for. */
  attrs: Attrs;

  /** Optional parent element. */
  parent?: Maybe<ElemOrCssSelector>;

  /** Optional element tag to limit search. */
  tag?: AnyElementTagName;
}

/**
 * Options for finding element(s). You can find elements by selector, key/value
 * pair for an attribute, or a set of attributes.
 */
export type FindOptions =
  | FindWithSelectorOptions
  | FindWithDataOptions
  | FindWithAttrsOptions;

/**
 * Returns true if the specified value is an Elem instance.
 */
export function isElem(value: unknown): value is Elem {
  return (
    value instanceof Document ||
    value instanceof Element ||
    value instanceof EventTarget ||
    value instanceof HTMLElement ||
    value instanceof Node
  );
}

/**
 * Returns true if the specified value is an Element or Document or EventTarget
 * that can be represented as an HTML Element.
 */
export function isElementLike(
  value: unknown,
): value is Element | HTMLElement | Document {
  return (
    value instanceof Document ||
    value instanceof Element ||
    value instanceof EventTarget ||
    value instanceof HTMLElement
  );
}

/**
 * Returns true if the specified value is a string.
 */
export function isSelector(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * Returns true if the specified value is a valid attribute value (prior to
 * stringifying).
 */
export function isAttrValue(value: unknown): value is AttrValue {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  );
}

/**
 * Returns true if the specified value is a primitive (i.e. number, string, or
 * boolean).
 */
export function isPrimitive(value: unknown): value is Primitive {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "symbol"
  );
}
