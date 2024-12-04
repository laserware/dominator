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
export type AttributeNameForElement<TN extends TagName> =
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
export type AttributeName<TN extends TagName = "*"> =
  | AttributeNameForElement<TN>
  | string;

/**
 * Value type that can be specified as the value for an HTML/SVG attribute.
 *
 * > [!NOTE]
 * > **All** attribute values are strings when they make it to the DOM.
 * > This represents the value type that can be assigned to attributes using
 * > {@linkcode setAttribute} and {@linkcode setAttributes} as well as the return value for
 * > attributes when using {@linkcode getAttribute} and {@linkcode getAttributes}.
 * > It's a convenience mechanism to avoid stringifying/parsing attribute values.
 */
export type AttributeValue =
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
export type Attributes<TN extends TagName = "*"> = Record<
  AttributeName<TN>,
  AttributeValue | null | undefined
>;

/**
 * Valid key/value pair representing HTML/SVG attributes (prior to stringifying).
 * All the values must be defined.
 */
export type AttributesDefined = Record<string, AttributeValue>;
