/* istanbul ignore file -- @preserve: These are just type definitions, no need to enforce coverage. */
// noinspection SpellCheckingInspection

import type { HTMLElementAttributes } from "./dom.ts";

/**
 * Type is either a single item or array of items of type `T`.
 *
 * @template T Type of item or items.
 */
export type OneOrManyOf<T> = T | T[];

/**
 * Extracts the keys of the specified object as an array.
 *
 * @template T Object to extract keys from.
 */
export type KeysOf<T extends Record<any, any>> = Extract<keyof T, string>[];

/**
 * Indicates that values of the specified object could be their value or
 * `undefined`.
 *
 * @template T Type of object to add `undefined` to fields.
 */
export type WithUndefinedValues<T extends Record<any, any>> = {
  [K in keyof T]: T[K] | undefined;
};

/**
 * Indicates that values of the specified object could be their value or
 * `null`.
 *
 * @template T Type of object to add `null` to fields.
 */
export type WithNullValues<T extends Record<any, any>> = {
  [K in keyof T]: T[K] | null;
};

/**
 * Represents primitive values that can be used to set certain attributes and
 * properties on elements.
 */
export type Primitive = boolean | number | string;

/**
 * Element or EventTarget that can be passed into functions.
 *
 * @template E Type of Element.
 *
 * @group Elements
 */
export type Elem<E extends HTMLElement = HTMLElement> =
  | E
  | Document
  | Element
  | EventTarget
  | HTMLElement
  | ChildNode
  | Node
  | ParentNode;

/**
 * CSS selector string. Note that no validation is performed on the selector,
 * so this could represent any string value (even if it is not a valid CSS
 * selector).
 *
 * @group CSS
 */
export type CssSelector = string;

/**
 * Represents a type that can be either an Element, EventTarget, or a CSS
 * selector.
 *
 * This type allows for flexibility in functions or methods that can accept
 * either an {@linkcode Elem} type object or a string representing a CSS selector.
 *
 * @template E Type of element if `Elem`.
 *
 * @group Elements
 */
export type ElemOrCssSelector<E extends HTMLElement = HTMLElement> =
  | Elem<E>
  | CssSelector;

/**
 * Valid type for HTML/SVG attribute name.
 *
 * @template E Type of element with corresponding attribute names.
 *
 * @group Attributes
 */
export type AttrName<E extends HTMLElement = HTMLElement> =
  | Extract<keyof HTMLElementAttributes<E>, string>
  | string;

/**
 * Value type that can be specified as the value for an HTML/SVG attribute.
 * Before actually setting the attribute on an element, the value is stringified.
 *
 * @group Attributes
 */
export type AttrValue = DOMPropertyValue;

/**
 * Valid key/value pair representing HTML/SVG attributes (prior to stringifying).
 * Some of the values may be `null` or `undefined`.
 *
 * @template E Type of Element for corresponding attributes.
 *
 * @group Attributes
 */
export type Attrs<E extends HTMLElement = HTMLElement> = Record<
  AttrName<E>,
  AttrValue | null | undefined
>;

/**
 * Valid key/value pair representing HTML/SVG attributes (prior to stringifying).
 * All the values must be defined.
 *
 * @group Attributes
 */
export type AttrsDefined = Record<string, AttrValue>;

/**
 * Valid name for a {@link https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties|CSS variable}.
 *
 * CSS variables *must* start with `--`.
 *
 * @group CSS
 */
export type CssVarName = `--${string}`;

/**
 * Valid value for a CSS variable.
 *
 * @group CSS
 */
export type CssVarValue = Primitive;

/**
 * Represents an object with key of {@linkcode CssVarName} and value
 * of {@linkcode CssVarValue}.
 *
 * @group CSS
 */
export type CssVars = Record<CssVarName, CssVarValue>;

/**
 * Valid type for the key of {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset|HTMLElement.dataset}
 * property entries in HTML/SVG elements.
 *
 * @group Dataset
 */
export type DataPropertyName = string;

/**
 * Valid name for dataset {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*|data-* attribute}
 * on HTML/SVG elements (e.g. `data-some-value`).
 *
 * @group Dataset
 */
export type DataAttrName = `data-${string}`;

/**
 * Valid name for {@linkcode Data} entries. Represents either a key for the
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset|HTMLElement.dataset} property
 * or a name for the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*|data-* attribute}.
 *
 * @group Dataset
 */
