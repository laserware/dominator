/* istanbul ignore file -- @preserve: These are just type definitions, no need to enforce coverage. */
// noinspection SpellCheckingInspection

import { isPlainObject } from "@laserware/arcade";

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

export namespace Primitive {
  /**
   * Returns true if the specified value is a {@linkcode Primitive}.
   */
  export function is(value: unknown): value is Primitive {
    return (
      typeof value === "boolean" ||
      typeof value === "number" ||
      typeof value === "string"
    );
  }
}

/**
 * Represents a value that can be assigned to a DOM property after stringification.
 *
 * @remarks
 * Objects and arrays are stringified via {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify|JSON.stringify}.
 */
export type DOMPropertyValue = Primitive | any[] | Record<number | string, any>;

export namespace DOMPropertyValue {
  /**
   * Returns true if the specified value is a valid {@linkcode DOMPropertyValue}.
   */
  export function is(value: unknown): value is DOMPropertyValue {
    if (Primitive.is(value)) {
      return true;
    }

    if (Array.isArray(value)) {
      return true;
    }

    return isPlainObject(value);
  }
}

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
 * CSS selector string. Note that no validation is performed on the selector,
 * so this could represent any string value (even if it is not a valid CSS
 * selector).
 */
export type CssSelector = string;

export namespace CssSelector {
  /**
   * Returns true if the specified `value` is a {@linkcode CssSelector}.
   */
  export function is(value: unknown): value is CssSelector {
    return typeof value === "string";
  }
}

/**
 * Represents a type that can be either an Element, EventTarget, or a CSS
 * selector.
 *
 * This type allows for flexibility in functions or methods that can accept
 * either an {@linkcode Elem} type object or a string representing a CSS selector.
 */
export type ElemOrCssSelector = Elem | CssSelector;

/**
 * Valid type for HTML/SVG attribute name.
 */
export type AttrName = string;

/**
 * Value type that can be specified as the value for an HTML/SVG attribute.
 * Before actually setting the attribute on an element, the value is stringified.
 */
export type AttrValue = DOMPropertyValue;

export namespace AttrValue {
  /**
   * Returns true if the specified value is a valid {@linkcode AttrValue}.
   */
  export function is(value: unknown): value is AttrValue {
    return DOMPropertyValue.is(value);
  }
}

/**
 * Valid key/value pair representing HTML/SVG attributes (prior to stringifying).
 * Some of the values may be `null` or `undefined`.
 */
export type Attrs = Record<AttrName, AttrValue | null | undefined>;

/**
 * Valid key/value pair representing HTML/SVG attributes (prior to stringifying).
 * All the values must be defined.
 */
export type AttrsDefined = Record<string, AttrValue>;

/**
 * Valid name for a {@link https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties|CSS variable}.
 *
 * CSS variables *must* start with `--`.
 */
export type CssVarName = `--${string}`;

export namespace CssVarName {
  /**
   * Returns true if the specified `name` is a valid {@linkcode CssVarName}.
   */
  export function is(name: string): name is CssVarName {
    return name.startsWith("--");
  }
}

/**
 * Valid value for a CSS variable.
 */
export type CssVarValue = Primitive;

/**
 * Represents an object with key of {@linkcode CssVarName} and value
 * of {@linkcode CssVarValue}.
 */
export type CssVars = Record<CssVarName, CssVarValue>;

/**
 * Valid type for the key of {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset|HTMLElement.dataset}
 * property entries in HTML/SVG elements.
 */
export type DataPropertyName = string;

/**
 * Valid name for dataset {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*|data-* attribute}
 * on HTML/SVG elements (e.g. `data-some-value`).
 */
export type DataAttrName = `data-${string}`;

/**
 * Valid name for {@linkcode Data} entries. Represents either a key for the
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset|HTMLElement.dataset} property
 * or a name for the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*|data-* attribute}.
 */
export type DataKey = DataPropertyName | DataAttrName;

/**
 * Valid dataset values (prior to stringifying).
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
 */
export type Data = Record<string, DataValue | null | undefined>;

/**
 * Valid style keys (i.e. non-methods) that can be set on an element.
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
 */
export type StyleValue = Primitive;

export namespace StyleValue {
  /**
   * Returns true if the specified value is a valid {@linkcode StyleValue}.
   */
  export function is(value: unknown): value is StyleValue {
    return Primitive.is(value);
  }
}

/**
 * Object representing element styles with a key of {@linkcode StyleKey} and a
 * value of {@linkcode StyleValue}.
 */
export type Styles = Partial<Record<StyleKey, StyleValue>>;

/**
 * Key representing any type of DOM property (i.e. attributes, CSS variables,
 * dataset attribute/property names and style keys).
 */
export type DOMPropertyKey = AttrName | CssVarName | DataKey | StyleKey;

/**
 * Filter value for performing DOM property searches. Use `null` to check if
 * the attribute exists only (skip checking if values match).
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

type NeverMethods<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
}[keyof T];

export type ExcludeMethods<T> = Pick<T, NeverMethods<T>>;

/**
 * Possible values for element properties (*not* attributes).
 *
 * @template E Type of Element with properties.
 */
export type PropValue<E extends Element = HTMLElement> = ExcludeMethods<E>;

/**
 * Possible names for element properties (*not* attributes).
 *
 * @template E Type of Element with properties.
 */
export type PropName<E extends Element = HTMLElement> = keyof PropValue<E>;

/**
 * Object with Element properties.
 *
 * @template E Type of Element with properties.
 */
export type Props<E extends Element = HTMLElement> = Partial<
  Record<PropName<E>, PropValue<E>>
>;
