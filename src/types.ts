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

export type Primitive = string | number | boolean | symbol;

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

export type AttrValue = boolean | number | string;

export type Attrs = Record<string, Maybe<AttrValue>>;

/**
 * Returns true if the specified value is an Element or Document or EventTarget
 * that can be represented as an HTML Element.
 */
export function isElementLike(
  value: unknown,
): value is Element | HTMLElement | Document {
  return (
    value instanceof Element ||
    value instanceof HTMLElement ||
    value instanceof Document ||
    value instanceof EventTarget
  );
}

/**
 * Returns true if the specified value is a string.
 */
export function isSelector(value: unknown): value is string {
  return typeof value === "string";
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
