import type {
  AllAttributes,
  HTMLElementAttributes,
  HTMLElementTagName,
  SVGElementAttributes,
  SVGElementTagName,
  TagName,
} from "../dom.ts";

/**
 * Valid attribute names for the element of tag name `TN`.
 *
 * @template TN TN extends TagName = "*" with corresponding attribute names.
 */
export type AttrNameForElement<TN extends TagName> =
  TN extends HTMLElementTagName
    ? Extract<keyof HTMLElementAttributes<TN>, string>
    : TN extends SVGElementTagName
      ? Extract<keyof SVGElementAttributes, string>
      : TN extends "*"
        ? Extract<keyof AllAttributes, string>
        : never;

/**
 * Valid type for HTML/SVG attribute name.
 *
 * @template TN Tag name of element with corresponding attribute names.
 */
export type AttrName<TN extends TagName = "*"> =
  | AttrNameForElement<TN>
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
 * @template TN Tag name of element with corresponding attributes.
 */
export type Attrs<TN extends TagName = "*"> = Record<
  AttrName<TN>,
  AttrValue | null | undefined
>;

/**
 * Valid key/value pair representing HTML/SVG attributes (prior to stringifying).
 * All the values must be defined.
 */
export type AttrsDefined = Record<string, AttrValue>;
