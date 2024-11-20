/**
 * Type is either T or `null` or `undefined`.
 *
 * @template T Type if not `null` or `undefined`.
 */
export type Maybe<T> = T | null | undefined;

/**
 * Type is either T or `null`.
 *
 * @template T Type if not `null`.
 */
export type NullOr<T> = T | null;

/**
 * Type is either T or `undefined`.
 *
 * @template T Type if not `undefined`.
 */
export type UndefinedOr<T> = T | undefined;

/**
 * Primitive value that can be used as the key for an object.
 */
export type Primitive = string | number | boolean | symbol;

/**
 * `Element` or `EventTarget` that can be passed into functions.
 */
export type Elem =
  | Document
  | Element
  | EventTarget
  | HTMLElement
  | ChildNode
  | Node
  | ParentNode;

/**
 * CSS selector string.
 */
export type CssSelector = string;

/**
 * Represents a type that can be either an `Element`, `EventTarget` or a CSS
 * Selector.
 *
 * This type allows for flexibility in functions or methods that can accept
 * either an `Elem` type object or a string representing a CSS selector.
 */
export type ElemOrCssSelector = Elem | CssSelector;

// Ensure the user
type ExcludeMethods<T> = Pick<
  T,
  { [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K }[keyof T]
>;

// Utility type to check if a type is `null` or `undefined`
type NonNullableType<T> = T extends null | undefined ? never : T;

type NonMethodAttrs = ExcludeMethods<AnyElement>;

export type AnyElementAttrName = NonNullableType<keyof NonMethodAttrs>;

/**
 * Valid type for HTML/SVG attribute name.
 */
export type AttrName = AnyElementAttrName | string;

/**
 * Valid HTML/SVG attribute value (prior to stringifying).
 */
export type AttrValue = boolean | number | string;

/**
 * Valid key/value pair representing HTML/SVG attributes (prior to stringifying).
 * Some of the values may be null or undefined.
 */
export type Attrs = Record<AttrName, Maybe<AttrValue>>;

/**
 * Valid key/value pair representing HTML/SVG attributes (prior to stringifying).
 * All the values must be defined.
 */
export type AttrsDefined = Record<string, AttrValue>;

/**
 * Valid type for the key of `dataset` entries in HTML/SVG elements.
 */
export type DatasetKey = string;

/**
 * Valid dataset values (prior to stringifying).
 */
export type DatasetValue = AttrValue;

/**
 * Valid key/value pair representing dataset attributes (prior to stringifying).
 * Some of the values may be null or undefined.
 *
 * Note that the `HTMLElement.dataset` property is a
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMStringMap|DOMStringMap}.
 */
export type Dataset = Record<string, Maybe<DatasetValue>>;

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
  withSelector: CssSelector;

  /** Optional parent element. */
  parent?: Maybe<ElemOrCssSelector>;

  /** Optional element tag to limit search. */
  tag?: AnyElementTagName;
}

/**
 * Find `Element(s)` with attribute name matching the specified key
 * field. If a value is specified, it is included in the CSS selector.
 */
export interface FindWithAttrOptions {
  /** Name of the attribute. */
  withName: AttrName;

  /** Optional value of the attribute. */
  withValue?: AttrValue;

  /** Optional parent `Element`, `EventTarget`, or CSS selector. */
  parent?: Maybe<ElemOrCssSelector>;

  /** Optional `Element` tag to limit search. */
  tag?: AnyElementTagName;
}

/**
 * Find `Element(s)` with the specified attributes. For attributes that don't
 * have a value, use `null`.
 */
export interface FindWithAttrsOptions {
  /** Key/value pairs of attributes. */
  withAttrs: Attrs;

  /** Optional parent `Element`, `EventTarget`, or CSS selector. */
  parent?: Maybe<ElemOrCssSelector>;

  /** Optional `Element` tag to limit search. */
  tag?: AnyElementTagName;
}

/**
 * Find `Element(s)` with the specified dataset. For `data-` attributes that
 * don't have a value, use `null`.
 */
export interface FindWithDataOptions {
  /** Key/value pairs of dataset to search for. */
  withData: Attrs;

  /** Optional parent `Element`, `EventTarget`, or CSS selector. */
  parent?: Maybe<ElemOrCssSelector>;

  /** Optional `Element` tag to limit search. */
  tag?: AnyElementTagName;
}

/**
 * Options for finding `Element(s)`. You can find elements by selector, name/value
 * pair for an attribute, or a set of attributes.
 *
 * Note that the search fields use a `with*` prefix to ensure they don't
 * accidentally get treated as HTML/SVG attributes.
 */
export type FindOptions =
  | FindWithAttrOptions
  | FindWithAttrsOptions
  | FindWithDataOptions
  | FindWithSelectorOptions;

/**
 * Returns true if the specified value is an {@linkcode Elem} instance.
 */
export function isElem(value: unknown): value is Elem {
  if (isElementLike(value)) {
    return true;
  }

  return value instanceof Node;
}

/**
 * Returns true if the specified value is an `Element`, `Document`, or `EventTarget`
 * that can be represented as an `HTMLElement`.
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
 * Returns true if the specified value is a CSS selector.
 */
export function isCssSelector(value: unknown): value is string {
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
 * Returns true if the specified value is a primitive (i.e. number, string,
 * boolean, or symbol).
 */
export function isPrimitive(value: unknown): value is Primitive {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "symbol"
  );
}
