import type {
  AnyElement,
  HTMLElementAttributes,
  SVGElementAttributes,
} from "../dom.ts";

/**
 * Valid attribute names for the specified element type.
 *
 * @template E Type of Element with corresponding attribute names.
 */
export type AttrNameForElement<E extends AnyElement> = E extends HTMLElement
  ? Extract<keyof HTMLElementAttributes<E>, string>
  : E extends SVGElement
    ? Extract<keyof SVGElementAttributes, string>
    : never;

/**
 * Valid type for HTML/SVG attribute name.
 *
 * @template E Type of Element with corresponding attribute names.
 */
export type AttrName<E extends AnyElement = HTMLElement> =
  | AttrNameForElement<E>
  | string;

/**
 * Value type that can be specified as the value for an HTML/SVG attribute.
 *
 * Note that **all** attribute values are strings when they make it to the DOM.
 * This represents the value type that can be assigned to attributes using
 * {@linkcode setAttr} and {@linkcode setAttrs} as well as the return value for
 * attributes when using {@linkcode getAttr} and {@linkcode getAttrs}.
 */
export type AttrValue =
  | boolean
  | number
  | string
  | any[]
  | Record<number | string, any>;

/**
 * Valid key/value pair representing HTML/SVG attributes (prior to stringifying).
 * Some of the values may be `null` or `undefined`.
 *
 * @template E Type of Element for corresponding attributes.
 */
export type Attrs<E extends AnyElement = HTMLElement> = Record<
  AttrName<E>,
  AttrValue | null | undefined
>;

/**
 * Valid key/value pair representing HTML/SVG attributes (prior to stringifying).
 * All the values must be defined.
 */
export type AttrsDefined = Record<string, AttrValue>;
