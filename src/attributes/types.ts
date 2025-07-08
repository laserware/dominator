import type {
  AllAttributes,
  HTMLElementAttributes,
  SVGElementAttributes,
} from "../dom.ts";

/**
 * Valid attribute names for the element of type `E`.
 *
 * @template E Element with corresponding attribute names.
 */
export type AttributeNameForElement<E extends Element> = E extends HTMLElement
  ? Extract<keyof HTMLElementAttributes<E>, string>
  : E extends SVGElement
    ? Extract<keyof SVGElementAttributes, string>
    : E extends Element
      ? Extract<keyof AllAttributes, string>
      : never;

/**
 * Valid type for HTML/SVG attribute name.
 *
 * @template E Element with corresponding attribute names.
 */
export type AttributeName<E extends Element = HTMLElement> =
  | AttributeNameForElement<E>
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
 * Some values may be `null` or `undefined`.
 *
 * @template E Element with corresponding attributes.
 */
export type Attributes<E extends Element = HTMLElement> = Record<
  AttributeName<E>,
  AttributeValue | null | undefined
>;

/**
 * Valid key/value pair representing HTML/SVG attributes (prior to stringifying).
 * All the values must be defined.
 */
export type AttributesDefined = Record<string, AttributeValue>;
