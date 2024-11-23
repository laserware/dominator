import { isPlainObject } from "@laserware/arcade";

/**
 * Type is either T or `null` or `undefined`.
 *
 * @template T Type if not `null` or `undefined`.
 */
export type NilOr<T> = T | null | undefined;

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

export namespace Elem {
  /**
   * Returns true if the specified value is an {@linkcode Elem} instance.
   */
  export function is(value: unknown): value is Elem {
    return (
      value instanceof Document ||
      value instanceof Element ||
      value instanceof EventTarget ||
      value instanceof HTMLElement ||
      value instanceof Node
    );
  }
}

/**
 * CSS selector string.
 */
export type CssSelector = string;

export namespace CssSelector {
  /**
   * Returns true if the specified value is a CSS selector.
   */
  export function is(value: unknown): value is CssSelector {
    return typeof value === "string";
  }
}

/**
 * Represents a type that can be either an Element, Element or a CSS
 * Selector.
 *
 * This type allows for flexibility in functions or methods that can accept
 * either an `Elem` type object or a string representing a CSS selector.
 */
export type ElemOrCssSelector = Elem | CssSelector;

/**
 * Valid type for HTML/SVG attribute name.
 */
export type AttrName = string;

/**
 * Value type that can be specified as the value for an HTML/SVG attribute.
 * Before actually setting the attribute on an element, the value is stringified.
 *
 * @remarks
 * Objects and arrays are stringified via {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify|JSON.stringify}.
 */
export type AttrValue =
  | boolean
  | number
  | string
  | any[]
  | Record<number | string | symbol, any>;

export namespace AttrValue {
  /**
   * Returns true if the specified value is a valid {@linkcode AttrValue}.
   */
  export function is(value: unknown): value is AttrValue {
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return true;
    }

    if (Array.isArray(value)) {
      return true;
    }

    return isPlainObject(value);
  }
}

/**
 * Valid key/value pair representing HTML/SVG attributes (prior to stringifying).
 * Some of the values may be `null` or `undefined`.
 */
export type Attrs = Record<AttrName, NilOr<AttrValue>>;

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
 * Valid type for dataset attribute on HTML/SVG elements (e.g. `data-some-value`).
 */
export type DatasetAttrName = `data-${string}`;

/**
 * Valid dataset values (prior to stringifying).
 */
export type DatasetValue = AttrValue;

/**
 * Valid key/value pair representing dataset attributes (prior to stringifying).
 * Some of the values may be `null` or `undefined`.
 *
 * Note that the `HTMLElement.dataset` property is a
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMStringMap|DOMStringMap}.
 */
export type Dataset = Record<string, NilOr<DatasetValue>>;

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
