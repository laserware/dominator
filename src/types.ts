/* istanbul ignore file -- @preserve: These are just type definitions, no need to enforce coverage. */
// noinspection SpellCheckingInspection

import type { AnyElement, HTMLElementAttributes, TagName } from "./dom.ts";

export type {
  AnyElement,
  ElementWithTagName,
  HTMLElementAttributes,
  HTMLElementTagName,
  SVGElementTagName,
  TagName,
} from "./dom.ts";

/**
 * Type is either a single item or array of items of type `T`.
 *
 * @typeParam T Type of item or items.
 */
export type OneOrManyOf<T> = T | T[];

/**
 * Extracts the keys of the specified object as an array.
 *
 * @typeParam T Object to extract keys from.
 */
export type KeysOf<T extends Record<any, any>> = Extract<keyof T, string>[];

/**
 * Adds `null` as the possible type for the fields in the specified type.
 *
 * @typeParam T Type of object to add `null` to fields.
 */
export type WithNullValues<T extends Record<any, any>> = {
  [K in keyof T]: T[K] | null;
};

/**
 * Adds `undefined` as the possible type for the fields in the specified type.
 *
 * @typeParam T Type of object to add `undefined` to fields.
 */
export type WithUndefinedValues<T extends Record<any, any>> = {
  [K in keyof T]: T[K] | undefined;
};

/**
 * Represents primitive values that can be used to set properties on Elements.
 */
export type Primitive = boolean | number | string;

/**
 * Valid type for HTML/SVG attribute name.
 *
 * @typeParam E Type of Element with corresponding attribute names.
 *
 * @category Attrs
 */
export type AttrName<E extends AnyElement = HTMLElement> =
  | Extract<keyof HTMLElementAttributes<E>, string>
  | string;

/**
 * Value type that can be specified as the value for an HTML/SVG attribute.
 *
 * Note that *all* attribute values are strings when they make it to the DOM.
 * This represents the value type that can be assigned to attributes using
 * {@linkcode setAttr} and {@linkcode setAttrs} as well as the return value for
 * attributes when using {@linkcode getAttr} and {@linkcode getAttrs}.
 *
 * @category Attrs
 */
export type AttrValue = Primitive | any[] | Record<number | string, any>;

/**
 * Valid key/value pair representing HTML/SVG attributes (prior to stringifying).
 * Some of the values may be `null` or `undefined`.
 *
 * @typeParam E Type of Element for corresponding attributes.
 *
 * @category Attrs
 */
export type Attrs<E extends AnyElement = HTMLElement> = Record<
  AttrName<E>,
  AttrValue | null | undefined
>;

/**
 * Valid key/value pair representing HTML/SVG attributes (prior to stringifying).
 * All the values must be defined.
 *
 * @category Attrs
 */
export type AttrsDefined = Record<string, AttrValue>;

/**
 * CSS selector string. Note that no validation is performed on the selector,
 * so this could represent any string value (even if it is not a valid CSS
 * selector).
 *
 * @category CSS
 */
export type CssSelector = string;

/**
 * Valid name for a [CSS variable](https://developer.mozilla.org/en-US/docs/Web/CSS/--*).
 *
 * CSS variables *must* start with `--`.
 *
 * @category CSS
 */
export type CssVarName = `--${string}`;

/**
 * Valid value for a [CSS variable](https://developer.mozilla.org/en-US/docs/Web/CSS/--*).
 *
 * @category CSS
 */
export type CssVarValue = Primitive;

/**
 * Represents an object with key of {@linkcode CssVarName} and value
 * of {@linkcode CssVarValue}.
 *
 * @category CSS
 */
export type CssVars = Record<CssVarName, CssVarValue>;

/**
 * Valid type for the key of [HTMLElement.dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)
 * property entries in HTML/SVG Elements.
 *
 * @category Data
 */
export type DataPropertyName = string;

/**
 * Valid name for dataset [data-* attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*)
 * on HTML/SVG Element (e.g. `data-some-value`).
 *
 * @category Data
 */
export type DataAttrName = `data-${string}`;

/**
 * Valid name for {@linkcode Data} entries. Represents either a key for the
 * [HTMLElement.dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) property
 * or a name for the [data-* attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).
 *
 * @category Data
 */
