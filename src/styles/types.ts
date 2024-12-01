import type { CssVarName } from "../css/types.ts";
import type { Primitive } from "../types.ts";

/**
 * Valid style keys (i.e. non-methods) that can be set on an Element.
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
 */
export type StyleValue = Primitive;

/**
 * Object representing element styles with a key of {@linkcode StyleKey} and a
 * value of {@linkcode StyleValue}.
 */
export type Styles = Partial<Record<StyleKey, StyleValue>>;