export type DataKey = DataPropertyName | DataAttrName;

/**
 * Valid dataset values (prior to stringifying).
 *
 * @group Dataset
 */
export type DataValue = DOMPropertyValue;

/**
 *
 * Valid key/value pair representing dataset attributes (prior to stringifying).
 * The key should be a valid {@linkcode DataKey} and the value must be a valid
 * {@linkcode DataValue}. Some of the values may be `null` or `undefined`.
 *
 * Note that the `HTMLElement.dataset` property is a
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMStringMap|DOMStringMap}.
 *
 * @group Dataset
 */
export type Data = Record<string, DataValue | null | undefined>;

/**
 * Valid style keys (i.e. non-methods) that can be set on an element.
 *
 * @group Styles
 */
export type StyleKey =
  | Exclude<
      keyof CSSStyleDeclaration,
      // These are read-only:
      | "length"
      | "parentRule"

      // These are methods which can't be stringified:
      | "getPropertyPriority"
      | "getPropertyValue"
      | "item"
      | "removeProperty"
      | "setProperty"

      // This allows us to access the index of a style, which we also don't want
      // to allow in the builder.
      | number
    >
  | CssVarName;

/**
 * Value that can be set for an element style. The value is stringified prior
 * to being set on the element.
 *
 * @group Styles
 */
export type StyleValue = Primitive;

/**
 * Object representing element styles with a key of {@linkcode StyleKey} and a
 * value of {@linkcode StyleValue}.
 *
 * @group Styles
 */
export type Styles = Partial<Record<StyleKey, StyleValue>>;

/**
 * Key representing any type of DOM property (i.e. attributes, CSS variables,
 * dataset attribute/property names and style keys).
 */
export type DOMPropertyKey<E extends HTMLElement = HTMLElement> =
  | AttrName<E>
  | CssVarName
  | DataKey
  | StyleKey;

/**
 * Represents a value that can be assigned to a DOM property after stringification.
 *
 * Objects and arrays are stringified via [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).
 */
export type DOMPropertyValue = Primitive | any[] | Record<number | string, any>;

/**
 * Filter value for performing DOM property searches. Use `null` to check if
 * an entry exists only (skip checking if values match).
 */
export type DOMPropertyFilterValue =
  | AttrValue
  | DataValue
  | CssVarValue
  | StyleValue
  | null;

/**
 * Filter criteria for determining if a DOM property has the specified value.
 */
export type DOMPropertyFilter<
  K extends DOMPropertyKey,
  V extends DOMPropertyFilterValue,
> = { [key in K]?: V };

/**
 * Search criteria that can be used to determine if a DOM property is present
 * on an element. If an array, only the presence of the property *names* are
 * checked. If an object, the property name *and* value are checked.
 *
 * @template K The type of {@linkcode DOMPropertyKey}.
 * @template V The type of {@linkcode DOMPropertyFilterValue} (only needed if using {@linkcode DOMPropertyFilter}).
 */
export type DOMPropertySearch<
  K extends DOMPropertyKey = DOMPropertyKey,
  V extends DOMPropertyFilterValue = DOMPropertyFilterValue,
> = K[] | DOMPropertyFilter<K, V>;

/**
 * Tag name for any HTML or SVG element.
 *
 * @group Elements
 */
export type TagName = HTMLElementTagName | SVGElementTagName;

/**
 * Use to specify search criteria for finding Element(s). You can find elements
 * by selector, dataset entries, or attributes.
 *
 * To search for the existence of an attribute or dataset property (not the
 * value), set the value to `null`.
 *
 * @expand
 *
 * @group Elements
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

  /** Optional Element tag to limit search. */
  tag?: TagName;
}

/**
 * Tag name for HTML element.
 */
export type HTMLElementTagName = keyof HTMLElementTagNameMap;

/**
 * Tag name for SVG element.
 */
export type SVGElementTagName = keyof SVGElementTagNameMap;

/**
 * Element type associated with the specified tag name.
 */
export type ElementWithTagName<TN extends TagName> =
  TN extends HTMLElementTagName
    ? HTMLElementTagNameMap[TN]
    : TN extends SVGElementTagName
      ? SVGElementTagNameMap[TN]
      : never;