export type DataKey = DataPropertyName | DataAttrName;

/**
 * Valid dataset values (prior to stringifying).
 *
 * @category Data
 */
export type DataValue = Primitive | any[] | Record<number | string, any>;

/**
 *
 * Valid key/value pair representing dataset attributes (prior to stringifying).
 * The key should be a valid {@linkcode DataKey} and the value must be a valid
 * {@linkcode DataValue}. Some of the values may be `null` or `undefined`.
 *
 * Note that the `HTMLElement.dataset` property is a
 * [DOMStringMap](https://developer.mozilla.org/en-US/docs/Web/API/DOMStringMap).
 *
 * @category Data
 */
export type Data = Record<string, DataValue | null | undefined>;

/**
 * Key representing any type of DOM property (i.e. attributes, CSS variables,
 * dataset attribute/property names and style keys).
 *
 * @typeParam E Type of Element associated with the underlying DOM properties.
 *
 * @category DOM
 */
export type DOMPropertyKey<E extends AnyElement = HTMLElement> =
  | AttrName<E>
  | CssVarName
  | DataKey
  | StyleKey;

/**
 * Represents a value that can be assigned to a DOM property after stringification.
 *
 * Objects and arrays are stringified via [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).
 *
 * @category DOM
 */
export type DOMPropertyValue = AttrValue | CssVarValue | DataValue | StyleValue;

/**
 * Filter value for performing DOM property searches. Use `null` to check if
 * an entry exists only (skip checking if values match).
 *
 * @category DOM
 */
export type DOMPropertyFilterValue =
  | AttrValue
  | DataValue
  | CssVarValue
  | StyleValue
  | null;

/**
 * Filter criteria for determining if a DOM property has the specified value.
 *
 * @typeParam K Key of the property to filter.
 * @typeParam V Value of the property to filter. If not checking for a value, use `null`.
 *
 * @category DOM
 */
export type DOMPropertyFilter<
  K extends DOMPropertyKey,
  V extends DOMPropertyFilterValue,
> = { [key in K]?: V };

/**
 * Search criteria that can be used to determine if a DOM property is present
 * on an Element. If an array, only the presence of the property **names** are
 * checked. If an object, the property name **and** value are checked.
 *
 * To check for the existence of a property only (i.e. you don't care what the
 * value is), use `null` for the field.
 *
 * @typeParam K Key of the property to search.
 * @typeParam V Type of the value to search for (only needed if using {@linkcode DOMPropertyFilter}).
 *
 * @example
 * **HTML**
 *
 * ```html
 * <button id="example" aria-hidden="true" aria-label="Example">Example</button>
 * ```
 *
 * **Code**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * const result = hasAllAttrs(elem, {
 *   "aria-hidden": true,
 *   // Setting to null means "only check if property exists"
 *   "aria-label": null,
 * });
 * // true
 * ```
 *
 * @category DOM
 */
export type DOMPropertySearch<
  K extends DOMPropertyKey = DOMPropertyKey,
  V extends DOMPropertyFilterValue = DOMPropertyFilterValue,
> = K[] | DOMPropertyFilter<K, V>;

/**
 * Element or EventTarget that can be passed into functions.
 *
 * @typeParam E Type of Element.
 *
 * @category Elems
 */
export type Elem<E extends AnyElement = HTMLElement> =
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
 * @typeParam E Type of Element if {@linkcode Elem}.
 *
 * @category Elems
 */
export type ElemOrCssSelector<E extends AnyElement = HTMLElement> =
  | Elem<E>
  | CssSelector;

/**
 * Use to specify search criteria for finding Element(s). You can find Elements
 * by selector, dataset entries, or attributes.
 *
 * To search for the existence of an attribute or dataset property (not the
 * value), set the value to `null`.
 *
 * @expand
 *
 * @category Elems
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
 * Valid style keys (i.e. non-methods) that can be set on an Element.
 *
 * @category Styles
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
 * Value that can be set for an Element style. The value is stringified prior
 * to being set on the Element.
 *
 * @category Styles
 */
export type StyleValue = Primitive;

/**
 * Object representing element styles with a key of {@linkcode StyleKey} and a
 * value of {@linkcode StyleValue}.
 *
 * @category Styles
 */
export type Styles = Partial<Record<StyleKey, StyleValue>>;
