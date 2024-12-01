/* istanbul ignore file -- @preserve: These are just type guards, no need to enforce coverage. */

import { isPlainObject } from "@laserware/arcade";

import type { AttrValue } from "./attrs/types.ts";
import type { CssVarName } from "./css/types.ts";
import type { Elem } from "./elems/types.ts";
import type { DOMPropertyValue } from "./search.ts";
import type { StyleValue } from "./styles/types.ts";
import type { Primitive } from "./types.ts";

/**
 * Returns true if the specified value is a {@linkcode Primitive}.
 *
 * @internal
 */
export function isPrimitive(value: unknown): value is Primitive {
  return (
    typeof value === "boolean" ||
    typeof value === "number" ||
    typeof value === "string"
  );
}

/**
 * Returns true if the specified value is a valid {@linkcode DOMPropertyValue}.
 *
 * @internal
 */
export function isDOMPropertyValue(value: unknown): value is DOMPropertyValue {
  if (isPrimitive(value)) {
    return true;
  }

  if (Array.isArray(value)) {
    return true;
  }

  return isPlainObject(value);
}

/**
 * Returns true if the specified value is an {@linkcode Elem} instance.
 *
 * @internal
 */
export function isElem(value: unknown): value is Elem {
  return (
    value instanceof Document ||
    value instanceof Element ||
    value instanceof EventTarget ||
    value instanceof HTMLElement ||
    value instanceof Node
  );
}

/**
 * Returns true if the specified value is a valid {@linkcode AttrValue}.
 *
 * @internal
 */
export function isAttrValue(value: unknown): value is AttrValue {
  return isDOMPropertyValue(value);
}

/**
 * Returns true if the specified `name` is a valid {@linkcode CssVarName}.
 *
 * @internal
 */
export function isCssVarName(name: string): name is CssVarName {
  return name.startsWith("--");
}

/**
 * Returns true if the specified value is a valid {@linkcode StyleValue}.
 *
 * @internal
 */
export function isStyleValue(value: unknown): value is StyleValue {
  return isPrimitive(value);
}
